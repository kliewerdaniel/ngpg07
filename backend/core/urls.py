# core/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PersonaViewSet, ContentPieceViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'personas', PersonaViewSet, basename='persona')
router.register(r'content', ContentPieceViewSet, basename='content')

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),
]
