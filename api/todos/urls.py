from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import list, detail

urlpatterns = [
    path('', list.TodoListView.as_view(), name='api-todos'),
    path('<int:pk>/', detail.TodoDetailView.as_view(), name='api-todos-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
