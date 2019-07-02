from django.urls import path, include
from chats_group.viewsets import ChatGroupFilter, ChatGroupNameFilter, ChatGroupUserFilter

urlpatterns = [
    path('filters/chats', ChatGroupFilter.as_view()),
    path('filters/chats_name', ChatGroupNameFilter.as_view()),
    path('filters/chats_user',ChatGroupUserFilter.as_view()),
]
