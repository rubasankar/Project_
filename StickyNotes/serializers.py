from rest_framework import serializers
from .models import StickyNote


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = StickyNote
        fields = ['unid', 'title', 'content',
                  'created_at', 'colors', 'position']
