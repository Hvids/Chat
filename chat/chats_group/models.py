from django.db import models
from django.utils import timezone
from user.models  import User

class ChatGroup(models.Model):

    name = models.CharField(max_length = 255)
    password = models.CharField(max_length = 255)
    user_created = models.ForeignKey(User,related_name="chats_group_created", on_delete=models.SET_NULL,null=True,blank=True)
    date_created = models.DateTimeField(auto_now= timezone.now)
    users = models.ManyToManyField(User,related_name="chats")
    def save(self,*args,**kwargs):

        if not self.pk:
            super(ChatGroup,self).save(*args,**kwargs)
            self.users.add(self.user_created)

        else:
            super(ChatGroup,self).save(*args,**kwargs)
# Create your models here.
