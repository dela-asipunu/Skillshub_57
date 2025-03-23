from rest_framework import serializers
from .models import Message
from userauth.models import User 



class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.ReadOnlyField(source='sender.first_name')
    receiver_username = serializers.ReadOnlyField(source='receiver.first_name')

    class Meta:
        model = Message
        fields = ['id', 'sender', 'sender_username', 'receiver', 'receiver_username', 'text', 'timestamp', 'is_read']
        read_only_fields = ['id', 'sender', 'sender_username', 'timestamp', 'is_read']
