# core/signals.py

from django.db.models.signals import post_save
from django.contrib.auth.models import User
from django.dispatch import receiver
from .models import Author  # Adjust the import based on your project structure

@receiver(post_save, sender=User)
def create_author_profile(sender, instance, created, **kwargs):
    if created:
        Author.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_author_profile(sender, instance, **kwargs):
    if hasattr(instance, 'author'):
        instance.author.save()
