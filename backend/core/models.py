# core/models.py

from django.db import models
from django.contrib.auth.models import User

class Author(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='author')
    bio = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)


    def __str__(self):
        return f"{self.user.username}'s Author Profile"

class Persona(models.Model):
    # Relationship fields
    author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name='personas', null=True, blank=True)
    
    # Basic information
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.TextField(blank=True, null=True)
    
    # Writing style characteristics
    vocabulary_complexity = models.IntegerField(null=True, blank=True)
    sentence_structure = models.CharField(max_length=50, null=True, blank=True)
    paragraph_organization = models.CharField(max_length=50, null=True, blank=True)
    idiom_usage = models.IntegerField(null=True, blank=True)
    metaphor_frequency = models.IntegerField(null=True, blank=True)
    simile_frequency = models.IntegerField(null=True, blank=True)
    tone = models.CharField(max_length=50, null=True, blank=True)
    punctuation_style = models.CharField(max_length=50, null=True, blank=True)
    contraction_usage = models.IntegerField(null=True, blank=True)
    pronoun_preference = models.CharField(max_length=50, null=True, blank=True)
    passive_voice_frequency = models.IntegerField(null=True, blank=True)
    rhetorical_question_usage = models.IntegerField(null=True, blank=True)
    list_usage_tendency = models.IntegerField(null=True, blank=True)
    personal_anecdote_inclusion = models.IntegerField(null=True, blank=True)
    pop_culture_reference_frequency = models.IntegerField(null=True, blank=True)
    technical_jargon_usage = models.IntegerField(null=True, blank=True)
    parenthetical_aside_frequency = models.IntegerField(null=True, blank=True)
    humor_sarcasm_usage = models.IntegerField(null=True, blank=True)
    emotional_expressiveness = models.IntegerField(null=True, blank=True)
    emphatic_device_usage = models.IntegerField(null=True, blank=True)
    quotation_frequency = models.IntegerField(null=True, blank=True)
    analogy_usage = models.IntegerField(null=True, blank=True)
    sensory_detail_inclusion = models.IntegerField(null=True, blank=True)
    onomatopoeia_usage = models.IntegerField(null=True, blank=True)
    alliteration_frequency = models.IntegerField(null=True, blank=True)
    word_length_preference = models.CharField(max_length=50, null=True, blank=True)
    foreign_phrase_usage = models.IntegerField(null=True, blank=True)
    rhetorical_device_usage = models.IntegerField(null=True, blank=True)
    statistical_data_usage = models.IntegerField(null=True, blank=True)
    personal_opinion_inclusion = models.IntegerField(null=True, blank=True)
    transition_usage = models.IntegerField(null=True, blank=True)
    reader_question_frequency = models.IntegerField(null=True, blank=True)
    imperative_sentence_usage = models.IntegerField(null=True, blank=True)
    dialogue_inclusion = models.IntegerField(null=True, blank=True)
    regional_dialect_usage = models.IntegerField(null=True, blank=True)
    hedging_language_frequency = models.IntegerField(null=True, blank=True)
    language_abstraction = models.CharField(max_length=50, null=True, blank=True)
    personal_belief_inclusion = models.IntegerField(null=True, blank=True)
    repetition_usage = models.IntegerField(null=True, blank=True)
    subordinate_clause_frequency = models.IntegerField(null=True, blank=True)
    verb_type_preference = models.CharField(max_length=50, null=True, blank=True)
    sensory_imagery_usage = models.IntegerField(null=True, blank=True)
    symbolism_usage = models.IntegerField(null=True, blank=True)
    digression_frequency = models.IntegerField(null=True, blank=True)
    formality_level = models.IntegerField(null=True, blank=True)
    reflection_inclusion = models.IntegerField(null=True, blank=True)
    irony_usage = models.IntegerField(null=True, blank=True)
    neologism_frequency = models.IntegerField(null=True, blank=True)
    ellipsis_usage = models.IntegerField(null=True, blank=True)
    cultural_reference_inclusion = models.IntegerField(null=True, blank=True)
    stream_of_consciousness_usage = models.IntegerField(null=True, blank=True)
    
    # Personality traits
    openness_to_experience = models.IntegerField(null=True, blank=True)
    conscientiousness = models.IntegerField(null=True, blank=True)
    extraversion = models.IntegerField(null=True, blank=True)
    agreeableness = models.IntegerField(null=True, blank=True)
    emotional_stability = models.IntegerField(null=True, blank=True)
    dominant_motivations = models.CharField(max_length=100, null=True, blank=True)
    core_values = models.CharField(max_length=100, null=True, blank=True)
    decision_making_style = models.CharField(max_length=50, null=True, blank=True)
    empathy_level = models.IntegerField(null=True, blank=True)
    self_confidence = models.IntegerField(null=True, blank=True)
    risk_taking_tendency = models.IntegerField(null=True, blank=True)
    idealism_vs_realism = models.CharField(max_length=50, null=True, blank=True)
    conflict_resolution_style = models.CharField(max_length=50, null=True, blank=True)
    relationship_orientation = models.CharField(max_length=50, null=True, blank=True)
    
    emotional_response_tendency = models.CharField(max_length=50, null=True, blank=True)
    creativity_level = models.IntegerField(null=True, blank=True)
    age = models.CharField(max_length=50, null=True, blank=True)
    gender = models.CharField(max_length=50, null=True, blank=True)
    education_level = models.CharField(max_length=100, null=True, blank=True)
    professional_background = models.TextField(null=True, blank=True)
    cultural_background = models.TextField(null=True, blank=True)
    primary_language = models.CharField(max_length=50, null=True, blank=True)
    language_fluency = models.CharField(max_length=50, null=True, blank=True)
    
    
    # Metadata
    is_active = models.BooleanField(default=True, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    
    # Temporary field for migration
    data = models.JSONField(blank=True, null=True)  # Will be removed after migration

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.author.user.username}'s persona: {self.name}"

class ContentPiece(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived')
    ]

    author = models.ForeignKey(Author, on_delete=models.CASCADE, null=True, blank=True)
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=200, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft', null=True, blank=True)
    tags = models.JSONField(default=list, null=True, blank=True)
    word_count = models.IntegerField(default=0, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.word_count = len(self.content.split())
        super().save(*args, **kwargs)
