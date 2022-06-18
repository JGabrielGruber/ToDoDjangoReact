from django.test import TestCase
from io import BytesIO
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

from ..models import Todo
from ..serializers import TodoSerializer


class TodosModelTestCase(TestCase):
    def setUp(self) -> None:
        Todo.objects.create(
            title="Test task",
            description="This is a test task, please, ignore it."
        )

    def test_todo_exists(self):
        """Check if Todo is correctly being created"""
        task = Todo.objects.get(title="Test task")
        self.assertGreaterEqual(task.edited, task.created)

    def test_todo_serializer(self):
        """Check if Todo is correctly being serialized"""
        task = Todo.objects.get(title="Test task")
        serializer = TodoSerializer(task)
        content = JSONRenderer().render(serializer.data)
        stream = BytesIO(content)
        data = JSONParser().parse(stream)
        serialized = TodoSerializer(data=data)
        self.assertTrue(serialized.is_valid())
