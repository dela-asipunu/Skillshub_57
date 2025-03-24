from rest_framework import generics, permissions
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth import get_user_model, logout
from django.shortcuts import redirect, render
from .models import Skill, UserSkill
from .serializers import UserCreateSerializer, UserSerializer, SkillSerializer, UserSkillSerializer

User = get_user_model()

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [permissions.AllowAny]

class ProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

def logout_view(request):
    def logout_view(request):
        if request.method == "POST":
            logout(request)
            return redirect('login')

    return render(request, 'userauth/base.html')