from django.db import models

class Course(models.Model):
    name = models.CharField(max_length=255)
    course_name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='course_images/')
    overview = models.TextField()
    file = models.FileField(upload_to='course_files/', null=True, blank=True)
    external_link = models.URLField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.course_name
