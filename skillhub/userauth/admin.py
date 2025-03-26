from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from messaging.models import Message
# Register your models here.
@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Optional: customize how the user fields appear in admin
    ordering = ['email']
    fieldsets = UserAdmin.fieldsets

@admin.register(Message)
class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'content', 'timestamp')