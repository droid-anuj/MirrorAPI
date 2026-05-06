from django.urls import re_path, path
from core.views import (
    mock_handler, CreateMockEndpoint, UpdateMockEndpoint, 
    webhook_catcher, ListMockEndpoints, CloneExternalAPI,
    CreateMockWebSocketEndpoint, ListMockWebSocketEndpoints, UpdateMockWebSocketEndpoint
)

urlpatterns = [
    path('create-endpoint/', CreateMockEndpoint.as_view(), name='create_mock_endpoint'),
    path('clone-endpoint/', CloneExternalAPI.as_view(), name='clone_external_api'),
    path('list-endpoints/<str:user_id>/', ListMockEndpoints.as_view(), name='list_mock_endpoints'),
    path('manage-endpoint/<int:pk>/', UpdateMockEndpoint.as_view(), name='manage_mock_endpoint'),
    
    path('create-ws-endpoint/', CreateMockWebSocketEndpoint.as_view(), name='create_ws_endpoint'),
    path('list-ws-endpoints/<str:user_id>/', ListMockWebSocketEndpoints.as_view(), name='list_ws_endpoints'),
    path('manage-ws-endpoint/<int:pk>/', UpdateMockWebSocketEndpoint.as_view(), name='manage_ws_endpoint'),

    path('webhook/<str:webhook_id>/', webhook_catcher,name="webhook_catcher"),
    re_path(r'^(?P<user_id>[^/]+)/(?P<path>.*)$', mock_handler),
]