"""Sticky Notes """
import uuid
from django.db import models
from django.contrib.auth import get_user_model

usermodel = get_user_model()


class StickyNote(models.Model):
    """Class StickyNote"""
    unid = models.UUIDField(
        default=uuid.uuid4, verbose_name='Note ID', primary_key=True)
    author = models.ForeignKey(usermodel, on_delete=models.CASCADE)
    title = models.CharField(verbose_name='Title', max_length=100)
    content = models.TextField(verbose_name="Content")
    colors = models.JSONField(verbose_name='Colors')
    position = models.JSONField(verbose_name='Position')
    created_at = models.DateTimeField(
        verbose_name='Created At', auto_now_add=True)
    modified_at = models.DateTimeField(verbose_name="Modified At", auto_now=True)

    class Meta:
        """ Meta class for Sticky Note Model"""
        verbose_name = "Sticky Note"
        verbose_name_plural = "Sticky Notes"

    def __str__(self) -> str:
        return str(self.title)
