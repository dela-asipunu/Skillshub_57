from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import Message
from django.views.decorators.csrf import csrf_exempt
import json


def get_or_create_user(user_id):
    user = User.objects.filter(id=user_id).first()
    if not user:
        # For testing, we create a dummy user
        user = User.objects.create(username=f"user{user_id}", password="dummy")
    return user


@csrf_exempt
def send_message(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            sender_id = data.get("sender_id")
            receiver_id = data.get("receiver_id")
            content = data.get("content")

            sender = User.objects.filter(id=sender_id).first()
            receiver = User.objects.filter(id=receiver_id).first()
            
            if not sender or not receiver:
                return JsonResponse({
                    "status": "error",
                    "message": "Sender or receiver not found. Ensure both users exist."
                }, status=404)

            message = Message.objects.create(sender=sender, receiver=receiver, content=content)
            return JsonResponse({"status": "success", "message_id": message.id}, status=201)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)
        
def get_messages(request, user_id):
    messages = Message.objects.filter(receiver_id=user_id).order_by("-timestamp")
    messages_data = [
        {"id": msg.id, "sender": msg.sender.username, "content": msg.content, "timestamp": msg.timestamp}
        for msg in messages
    ]
    return JsonResponse({"messages": messages_data}, safe=False)
