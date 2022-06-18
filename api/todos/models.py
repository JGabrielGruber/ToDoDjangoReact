from django.db import models


class Todo(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    done = models.BooleanField(default=False)
    created = models.DateTimeField(
        "Created", auto_now=False, auto_now_add=True)
    edited = models.DateTimeField(
        "Last edited", auto_now=True, auto_now_add=False)

    class Meta:
        ordering = ['edited', 'created']
