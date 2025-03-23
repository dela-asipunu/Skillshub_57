from django.urls import path
from .views import MessageListCreateView

urlpatterns = [
    path('message/?receiver=<receiver>', MessageListCreateView.as_view(), name='message'),
]