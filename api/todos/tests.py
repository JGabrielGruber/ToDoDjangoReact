from turtle import title
from django.test import TestCase
from .models import Todo


class TodosTestCase(TestCase):
    def setUp(self) -> None:
        Todo.objects.create(
            title="Test task",
            description="This is a test task, please, ignore it."
        )
    
    def test_todo_exists(self):
        """Check if Todo is correctly being created"""
        task = Todo.objects.get(title="Test task")
        self.assertGreaterEqual(task.edited, task.created)
