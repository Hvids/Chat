from django.urls import path, include
from user.viewsets import UserViewSet,UserFilter, UserEnterFilter

urlpatterns =  [
    path('filters/users',UserFilter.as_view()),
    path('filters/user_enter', UserEnterFilter.as_view()),
]
