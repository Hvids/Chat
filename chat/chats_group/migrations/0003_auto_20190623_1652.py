# Generated by Django 2.2.2 on 2019-06-23 13:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chats_group', '0002_auto_20190623_1630'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chatgroup',
            name='date_created',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
