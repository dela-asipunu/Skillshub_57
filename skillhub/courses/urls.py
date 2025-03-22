from django.urls import path
from .views import course_upload, upload_success

urlpatterns = [
    path('upload/', course_upload, name='course_upload'),
    path('success/', upload_success, name='course_upload_success'),
]
