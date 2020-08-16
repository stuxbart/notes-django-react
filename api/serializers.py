from rest_framework import serializers
from .models import Note

class NoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Note
        fields = ['url', 'id', 'created', 'updated', 'slug', 
                 'title', 'body', 'important', 'done', 'color']
        extra_kwargs = {
            'url': {'lookup_field': 'slug'},
        }
