from django.contrib import admin
from core.models import *


admin.site.register(MockEndpoint)
admin.site.register(MockWebSocketEndpoint)
admin.site.register(WebhookLog)
