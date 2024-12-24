# core/serializers.py

from rest_framework import serializers
from .models import Author, Persona, ContentPiece
from .utils import analyze_writing_sample, generate_content
import logging

logger = logging.getLogger(__name__)

class AuthorSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Author
        fields = ['id', 'username', 'email', 'bio', 'created_at']

class PersonaSerializer(serializers.ModelSerializer):
    writing_sample = serializers.CharField(write_only=True, required=False)
    content_count = serializers.SerializerMethodField()

    class Meta:
        model = Persona
        fields = [
            'id', 'name', 'description', 'content_count',
            'vocabulary_complexity', 'sentence_structure', 'paragraph_organization',
            'idiom_usage', 'metaphor_frequency', 'simile_frequency', 'tone',
            'punctuation_style', 'contraction_usage', 'pronoun_preference',
            'passive_voice_frequency', 'rhetorical_question_usage', 'list_usage_tendency',
            'personal_anecdote_inclusion', 'pop_culture_reference_frequency',
            'technical_jargon_usage', 'parenthetical_aside_frequency',
            'humor_sarcasm_usage', 'emotional_expressiveness', 'emphatic_device_usage',
            'quotation_frequency', 'analogy_usage', 'sensory_detail_inclusion',
            'onomatopoeia_usage', 'alliteration_frequency', 'word_length_preference',
            'foreign_phrase_usage', 'rhetorical_device_usage', 'statistical_data_usage',
            'personal_opinion_inclusion', 'transition_usage', 'reader_question_frequency',
            'imperative_sentence_usage', 'dialogue_inclusion', 'regional_dialect_usage',
            'hedging_language_frequency', 'language_abstraction', 'personal_belief_inclusion',
            'repetition_usage', 'subordinate_clause_frequency', 'verb_type_preference',
            'sensory_imagery_usage', 'symbolism_usage', 'digression_frequency',
            'formality_level', 'reflection_inclusion', 'irony_usage',
            'neologism_frequency', 'ellipsis_usage', 'cultural_reference_inclusion',
            'stream_of_consciousness_usage', 'openness_to_experience', 'conscientiousness',
            'extraversion', 'agreeableness', 'emotional_stability',
            'dominant_motivations', 'core_values', 'decision_making_style',
            'empathy_level', 'self_confidence', 'risk_taking_tendency',
            'idealism_vs_realism', 'conflict_resolution_style', 'relationship_orientation',
            'emotional_response_tendency',
            'creativity_level',
            'age',
            'gender',
            'education_level',
            'professional_background',
            'cultural_background',
            'primary_language',
            'language_fluency',
            'is_active', 'created_at', 'updated_at', 'writing_sample'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'content_count']

    def get_content_count(self, obj):
        return obj.contentpiece_set.count()

    def create(self, validated_data):
        writing_sample = validated_data.pop('writing_sample', None)
        author = self.context['request'].user.author
        validated_data['author'] = author

        if writing_sample:
            analyzed_data = analyze_writing_sample(writing_sample)
            if analyzed_data:
                # Map analyzed data to individual fields
                for field, value in analyzed_data.items():
                    if hasattr(Persona, field):
                        validated_data[field] = value                
                        if 'name' in analyzed_data:
                            validated_data['name'] = analyzed_data['name']
            else:
                logger.error("Failed to analyze writing sample.")
                raise serializers.ValidationError({"writing_sample": "Failed to analyze the writing sample."})

        return super().create(validated_data)

class ContentPieceSerializer(serializers.ModelSerializer):
    persona_name = serializers.CharField(source='persona.name', read_only=True)
    
    class Meta:
        model = ContentPiece
        fields = ['id', 'title', 'content', 'persona', 'persona_name', 'status',
                 'tags', 'word_count', 'created_at', 'updated_at', 'published_at']
        read_only_fields = ['id', 'word_count', 'created_at', 'updated_at']
