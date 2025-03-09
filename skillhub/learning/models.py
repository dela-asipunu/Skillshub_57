from django.db import models
from userauth.models import User
from Messaging.models import Session

# Create your models here.
class LearningProgress(models.Model):
    # to track the progress of a learning session
    session = models.OneToOneField(Session, on_delete=models.CASCADE)
    progress_percentage = models.IntegerField(default=0)
    notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.session} - {self.progress_percentage}%"

class Feedback(models.Model):
    session = models.ForeignKey(Session, on_delete=models.CASCADE, related_name="feedback")
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=[(i, str(i)) for i in range(1, 6)])
    comment = models.TextField(blank=True)

    def __str__(self):
        return f"Feedback from {self.reviewer} - {self.rating} stars"
