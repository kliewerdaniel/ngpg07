import React from 'react';
import { Box, Typography } from '@mui/material';

const About: React.FC = () => {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        About PersonaGen
      </Typography>
      <Typography variant="body1" paragraph>
        PersonaGen is a powerful tool designed to help you generate detailed personas for various applications.
        Our mission is to provide users with an intuitive and efficient way to create personas that can enhance their projects,
        whether it be in marketing, design, or any other field.
      </Typography>
      <Typography variant="body1">
        This application leverages the latest AI technologies to ensure that the personas generated are both realistic and useful.
        We continuously update and improve our algorithms to provide the best user experience possible.
      </Typography>
    </Box>
  );
};

export default About;
