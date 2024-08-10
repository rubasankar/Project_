# Generated by Django 5.0.7 on 2024-08-10 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('StickyNotes', '0005_alter_stickynote_created_at_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='stickynote',
            name='edited_at',
        ),
        migrations.AddField(
            model_name='stickynote',
            name='modified_at',
            field=models.DateTimeField(auto_now=True,
                                       verbose_name='Modified At'),
        ),
    ]
