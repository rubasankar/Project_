from rest_framework import serializers
from StickyNotes.models import StickyNote


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = StickyNote
        fields = ['unid', 'title', 'content',
                  'created_at', 'colors', 'position', 'modified_at']
