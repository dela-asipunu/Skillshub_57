from django.db import models

# Create your models here.
class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    note = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='course_images/')
    file = models.FileField(upload_to='course_files/')

    def __str__(self):
        return self.title