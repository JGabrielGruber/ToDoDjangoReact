from rest_framework import generics, filters

from ..libs.filters import ConditionalFilter
from ..models import Todo
from ..serializers import TodoSerializer


class TodoListView(generics.ListCreateAPIView):
    """
    List all todos, or create a new todo.
    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, ConditionalFilter]
    search_fields = ['title', 'description']
    ordering_fields = ['created', 'edited', 'done']
    ordering = ['-edited']
    conditional_fields = ['done']
