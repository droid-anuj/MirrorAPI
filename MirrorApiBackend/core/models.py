from django.db import models
import django.utils.timezone


class MockEndpoint(models.Model):
    HTTP_METHODS = [
        ('GET','GET'),
        ('POST','POST'),
        ('PUT','PUT'),
        ('DELETE','DELETE'),
        ('PATCH','PATCH'),
        ('HEAD','HEAD'),
        ('OPTIONS','OPTIONS'),
        ('CONNECT','CONNECT'),
    ]
    user_id = models.CharField(max_length = 100)
    url_path = models.CharField(max_length = 255)
    method = models.CharField(max_length = 10, choices=HTTP_METHODS, default='GET')
    status_code = models.IntegerField()
    response_body = models.JSONField()
    created_at = models.DateTimeField(default=django.utils.timezone.now)

    class Meta:
        unique_together = ('user_id', 'url_path', 'method')

    def __str__(self):
        return f"{self.user_id}-{self.url_path}-{self.method}"

class WebhookLog(models.Model):
    webhook_id = models.CharField(max_length = 100)
    headers = models.JSONField()
    payload = models.JSONField()
    timestamp = models.DateTimeField(auto_now_add = True)

    def __str__(self):
        return f"Webhook {self.webhook_id}"

class MockWebSocketEndpoint(models.Model):
    user_id = models.CharField(max_length=100)
    url_path = models.CharField(max_length=255)
    on_connect_message = models.JSONField(blank=True, null=True, default=dict)
    echo_mode = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user_id', 'url_path')

    def __str__(self):
        return f"WS: {self.user_id}-{self.url_path}"
