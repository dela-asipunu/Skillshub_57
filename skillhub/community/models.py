from django.db import models
from userauth.models import User

# Create your models here.
class Testimonial(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="testimonials")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Testimonial by {self.user}"

class Report(models.Model):
    
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reports_made")
    reported_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="reports_received")
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[("pending", "Pending"), ("reviewed", "Reviewed"), ("resolved", "Resolved")],
        default="pending"
    )

    def __str__(self):
        return f"Report on {self.reported_user} by {self.reporter}"
