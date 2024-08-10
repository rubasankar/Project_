""" Customized Admin user panel """
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser


class UserAdminConfig(UserAdmin):
    """class for User admin panel customization"""
    model = CustomUser

    readonly_fields = ('uuid', 'created_at',
                       'last_login',)
    search_fields = ('email', 'user_name',)
    list_filter = ('is_active', 'is_staff', 'is_superuser')
    ordering = ('-created_at',)
    list_display = ('user_name', 'email', 'is_active', 'is_staff')

    fieldsets = (
        ('Account Details', {
         'fields': ('uuid', 'user_name', 'created_at', 'password')}),
        ('Permissions', {'fields': ('groups',
         'user_permissions', 'is_staff', 'is_active', 'is_superuser')}),
        ('Personal Info', {'fields': (
            'first_name', 'last_name', 'email', 'DoB', 'last_login')
        }))
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': (
                'email', 'user_name',
                'password1', 'password2',
                'is_active', 'is_staff', 'is_superuser')
        }
        ),
    )


admin.site.register(CustomUser, UserAdminConfig)
