from django.urls import re_path
from core.consumers import WebhookConsumer, MockWebSocketConsumer

websocket_urlpatterns = [
    re_path(r"ws/webhook/(?P<webhook_id>[^/]+)/$", WebhookConsumer.as_asgi()),
    re_path(r"ws/mock/(?P<user_id>[^/]+)/(?P<url_path>.+)/$", MockWebSocketConsumer.as_asgi()),
]