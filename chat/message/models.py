from django.db import models
from django.utils import timezone
from user.models import User
from chats_group.models import ChatGroup

class Message(models.Model):
    """
    Сообщение. Поля: текст, дата публикации, пользователь
    """
    text = models.TextField()
    date_publication = models.DateTimeField(auto_now = timezone.now)
    user = models.ForeignKey(User,on_delete = models.CASCADE)
    chat = models.ForeignKey(ChatGroup,on_delete = models.CASCADE)
# Create your models here.
