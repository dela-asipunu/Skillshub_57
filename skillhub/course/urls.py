from django.urls import path
from .views import CourseCreateView, CourseListView, CourseDetailView

urlpatterns = [
    path('create/', CourseCreateView.as_view(), name='course-create'),
    path('courses/', CourseListView.as_view(), name='course-create'),
    path('courses/<int:id>/', CourseDetailView.as_view(), name='course-detail'),
]
