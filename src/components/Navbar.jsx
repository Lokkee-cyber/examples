import React from 'react';
import {
    Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
    Button,
    List,
    ListItem,
    ListItemText,
    Drawer
} from '@mui/material';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useUIStore } from '../store/useUIStore';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useState } from 'react';
import SummaryCards from './SummaryCards';

const white = '#faf8f8ff';
const Navbar = () => {
  const themeMode = useUIStore((state) => state.themeMode);
  const toggleTheme = useUIStore((state) => state.toggleTheme);
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ width: 250, p: 2 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Menu
      </Typography>
      <List>
        <ListItem 
          button 
          component={Link} 
          to="/"
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Dashboard" />
        </ListItem>
        
        <ListItem 
          button 
          component={Link} 
          to="/add-expense"
          onClick={handleDrawerToggle}
        >
          <ListItemText primary="Add Expense" />
        </ListItem>

        {user?.role === 'CEO' && (
          <ListItem 
            button 
            component={Link} 
            to="/ceo-dashboard"
            onClick={handleDrawerToggle}
          >
            <ListItemText primary="CEO Dashboard" />
          </ListItem>
        )}

        <ListItem button onClick={toggleTheme}>
          <ListItemText 
            primary={themeMode === 'dark' ? 'Light Mode' : 'Dark Mode'} 
          />
          {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </ListItem>

        <ListItem 
          button 
          onClick={() => {
            logout();
            handleDrawerToggle();
          }}
          component={Link}
          to="/login"
        >
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar position="static"
    sx={{
        backgroundColor: themeMode === 'dark' ? '#333' : '#1976d2',
    }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
        >
          {drawer}
        </Drawer>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>

        <Box sx={{ alignItems:'end'}}>
          <SummaryCards />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;