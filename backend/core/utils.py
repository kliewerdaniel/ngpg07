# Import necessary libraries
import logging
import json
import os
import re
import requests
from dotenv import load_dotenv

# Configure logger
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()
OLLAMA_BASE_URL = 'http://localhost:11434/api/generate'

def extract_json(text):
    """
    Extracts the first JSON object found in a text string.
    
    Parameters:
    - text (str): The text containing JSON data.
    
    Returns:
    - dict: The extracted JSON data as a dictionary.
    """
    try:
        json_str = re.search(r'\{.*\}', text, re.DOTALL).group()
        return json.loads(json_str)
    except (AttributeError, json.JSONDecodeError):
        logger.error("Failed to extract JSON from the text.")
        return None
    
def analyze_writing_sample(writing_sample):
    """
    Analyzes a given writing sample to assess various characteristics.
    
    Parameters:
    - writing_sample (str): The text to analyze.
    
    Returns:
    - dict: Analysis results in JSON format.
    """

    prompt = f'''
                    Please analyze the writing style and personality of the given writing sample. Provide a detailed assessment of their characteristics using the following template. Rate each applicable characteristic on a scale of 1-10 where relevant, or provide a descriptive value. Return the results in a JSON format. Strictly only output the JSON object as outlined. If what you output is not in the following format reconstruct it so that it is.

                    "name": "[Author/Character Name]",
                    "vocabulary_complexity": [1-10],
                    "sentence_structure": "[simple/complex/varied]",
                    "paragraph_organization": "[structured/loose/stream-of-consciousness]",
                    "idiom_usage": [1-10],
                    "metaphor_frequency": [1-10],
                    "simile_frequency": [1-10],
                    "tone": "[formal/informal/academic/conversational/etc.]",
                    "punctuation_style": "[minimal/heavy/unconventional]",
                    "contraction_usage": [1-10],
                    "pronoun_preference": "[first-person/third-person/etc.]",
                    "passive_voice_frequency": [1-10],
                    "rhetorical_question_usage": [1-10],
                    "list_usage_tendency": [1-10],
                    "personal_anecdote_inclusion": [1-10],
                    "pop_culture_reference_frequency": [1-10],
                    "technical_jargon_usage": [1-10],
                    "parenthetical_aside_frequency": [1-10],
                    "humor_sarcasm_usage": [1-10],
                    "emotional_expressiveness": [1-10],
                    "emphatic_device_usage": [1-10],
                    "quotation_frequency": [1-10],
                    "analogy_usage": [1-10],
                    "sensory_detail_inclusion": [1-10],
                    "onomatopoeia_usage": [1-10],
                    "alliteration_frequency": [1-10],
                    "word_length_preference": "[short/long/varied]",
                    "foreign_phrase_usage": [1-10],
                    "rhetorical_device_usage": [1-10],
                    "statistical_data_usage": [1-10],
                    "personal_opinion_inclusion": [1-10],
                    "transition_usage": [1-10],
                    "reader_question_frequency": [1-10],
                    "imperative_sentence_usage": [1-10],
                    "dialogue_inclusion": [1-10],
                    "regional_dialect_usage": [1-10],
                    "hedging_language_frequency": [1-10],
                    "language_abstraction": "[concrete/abstract/mixed]",
                    "personal_belief_inclusion": [1-10],
                    "repetition_usage": [1-10],
                    "subordinate_clause_frequency": [1-10],
                    "verb_type_preference": "[active/stative/mixed]",
                    "sensory_imagery_usage": [1-10],
                    "symbolism_usage": [1-10],
                    "digression_frequency": [1-10],
                    "formality_level": [1-10],
                    "reflection_inclusion": [1-10],
                    "irony_usage": [1-10],
                    "neologism_frequency": [1-10],
                    "ellipsis_usage": [1-10],
                    "cultural_reference_inclusion": [1-10],
                    "stream_of_consciousness_usage": [1-10],
                    "openness_to_experience": [1-10],
                    "conscientiousness": [1-10],
                    "extraversion": [1-10],
                    "agreeableness": [1-10],
                    "emotional_stability": [1-10],
                    "dominant_motivations": "[achievement/affiliation/power/etc.]",
                    "core_values": "[integrity/freedom/knowledge/etc.]",
                    "decision_making_style": "[analytical/intuitive/spontaneous/etc.]",
                    "empathy_level": [1-10],
                    "self_confidence": [1-10],
                    "risk_taking_tendency": [1-10],
                    "idealism_vs_realism": "[idealistic/realistic/mixed]",
                    "conflict_resolution_style": "[assertive/collaborative/avoidant/etc.]",
                    "relationship_orientation": "[independent/communal/mixed]",
                    "emotional_response_tendency": "[calm/reactive/intense]",
                    "creativity_level": [1-10],
                    "age": "[age or age range]",
                    "gender": "[gender]",
                    "education_level": "[highest level of education]",
                    "professional_background": "[brief description]",
                    "cultural_background": "[brief description]",
                    "primary_language": "[language]",
                    "language_fluency": "[native/fluent/intermediate/beginner]",

                    Writing Sample:
                    {writing_sample}
                    '''
    payload = {
        'model': 'qwen2.5:32b',  # Replace with your Ollama model name
        'prompt': prompt,
        'stream': False
    }
    headers = {'Content-Type': 'application/json'}

    try:
        response = requests.post(OLLAMA_BASE_URL, json=payload, headers=headers)
        with open("generated_text.md", "w") as f:
            f.write(response.text)
        
        data = json.loads(response.text)
        response_str = data['response']
        analyzed_data = json.loads(response_str)
        
        
        
        return analyzed_data
    except (requests.RequestException, json.JSONDecodeError, AttributeError) as e:
        logger.error(f"Error during analyze_writing_sample: {str(e)}")
        return None
    


def generate_content(persona, prompt):
    """
    Generates content based on a given persona and prompt.
    
    Parameters:
    - persona (Persona): The persona object with individual fields.
    - prompt (str): The prompt to write about.
    
    Returns:
    - str: The generated content.
    """
  
        # Convert persona fields into a format suitable for the prompt
    persona_traits = {
            "Writing Style": {
                "vocabulary_complexity": f"{persona.vocabulary_complexity}/10",
                "sentence_structure": persona.sentence_structure,
                "paragraph_organization": persona.paragraph_organization,
                "tone": persona.tone,
                "punctuation_style": persona.punctuation_style,
                "pronoun_preference": persona.pronoun_preference,
                "formality_level": f"{persona.formality_level}/10",
            },
            "Language Patterns": {
                "idiom_usage": f"{persona.idiom_usage}/10",
                "metaphor_frequency": f"{persona.metaphor_frequency}/10",
                "simile_frequency": f"{persona.simile_frequency}/10",
                "technical_jargon_usage": f"{persona.technical_jargon_usage}/10",
                "humor_sarcasm_usage": f"{persona.humor_sarcasm_usage}/10",
            },
            "Personality": {
                "openness_to_experience": f"{persona.openness_to_experience}/10",
                "conscientiousness": f"{persona.conscientiousness}/10",
                "extraversion": f"{persona.extraversion}/10",
                "agreeableness": f"{persona.agreeableness}/10",
                "emotional_stability": f"{persona.emotional_stability}/10",
                "dominant_motivations": persona.dominant_motivations,
                "core_values": persona.core_values,
                "decision_making_style": persona.decision_making_style,
                "emotional_response_tendency": persona.emotional_response_tendency,
            "creativity_level": f"{persona.creativity_level}/10",
            },
            "Demographics": {
            "age": persona.age,
            "gender": persona.gender,
            "education_level": persona.education_level,
            "professional_background": persona.professional_background,
            "cultural_background": persona.cultural_background,
            "primary_language": persona.primary_language,
            "language_fluency": persona.language_fluency,
        },
        }

        # Create the system prompt
    system_prompt = f"""You are a writer with the following characteristics:

Writing Style:
{persona_traits['Writing Style']}

Language Patterns:
{persona_traits['Language Patterns']}

Personality:
{persona_traits['Personality']}

Demographics:
    {persona_traits['Demographics']}

Write in a way that naturally reflects these characteristics. The response should include a title."""

        # Combine system prompt and user prompt
    combined_prompt = f"{system_prompt}\n\nWrite about: {prompt}"

    payload = {
        'model': 'qwen2.5:32b',  # Replace with your Ollama model name
        'prompt': combined_prompt,
        'stream': False
    }
    headers = {'Content-Type': 'application/json'}

    try:
        logger.info(f"Sending request to OLLAMA API at {OLLAMA_BASE_URL} with payload: {payload}")
        response = requests.post(OLLAMA_BASE_URL, json=payload, headers=headers)
        logger.info(f"Received response from OLLAMA API: Status Code {response.status_code}")

        response.raise_for_status()

        response_json = response.json()
        response_content = response_json.get('response', '').strip()
        if not response_content:
            logger.error("OLLAMA API response 'response' field is empty.")
            return ''

        return response_content

    except requests.RequestException as e:
        logger.error(f"Error during generate_content: {e}")
        if hasattr(e, 'response') and e.response:
            logger.error(f"Ollama Response Status: {e.response.status_code}")
            logger.error(f"Ollama Response Body: {e.response.text}")
        return ''


def save_blog_post(blog_post, title):
    """
    Saves a blog post to a file.
    
    Parameters:
    - blog_post (str): The content of the blog post.
    - title (str): The title of the blog post.
    """
    # Implement if needed
    pass
