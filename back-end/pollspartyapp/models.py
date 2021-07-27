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
    poll = models.ForeignKey(Poll,related_name='options',on_delete=models.CASCADE)
    votes = models.IntegerField(default=0)
    answer = models.TextField()

