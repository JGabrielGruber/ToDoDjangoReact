from rest_framework import serializers
from .models import Todo


class TodoSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(required=True, max_length=200)
    description = serializers.CharField(
        style={'base_template': 'textarea.html'}
    )
    done = serializers.BooleanField(default=False)
    created = serializers.DateTimeField(read_only=True)
    edited = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        """
        Create and return a new 'Todo' instance, given the validated data.
        """
        return Todo.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing 'Todo' instance,
        given the validated data.
        """
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get(
            'description',
            instance.description
        )
        instance.done = validated_data.get('done', instance.done)
        instance.save()
        return instance
