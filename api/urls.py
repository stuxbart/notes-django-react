from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'notes', views.NoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('accounts.urls')),
]