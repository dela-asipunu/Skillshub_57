from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User  # Import your custom user model

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    # Optional: customize how the user fields appear in admin
    fieldsets = UserAdmin.fieldsets
