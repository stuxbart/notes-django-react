from rest_framework import permissions

class IsOwner(permissions.DjangoModelPermissions):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user

    def has_permission(self, request, view):
        return request.auth