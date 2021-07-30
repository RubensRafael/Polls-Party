from django.urls import path, include
from .views import PollAuth, PollUnAuth

urlpatterns = [
    path('polls/<str:info>/<str:params>',PollUnAuth.as_view()),
    path('polls/<str:params>',PollAuth.as_view()),
    
]