from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from ..models import Todo


class TodosAPITestCase(APITestCase):
    def setUp(self):
        self.url_list = reverse('api-todos')
        todo = Todo.objects.create(
            title="Test task",
            description="This is a test task, please, ignore it."
        )
        self.url_detail = reverse('api-todos-detail', args=[todo.id])

    def test_get_todo(self):
        """Check if is listing Todos"""
        response = self.client.get(self.url_list)
        data = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 1)

    def test_search_todo(self):
        """Check if is searching Todos"""
        response = self.client.get('{}?search=task'.format(self.url_list))
        data = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 1)

    def test_conditional_todo(self):
        """Check if is filtering conditional Todos"""
        response = self.client.get('{}?conditional=-done'.format(self.url_list))
        data = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 1)

    def test_get_pk_todo(self):
        """Check if is returning specific Todo"""
        response = self.client.get(self.url_detail)
        data = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(data, dict)

    def test_edit_todo(self):
        """Check if is editing Todo"""
        data = {
            'title': 'Test task edited',
            'description': 'This is a edited test task, please, ignore it.'
        }
        response = self.client.put(self.url_detail, data, format='json')
        data = response.json()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIsInstance(data, dict)
        self.assertEqual(Todo.objects.count(), 1)
        self.assertEqual(Todo.objects.get().title, 'Test task edited')

    def test_delete_todo(self):
        """Check if is deleting Todo"""
        response = self.client.delete(self.url_detail)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Todo.objects.count(), 0)

    def test_create_todo(self):
        """Check if Todo is correctly being created."""
        data = {
            'title': 'Test task 2',
            'description': 'This is a test task, please, ignore it'
        }
        response = self.client.post(self.url_list, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Todo.objects.count(), 2)
        self.assertEqual(
            Todo.objects.filter(
                title='Test task 2'
            ).first().title,
            'Test task 2'
        )
