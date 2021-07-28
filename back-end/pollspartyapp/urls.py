from django.urls import path, include
from .views import PollView

urlpatterns = [
    path('polls/<str:info>',PollView.as_view()),
    #path('/vote')
    
]