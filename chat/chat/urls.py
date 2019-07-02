"""chat URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from user.viewsets import UserViewSet
from chats_group.viewsets import ChatGroupViewSet
from message.viewsets import MessageViewSet
from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register('users',UserViewSet)
router.register('chats', ChatGroupViewSet)
router.register('messages',MessageViewSet)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api_v1/',include(router.urls)),
    path('api_v1/', include('user.urls')),
    path('api_v1/', include('chats_group.urls')),
    path('api_v1/',include('message.urls')),
    path('',include('project.urls'))
]  #+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) 
