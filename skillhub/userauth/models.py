from decimal import Decimal
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        extra_fields.setdefault('is_active', True)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    email = models.EmailField(unique=True)
    first_name=models.CharField(max_length=30)
    last_name=models.CharField(max_length=30)
    bio=models.TextField(blank=True)
    location=models.TextField(blank=True)
    ratings=models.DecimalField(default=Decimal('0.0'), max_digits=3, decimal_places=1)
    is_verified=models.BooleanField(default=False)
    profile_picture=models.ImageField(blank=True, null=True, upload_to='profile_pictures/')


    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['first_name','last_name']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
class Skill(models.Model):
    name=models.CharField(max_length=100)
    description=models.TextField(blank=True)
    
    def __str__(self):
        return self.name
    
class UserSkill(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    skill=models.ForeignKey(Skill, on_delete=models.CASCADE)
    role=models.CharField(max_length=10, choices=[('teach', 'Teach'),('learn', 'Learn')])

    class Meta:
        unique_together = ('user','skill', 'role')

    def __str__(self):
        
        return f"{self.user.username} - {self.skill.name} ({self.role})"


