# backend/urls.py (or your project's main urls.py)


from django.contrib import admin
from django.urls import path, include
from core.views import RegisterView  # Import the RegisterView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('api/register/', RegisterView.as_view(), name='register'),
    
]  