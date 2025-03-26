from rest_framework import generics, permissions
from .models import Course, CourseFile
from .serializers import CourseSerializer

class CourseListView(generics.ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = []  # No authentication required

# Create a course (Requires authentication)
class CourseCreateView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        course = serializer.save()
        files = self.request.FILES.getlist('file')
        for file in files:
            CourseFile.objects.create(course=course, file=file)

class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.prefetch_related('file').all()
    serializer_class = CourseSerializer
    permission_classes = []
    lookup_field = 'id'  # This will use 'id' to retrieve the course