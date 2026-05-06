from channels.db import database_sync_to_async
from core.models import MockWebSocketEndpoint
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class WebhookConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.webhook_id = self.scope['url_route']['kwargs']['webhook_id']
        self.group_name = f"webhook_{self.webhook_id}"

        await self.channel_layer.group_add(
            self.group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.group_name,
            self.channel_name
        )

    async def webhook_message(self, event):
        await self.send(text_data=json.dumps(event["data"]))


class MockWebSocketConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.url_path = self.scope['url_route']['kwargs']['url_path']
        
        # Check if the mock websocket endpoint exists
        self.endpoint = await self.get_mock_endpoint(self.user_id, self.url_path)
        
        if self.endpoint:
            await self.accept()
            if self.endpoint.on_connect_message:
                await self.send(text_data=json.dumps(self.endpoint.on_connect_message))
        else:
            await self.close(code=4004) # Close with custom not found code

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data=None, bytes_data=None):
        if not self.endpoint:
            return
            
        if self.endpoint.echo_mode and text_data:
            # Echo the received data back
            await self.send(text_data=json.dumps({
                "type": "echo",
                "received": text_data
            }))

    @database_sync_to_async
    def get_mock_endpoint(self, user_id, url_path):
        try:
            return MockWebSocketEndpoint.objects.get(user_id=user_id, url_path=url_path)
        except MockWebSocketEndpoint.DoesNotExist:
            return None
