from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from .models import Note
from .serializers import NoteSerializer
from .permissions import IsOwner


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    lookup_field = 'slug'
    permission_classes = [
        permissions.IsAuthenticated,
        IsOwner
    ]

    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)

    def get_queryset(self):
        return self.queryset.filter(owner=self.request.user)

    @action(detail=True, methods=['PATCH'])
    def mark_done(self, request, *args, **kwargs):
        note = self.get_object()
        serializer = self.get_serializer_class()
        data = {'done': request.data.get('done')}
        serializer = serializer(note, data=data, partial=True, context={"request": self.request})
        if serializer.is_valid():
            serializer.save()
            return Response(data=serializer.data)
        return Response(serializer.errors)
