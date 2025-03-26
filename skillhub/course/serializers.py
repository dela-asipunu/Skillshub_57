from rest_framework import serializers
from .models import Course, CourseFile

class CourseFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseFile
        fields = ['file']
class CourseSerializer(serializers.ModelSerializer):
    files = CourseFileSerializer(many=True, read_only=True,source='file')
    class Meta:
        model = Course
        fields = ['id', 'course_name', 'description', 'overview', 'image', 'external_link', 'files']
        
    