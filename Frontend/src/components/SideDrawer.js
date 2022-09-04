import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import SchoolIcon from '@mui/icons-material/School';
import { useNavigate } from "react-router-dom";



const drawerWidth = 240;

export default function SideDrawer() {

    let navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    const handleOptionClick = (text) => {
        console.log(text + ' clicked');
        navigate(text, { replace: true });
    }

    const drawer = (<>
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
              <ListItem key={'All Students'} disablePadding>
                <ListItemButton onClick = {()=>handleOptionClick('/student')}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={'All Students'} />
                </ListItemButton>
              </ListItem>

              <ListItem key={'All Teachers'} disablePadding>
                <ListItemButton onClick = {()=>handleOptionClick('/teacher')}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={'All Teachers'} />
                </ListItemButton>
              </ListItem>

              <ListItem key={'Calendar'} disablePadding>
                <ListItemButton onClick = {()=>handleOptionClick('/calendar')}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Calendar'} />
                </ListItemButton>
              </ListItem>


              <ListItem key={'All Exams'} disablePadding>
                <ListItemButton onClick = {()=>handleOptionClick('/exam')}>
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary={'All Exams'} />
                </ListItemButton>
              </ListItem>
          </List>
        </Box></>
    );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <SchoolIcon sx={{ mr: 1}}/>
          <Typography variant="h6" noWrap component="div">
            Apna School 
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
 