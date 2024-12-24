// src/components/GhostWriter/UploadSample.tsx

import React, { useState } from 'react';
import axios from '../../services/api';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Alert, 
  Stack,
  Paper,
  Container,
  CircularProgress,
  Fade,
  useTheme
} from '@mui/material';
import { motion } from 'framer-motion';

const UploadSample: React.FC = () => {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [writingSample, setWritingSample] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const payload = {
      name: name.trim(),
      writing_sample: writingSample.trim(),
    };

    try {
      setLoading(true);
      console.log('Payload being sent:', payload);
      const response = await axios.post('personas/', payload);
      console.log('Response received:', response.data);
      setSuccess(`Persona "${response.data.name}" created successfully!`);
      setError(null);
      setName('');
      setWritingSample('');
    } catch (error: any) {
      console.error('Error uploading writing sample:', error);
      console.log('Error response:', error.response);
      if (error.response && error.response.data) {
        setError(JSON.stringify(error.response.data));
      } else {
        setError('An error occurred while uploading the writing sample.');
      }
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mt: 4, 
            borderRadius: 2,
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(145deg, #1a1a1a 0%, #2d2d2d 100%)'
              : 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
          }}
        >
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              mb: 3
            }}
          >
            Create Your Persona
          </Typography>
          
          <Fade in={!!error}>
            <Box sx={{ mb: error ? 2 : 0 }}>
              {error && (
                <Alert 
                  severity="error" 
                  sx={{ 
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      fontSize: '1.5rem'
                    }
                  }}
                >
                  {error}
                </Alert>
              )}
            </Box>
          </Fade>

          <Fade in={!!success}>
            <Box sx={{ mb: success ? 2 : 0 }}>
              {success && (
                <Alert 
                  severity="success"
                  sx={{ 
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      fontSize: '1.5rem'
                    }
                  }}
                >
                  {success}
                </Alert>
              )}
            </Box>
          </Fade>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Persona Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                inputProps={{ maxLength: 100 }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }
                  }
                }}
              />
              <TextField
                label="Writing Sample"
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                value={writingSample}
                onChange={(e) => setWritingSample(e.target.value)}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    transition: 'all 0.2s',
                    '&:hover': {
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }
                  }
                }}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  borderRadius: 2,
                  py: 1.5,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 16px rgba(33,150,243,0.3)'
                  },
                  '&:disabled': {
                    background: theme.palette.action.disabledBackground
                  }
                }}
              >
                {loading ? (
                  <Stack direction="row" spacing={1} alignItems="center">
                    <CircularProgress size={20} color="inherit" />
                    <span>Processing...</span>
                  </Stack>
                ) : (
                  'Create Persona'
                )}
              </Button>
            </Stack>
          </form>
        </Paper>
      </motion.div>
    </Container>
  );
};

export default UploadSample;
