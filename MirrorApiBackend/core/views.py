from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework.views import APIView
from core.models import *
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from core.serializers import MockEndpointSerializer, MockWebSocketEndpointSerializer
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

@csrf_exempt
def mock_handler(request,user_id,path):
    method = request.method
    print("USER:", user_id)
    print("PATH:", path)
    print("METHOD:", request.method)
    
    try:
        endpoint = MockEndpoint.objects.get(
            user_id=user_id,
            url_path=path, method=method
            )

        return JsonResponse(endpoint.response_body, status=endpoint.status_code)

    except MockEndpoint.DoesNotExist:
        return JsonResponse({"message":"Endpoint Not Found"}, status=404)

class CreateMockEndpoint(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data.copy()
        data['method'] = data.get('method', 'GET').upper()

        endpoint, created = MockEndpoint.objects.update_or_create(
            user_id=data['user_id'],
            url_path=data['url_path'],
            method=data['method'],
            defaults={
                'status_code': data['status_code'],
                'response_body': data['response_body']
            }
        )

        serializer = MockEndpointSerializer(endpoint)
        mock_url = request.build_absolute_uri(f'/api/{endpoint.user_id}/{endpoint.url_path}')
        response_status = status.HTTP_201_CREATED if created else status.HTTP_200_OK

        return Response({
            **serializer.data,
            "mock_url": mock_url,
            "created": created
        }, status=response_status)

class ListMockEndpoints(APIView):
    permission_classes = [AllowAny]
    def get(self, request, user_id):
        endpoints = MockEndpoint.objects.filter(user_id=user_id).order_by('-id')
        serializer = MockEndpointSerializer(endpoints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateMockEndpoint(APIView):
    permission_classes = [AllowAny]
    def put(self,request,pk):
        try:
            endpoint = MockEndpoint.objects.get(pk = pk)
        except MockEndpoint.DoesNotExist:
            return Response({"message":"Endpoint Not Found"}, status=status.HTTP_404_NOT_FOUND)

        data = request.data.copy()
        data['method'] = data.get('method','').upper()
        serializer = MockEndpointSerializer(endpoint, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:

            endpoint = MockEndpoint.objects.get(pk=pk)
            endpoint.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except MockEndpoint.DoesNotExist:
            return Response({"message":"Endpoint Not Found"}, status=status.HTTP_404_NOT_FOUND)

class CreateMockWebSocketEndpoint(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        data = request.data.copy()
        
        endpoint, created = MockWebSocketEndpoint.objects.update_or_create(
            user_id=data['user_id'],
            url_path=data['url_path'],
            defaults={
                'on_connect_message': data.get('on_connect_message', {}),
                'echo_mode': data.get('echo_mode', False)
            }
        )

        serializer = MockWebSocketEndpointSerializer(endpoint)
        mock_url = f"ws://127.0.0.1:8000/ws/mock/{endpoint.user_id}/{endpoint.url_path}/"
        response_status = status.HTTP_201_CREATED if created else status.HTTP_200_OK

        return Response({
            **serializer.data,
            "mock_url": mock_url,
            "created": created
        }, status=response_status)

class ListMockWebSocketEndpoints(APIView):
    permission_classes = [AllowAny]
    def get(self, request, user_id):
        endpoints = MockWebSocketEndpoint.objects.filter(user_id=user_id).order_by('-id')
        serializer = MockWebSocketEndpointSerializer(endpoints, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class UpdateMockWebSocketEndpoint(APIView):
    permission_classes = [AllowAny]
    def delete(self, request, pk):
        try:
            endpoint = MockWebSocketEndpoint.objects.get(pk=pk)
            endpoint.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except MockWebSocketEndpoint.DoesNotExist:
            return Response({"message": "Endpoint Not Found"}, status=status.HTTP_404_NOT_FOUND)


@csrf_exempt
def webhook_catcher(request,webhook_id):
    try:
        payload = json.loads(request.body)
    except json.JSONDecodeError:
        payload = {"raw": request.body.decode("utf-8",errors="ignore")}
    
    headers = dict(request.headers)

    WebhookLog.objects.create(
        webhook_id = webhook_id,
        headers = headers,
        payload = payload
    )
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        f"webhook_{webhook_id}",
        {
            "type":"webhook.message",
            "data":{
                "payload":payload,
                "headers":headers,
            }
        }
    )
    return JsonResponse({"message":"webhook received"},status=status.HTTP_200_OK)


import requests

class CloneExternalAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        external_url = request.data.get('external_url')
        user_id = request.data.get('user_id')
        url_path = request.data.get('url_path')
        method = request.data.get('method', 'GET').upper()
        auth_token = request.data.get('auth_token')
        custom_headers = request.data.get('custom_headers', {})
        request_body = request.data.get('request_body')

        if not external_url or not user_id or not url_path:
            return Response({"error": "Missing required fields"}, status=status.HTTP_400_BAD_REQUEST)

        # Prepare headers
        headers = {}
        if isinstance(custom_headers, dict):
            headers.update(custom_headers)
        if auth_token:
            headers['Authorization'] = auth_token

        try:
            # Mirror the request to the external API
            response = requests.request(
                method=method,
                url=external_url,
                headers=headers,
                json=request_body if method in ['POST', 'PUT', 'PATCH'] else None,
                timeout=10
            )

            try:
                response_data = response.json()
            except ValueError:
                response_data = {"raw_response": response.text}

            # Create or update the mock endpoint
            endpoint, created = MockEndpoint.objects.update_or_create(
                user_id=user_id,
                url_path=url_path,
                method=method,
                defaults={
                    'status_code': response.status_code,
                    'response_body': response_data
                }
            )

            mock_url = request.build_absolute_uri(f'/api/{endpoint.user_id}/{endpoint.url_path}')
            
            return Response({
                "message": "API cloned successfully",
                "mock_url": mock_url,
                "status_code": response.status_code,
                "response_body": response_data,
                "created": created
            }, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

        except requests.exceptions.RequestException as e:
            return Response({"error": f"Failed to fetch external API: {str(e)}"}, status=status.HTTP_502_BAD_GATEWAY)

        