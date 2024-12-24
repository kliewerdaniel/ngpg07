import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Slider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Grid,
  CircularProgress,
} from '@mui/material';
import axios from '../../services/api';

interface Persona {
  id: number;
  name: string;
  description: string;
  vocabulary_complexity: number;
  sentence_structure: string;
  paragraph_organization: string;
  tone: string;
  formality_level: number;
  emotional_expressiveness: number;
  humor_sarcasm_usage: number;
  technical_jargon_usage: number;
  openness_to_experience: number;
  empathy_level: number;
  self_confidence: number;
  decision_making_style: string;
  core_values: string;
  dominant_motivations: string;
}

const EditPersona: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const response = await axios.get(`personas/${id}/`);
        setPersona(response.data);
      } catch (err) {
        console.error('Error fetching persona:', err);
        setError('Failed to load persona.');
      } finally {
        setLoading(false);
      }
    };

    fetchPersona();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!persona) return;

    try {
      await axios.put(`personas/${id}/`, persona);
      navigate('/personas');
    } catch (err) {
      console.error('Error updating persona:', err);
      setError('Failed to update persona.');
    }
  };

  const handleChange = (field: keyof Persona) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | Event,
    value?: number | number[]
  ) => {
    if (!persona) return;

    if (field.includes('level') || field.includes('complexity') || field.includes('usage')) {
      setPersona({
        ...persona,
        [field]: value as number,
      });
    } else {
      setPersona({
        ...persona,
        [field]: (event.target as HTMLInputElement).value,
      });
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !persona) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error || 'Persona not found'}</Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Edit Persona
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name"
              value={persona.name}
              onChange={handleChange('name')}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              value={persona.description}
              onChange={handleChange('description')}
              multiline
              rows={4}
              required
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Vocabulary Complexity</Typography>
            <Slider
              value={persona.vocabulary_complexity}
              onChange={handleChange('vocabulary_complexity')}
              min={1}
              max={10}
              marks
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Sentence Structure</InputLabel>
              <Select
                value={persona.sentence_structure}
                onChange={handleChange('sentence_structure') as any}
                label="Sentence Structure"
              >
                <MenuItem value="simple">Simple</MenuItem>
                <MenuItem value="compound">Compound</MenuItem>
                <MenuItem value="complex">Complex</MenuItem>
                <MenuItem value="varied">Varied</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Paragraph Organization</InputLabel>
              <Select
                value={persona.paragraph_organization}
                onChange={handleChange('paragraph_organization') as any}
                label="Paragraph Organization"
              >
                <MenuItem value="linear">Linear</MenuItem>
                <MenuItem value="hierarchical">Hierarchical</MenuItem>
                <MenuItem value="comparative">Comparative</MenuItem>
                <MenuItem value="chronological">Chronological</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Tone</InputLabel>
              <Select
                value={persona.tone}
                onChange={handleChange('tone') as any}
                label="Tone"
              >
                <MenuItem value="formal">Formal</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Sliders for numeric values */}
          {[
            { field: 'formality_level', label: 'Formality Level' },
            { field: 'emotional_expressiveness', label: 'Emotional Expressiveness' },
            { field: 'humor_sarcasm_usage', label: 'Humor/Sarcasm Usage' },
            { field: 'technical_jargon_usage', label: 'Technical Jargon Usage' },
            { field: 'openness_to_experience', label: 'Openness to Experience' },
            { field: 'empathy_level', label: 'Empathy Level' },
            { field: 'self_confidence', label: 'Self Confidence' },
          ].map(({ field, label }) => (
            <Grid item xs={12} md={6} key={field}>
              <Typography gutterBottom>{label}</Typography>
              <Slider
                value={persona[field as keyof Persona] as number}
                onChange={handleChange(field as keyof Persona)}
                min={1}
                max={10}
                marks
                valueLabelDisplay="auto"
              />
            </Grid>
          ))}

          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Decision Making Style</InputLabel>
              <Select
                value={persona.decision_making_style}
                onChange={handleChange('decision_making_style') as any}
                label="Decision Making Style"
              >
                <MenuItem value="analytical">Analytical</MenuItem>
                <MenuItem value="intuitive">Intuitive</MenuItem>
                <MenuItem value="collaborative">Collaborative</MenuItem>
                <MenuItem value="decisive">Decisive</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Core Values"
              value={persona.core_values}
              onChange={handleChange('core_values')}
              multiline
              rows={3}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dominant Motivations"
              value={persona.dominant_motivations}
              onChange={handleChange('dominant_motivations')}
              multiline
              rows={3}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
          <Button onClick={() => navigate('/personas')} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default EditPersona;
