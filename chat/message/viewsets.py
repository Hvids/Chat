from rest_framework import viewsets, generics
from message.models import Message
from message.serializers import MessageSerializers
from django_filters.rest_framework import DjangoFilterBackend

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializers

class MessageChatFilter(generics.ListAPIView):
    queryset = Message.objects.all()
    serializer_class = MessageSerializers
    filter_bacends = (DjangoFilterBackend,)
    filterset_fields = ('chat',)
