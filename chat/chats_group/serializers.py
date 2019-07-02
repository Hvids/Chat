from rest_framework import serializers
from chats_group.models import ChatGroup

class ChatGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = '__all__'

class ChatGroupNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatGroup
        fields = ('name',)
