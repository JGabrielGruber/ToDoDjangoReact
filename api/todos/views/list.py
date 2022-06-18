from rest_framework import generics, filters

from ..models import Todo
from ..serializers import TodoSerializer


class TodoListView(generics.ListCreateAPIView):
    """
    List all todos, or create a new todo.
    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created', 'edited', 'done']
