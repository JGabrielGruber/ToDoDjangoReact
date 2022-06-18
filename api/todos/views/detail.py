from rest_framework import generics

from ..models import Todo
from ..serializers import TodoSerializer


class TodoDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a Todo.
    """
    queryset = Todo.objects.all()
    serializer_class = TodoSerializer
