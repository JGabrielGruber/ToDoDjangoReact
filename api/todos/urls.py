from django.urls import path
from . import views

urlpatterns = [
    path('', views.todo_list, name='api-todos'),
    path('<int:pk>/', views.todo_detail, name='api-todos-detail'),
]
