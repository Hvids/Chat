from django.db import models
from django.utils import timezone

class User(models.Model):
    """
    Пользователя. Поля: логин, пароль, последний вход, список чатов
    """
    login = models.CharField(max_length = 255)
    password = models.CharField(max_length = 255)
    date_last_enter = models.DateTimeField(auto_now = timezone.now,max_length = 255,blank = True)
# Create your models here.
