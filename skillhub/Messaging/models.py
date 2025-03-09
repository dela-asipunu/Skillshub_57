from django.db import models
from userauth.models import User 
from skillMatching.models import Match


# Create your models here.
class Message(models.Model):
    # messages between users
    sender = models.ForeignKey(User, on_delete=models.CASCADE, related_name="sent_messages")
    receiver = models.ForeignKey(User, on_delete=models.CASCADE, related_name="received_messages")
    text = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sender} -> {self.receiver}: {self.text[:30]}"



# to schedule a learning session between users
class Session(models.Model):

    match = models.ForeignKey(Match, on_delete=models.CASCADE, related_name="sessions")
    date_time = models.DateTimeField()
    location = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(
        max_length=20,
        choices=[("scheduled", "Scheduled"), ("completed", "Completed"), ("cancelled", "Cancelled")],
        default="scheduled"
    )

    def __str__(self):
        return f"Session for {self.match.skill} on {self.date_time}"
    



