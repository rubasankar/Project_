from rest_framework import generics
from .serializers import UserSerializer
from rest_framework.permissions import AllowAny
from .models import CustomUser


class CreateUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
