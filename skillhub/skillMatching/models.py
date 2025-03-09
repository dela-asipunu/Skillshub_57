from django.db import models

from userauth.models import User, Skill


# Create your models here.

class Match(models.Model):
    """Using this table to store matches between users. If I understand the project correctly, two users
    who have things they want to learn from each other trade their knowledge"""
    user1 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="matches_as_user1")
    user2 = models.ForeignKey(User, on_delete=models.CASCADE, related_name="matches_as_user2")
    skill = models.ForeignKey(Skill, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[("pending", "Pending"), ("accepted", "Accepted"), ("rejected", "Rejected")],
        default="pending"
    )

    class Meta:
        unique_together = ('user1', 'user2', 'skill')

    def __str__(self):
        return f"{self.user1} & {self.user2} - {self.skill.name}"
