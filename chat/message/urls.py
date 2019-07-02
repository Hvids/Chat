from django.urls import path, include
from message.viewsets import MessageChatFilter

urlpatterns = [
    path('filters/messages_chat', MessageChatFilter.as_view())
]
