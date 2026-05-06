from django.http import JsonResponse
import redis
import time
import os

r = redis.from_url(os.getenv("REDIS_URL"))

class RateLimitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        ip = request.META.get('REMOTE_ADDR', '127.0.0.1')
        window = int(time.time() // 60)  # current 1-minute window
        key = f"rate:{ip}:{window}"

        count = r.incr(key)
        if count == 1:
            r.expire(key, 60)  # expire after 60 seconds

        if count > 60:  # limit: 60 requests per minute
            return JsonResponse(
                {"error": "Rate limit exceeded. Try again later."},
                status=429
            )

        return self.get_response(request)
