from rest_framework import serializers
from user.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class UserEnterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('login', 'password',)
