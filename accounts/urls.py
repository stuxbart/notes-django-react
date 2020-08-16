from django.urls import path, include
from . import views
from knox import views as knox_views

urlpatterns = [
    path('', include('knox.urls')),
    path('register', views.RegisterAPIView.as_view()),
    path('login', views.LoginAPIView.as_view()),
    path('logout', knox_views.LogoutView.as_view()),
    path('user', views.UserAPIView.as_view()),
]