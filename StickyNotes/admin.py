""" Customized Admin panel for StickyNotes"""
from django.contrib import admin
from .models import StickyNote


class StickyNotesAdmin(admin.ModelAdmin):
    """Sticky Notes admin view customization"""
    model = StickyNote

    readonly_fields = ('unid', 'created_at', 'modified_at', 'author')
    search_fields = ('author', 'title', 'created_at')
    list_filter = ('author', 'title', 'created_at')
    ordering = ('-created_at',)
    list_display = ('author', 'title', 'created_at', 'modified_at')
    fieldsets = [
        ('Note Info', {
         'fields': ('unid', 'author', 'created_at', 'modified_at')}),
        ('Note contents', {'fields': ('title', 'content', 'colors', 'position')
                           })
    ]


admin.site.register(StickyNote, StickyNotesAdmin)
