from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Poll(models.Model):
    question = models.TextField()
    total_votes = models.IntegerField(default=0)
    all_options = models.BooleanField(default=False)
    anyone_options = models.BooleanField(default=False)
    protect = models.BooleanField(default=False)

    user = models.ForeignKey(User,related_name='polls',on_delete=models.CASCADE)


class Option(models.Model):
    answer = models.TextField()
    votes = models.IntegerField(default=0)
    is_all = models.BooleanField(default=False)
    is_any = models.BooleanField(default=False)
    poll = models.ForeignKey(Poll,related_name='options',on_delete=models.CASCADE)
