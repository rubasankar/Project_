"""Model"""
import uuid
from django.db import models

from django.utils import timezone
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, \
    BaseUserManager


class CustomAccountManager(BaseUserManager):
    """ Custom Account Manager """

    def create_superuser(self, email, user_name, password, **other_fields):
        """ Create SuperUser Funtion """
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)
        if other_fields.get('is_staff') is not True:
            raise ValueError("SuperUser must be assigned to is_staff is True.")

        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                "SuperUser must be assigned to is_superuser is True.")

        return self.create_user(email, user_name, password, **other_fields)

    def create_staff(self, email, user_name, password, **other_fields):
        """ Create Staff funtion """
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', False)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError("Staff must be assigned to is_staff is True.")

        return self.create_user(email, user_name, password, **other_fields)

    def create_user(self, email, user_name, password, **other_fields):
        """ Create User Function """
        e_mail = self.normalize_email(email)
        user = self.model(email=e_mail, user_name=user_name, **other_fields)
        user.set_password(password)
        user.save()
        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    """ Custom User Model"""
    uuid = models.UUIDField(verbose_name="UUID",
                            default=uuid.uuid4, primary_key=True, unique=True)
    user_name = models.CharField(
        verbose_name="User Name", max_length=25, unique=True)
    email = models.EmailField(verbose_name="E-mail", unique=True)
    first_name = models.CharField(
        verbose_name="First Name", max_length=50, blank=True)
    last_name = models.CharField(
        verbose_name="Last Name", max_length=50, blank=True)
    created_at = models.DateTimeField(
        verbose_name="Created At", default=timezone.now)
    DoB = models.DateField(verbose_name="Date of Birth", null=True, blank=True)

    is_staff = models.BooleanField(verbose_name='Staff Status', default=False)
    is_active = models.BooleanField(
        verbose_name='Active Status', default=False)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'user_name'
    REQUIRED_FIELDS = ['email']

    class Meta:
        """ Meta class for CustomUser Model"""
        verbose_name = "User"
        verbose_name_plural = "Users"

    def __str__(self) -> str:
        return str(self.user_name)
