# core/views.py

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import PersonaSerializer, ContentPieceSerializer
from .models import Persona, ContentPiece
from .utils import generate_content
import logging
from django.contrib.auth.models import User
from django.views import View
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
logger = logging.getLogger(__name__)

@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(View):
    def post(self, request):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')

        if not username or not password or not email:
            return JsonResponse({'error': 'Missing fields'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists'}, status=400)

        user = User.objects.create_user(username=username, password=password, email=email)
        return JsonResponse({'message': 'User created successfully'}, status=201)

class PersonaViewSet(viewsets.ModelViewSet):
    serializer_class = PersonaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Persona.objects.filter(author=self.request.user.author)

    @action(detail=True, methods=['post'], url_path='generate-content')
    def generate_content(self, request, pk=None):
        persona = self.get_object()
        prompt = request.data.get('prompt')
        
        if not prompt:
            return Response({'error': 'Prompt is required'}, status=400)
            
        generated_content = generate_content(persona, prompt)
        
        if generated_content:
            title, content = self._split_content(generated_content)
            content_piece = ContentPiece.objects.create(
                author=request.user.author,
                persona=persona,
                title=title or 'Untitled',
                content=content or '',
                status='draft'
            )
            serializer = ContentPieceSerializer(content_piece)
            return Response(serializer.data, status=201)
        return Response({'error': 'Failed to generate content'}, status=500)

    def _split_content(self, generated_content):
        lines = generated_content.strip().split('\n')
        title = lines[0] if lines else 'Untitled'
        # Remove 'Title:' prefix and quotes from the title
        title = title.replace('Title:', '').strip().strip('"')
        content = '\n'.join(lines[1:]) if len(lines) > 1 else ''
        return title, content

class ContentPieceViewSet(viewsets.ModelViewSet):
    serializer_class = ContentPieceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ContentPiece.objects.filter(author=self.request.user.author)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.author)
