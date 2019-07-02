from rest_framework import viewsets, generics
from user.models import User
from user.serializers import UserSerializer, UserEnterSerializer
from django_filters.rest_framework import DjangoFilterBackend

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class  = UserSerializer

class UserFilter(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_bacends = (DjangoFilterBackend,)
    filterset_fields = '__all__'

class UserEnterFilter(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filter_bacends = (DjangoFilterBackend,)
    filterset_fields = ('login','password',)
