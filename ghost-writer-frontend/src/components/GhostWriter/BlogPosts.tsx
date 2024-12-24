// src/components/GhostWriter/BlogPosts.tsx

import React, { useEffect, useState } from 'react';
import axios from '../../services/api'; // Adjust the path if necessary
import { CircularProgress, Typography, Box, Card, CardContent, Button } from '@mui/material';
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';

interface BlogPost {
  id: number;
  persona_name: string;
  title: string;
  content: string;
  created_at: string;
}

const BlogPosts: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('content/');
        setBlogPosts(response.data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const deleteBlogPost = async (id: number) => {
    try {
      await axios.delete(`content/${id}/`);
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      console.error('Error deleting blog post:', err);
      setError('Failed to delete blog post.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={4} sx={{ maxWidth: '1000px', mx: 'auto' }}>
      <Typography 
        variant="h3" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: 6,
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Blog Posts
      </Typography>
      {blogPosts.length > 0 && (
        <Card 
          sx={{ 
            mb: 6, 
            p: 3, 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', 
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              color: 'primary.main', 
              fontWeight: 'bold', 
              mb: 3,
              borderBottom: '2px solid',
              borderImage: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%) 1',
              paddingBottom: 1
            }}
          >
            Table of Contents
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {blogPosts.map((post) => (
              <Box
                key={`link-${post.id}`}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 2,
                  borderRadius: 1,
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(33, 150, 243, 0.05)',
                    transform: 'translateX(8px)',
                  }
                }}
              >
                <ScrollLink 
                  to={`post-${post.id}`} 
                  smooth={true} 
                  duration={500} 
                  offset={-70}
                  style={{ cursor: 'pointer' }}
                >
                  <Typography 
                    variant="h6"
                    sx={{
                      fontWeight: 500,
                      color: 'primary.main',
                      mb: 0.5,
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Box 
                    sx={{ 
                      display: 'flex', 
                      gap: 2, 
                      alignItems: 'center',
                      color: 'text.secondary',
                      fontSize: '0.875rem'
                    }}
                  >
                    <Typography component="span">
                      By {post.persona_name}
                    </Typography>
                    <Typography component="span">•</Typography>
                    <Typography component="span">
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </Typography>
                  </Box>
                </ScrollLink>
              </Box>
            ))}
          </Box>
        </Card>
      )}
      {blogPosts.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            p: 4, 
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2
          }}
        >
          <Typography variant="h6" color="text.secondary">No blog posts found.</Typography>
        </Box>
      ) : (
        blogPosts.map((post) => (
          <Card 
            key={post.id} 
            id={`post-${post.id}`}
            sx={{ 
              mb: 4,
              borderRadius: 2,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 6,
              },
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography 
                variant="h4" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main',
                  mb: 3
                }}
              >
                {post.title || 'Untitled'}
              </Typography>
              <Box sx={{ mb: 4 }}>
                {post.content.split('\n').map((paragraph, index) => (
                  <Typography 
                    key={index} 
                    paragraph 
                    sx={{ 
                      lineHeight: 1.8,
                      color: 'text.primary',
                      fontSize: '1.1rem'
                    }}
                  >
                    {paragraph}
                  </Typography>
                ))}
              </Box>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mt: 3,
                pt: 3,
                borderTop: '1px solid rgba(0, 0, 0, 0.1)'
              }}>
                <Typography 
                  variant="subtitle2" 
                  color="text.secondary"
                  sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  By {post.persona_name} • {new Date(post.created_at).toLocaleString()}
                </Typography>
                <Button 
                  variant="outlined" 
                  color="error" 
                  onClick={() => deleteBlogPost(post.id)}
                  sx={{ 
                    borderRadius: 2,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: 'error.main',
                      color: 'white'
                    }
                  }}
                >
                  Delete Post
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
      <Button
        variant="contained"
        color="primary"
        onClick={() => scroll.scrollToTop()}
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        Scroll to Top
      </Button>
    </Box>
  );
};

export default BlogPosts;
