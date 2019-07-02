from rest_framework import viewsets, generics
from chats_group.models import ChatGroup
from chats_group.serializers import ChatGroupSerializer, ChatGroupNameSerializer
from django_filters.rest_framework import DjangoFilterBackend

class ChatGroupViewSet(viewsets.ModelViewSet):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer

class ChatGroupFilter(generics.ListAPIView):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer
    filter_bacends = (DjangoFilterBackend,)
    filterset_fields = '__all__'

class ChatGroupNameFilter(generics.ListAPIView):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupNameSerializer
    filter_bacends = (DjangoFilterBackend,)
    filterset_fields = ('name',)

class ChatGroupUserFilter(generics.ListAPIView):
    queryset = ChatGroup.objects.all()
    serializer_class = ChatGroupSerializer
    filter_bacends = (DjangoFilterBackend,)
    filterset_fields = ('users',)
