from django.urls import path
from StickyNotes.api import views

urlpatterns = [
    path("", views.NoteListCreate.as_view(), name="note-list"),
    path("delete/<uuid:pk>/", views.NoteDelete.as_view(), name="delete-note"),
    path("update/<uuid:pk>/", views.NoteUpdate.as_view(), name="update-note")
]
