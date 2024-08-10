from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from StickyNotes.models import StickyNote
from StickyNotes.api.serializers import NoteSerializer


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return StickyNote.objects.filter(author=self.request.user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print("errors")
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return StickyNote.objects.filter(author=self.request.user)


class NoteUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return StickyNote.objects.filter(author=self.request.user)
