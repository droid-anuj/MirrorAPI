from rest_framework import serializers
from .models import MockEndpoint, MockWebSocketEndpoint

class MockEndpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockEndpoint
        fields = '__all__'

class MockWebSocketEndpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = MockWebSocketEndpoint
        fields = '__all__'