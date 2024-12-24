// src/components/Layout/NavBar.tsx

import React from 'react';
import { AppBar, Toolbar, Tabs, Tab, Box, Button } from '@mui/material';
import { Link, useLocation, LinkProps, useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { TabProps } from '@mui/material/Tab';

const NavBar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const StyledTab = styled(Tab)<TabProps & LinkProps>(({ theme }) => ({
    color: '#ffffff',
    fontWeight: 'bold',
    textTransform: 'none',
    '&.Mui-selected': {
      color: '#ffffff',
      backgroundColor: '#333333',
      borderRadius: theme.spacing(0.5),
    },
    '&:hover': {
      color: '#aaaaaa',
    },
  }));

  const StyledAppBar = styled(AppBar)({
    backgroundColor: '#000000',
  });

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Tabs value={currentPath} aria-label="nav tabs" TabIndicatorProps={{ style: { backgroundColor: '#ffffff' } }}>
            <StyledTab label="Upload Sample" value="/upload" component={Link} to="/upload" />
            <StyledTab label="Personas" value="/personas" component={Link} to="/personas" />
            <StyledTab label="Blog Posts" value="/blog-posts" component={Link} to="/blog-posts" />
          </Tabs>
        </Box>
        <Box sx={{ marginLeft: 'auto' }}>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavBar;
