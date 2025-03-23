from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Message
from .serializers import MessageSerializer
from django.db.models import Q

class MessageListCreateView(generics.ListCreateAPIView):
    serializer_class = MessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        receiver_id = self.request.query_params.get('receiver', None)

        # Get messages between the user and the specified receiver (if provided)
        if receiver_id:
            return Message.objects.filter(
                Q(sender=user, receiver_id=receiver_id) | 
                Q(sender_id=receiver_id, receiver=user)
            ).order_by('timestamp')
        return Message.objects.filter(sender=user) | Message.objects.filter(receiver=user)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            self.perform_create(serializer)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
