import {Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { useNavigate } from "react-router-dom";

import React from "react";

import Face6Icon from '@mui/icons-material/Face6';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const drawerWidth = 240;
const menuItems = [
    {
        title: "All students",
        path: '/admin/students',
        icon: <Face6Icon/>
    },
    {
        title: "All teachers",
        path: '/admin/teachers',
        icon: <Face6Icon/>
    },
    {
        title: "Calendar",
        path: '/admin/calendar',
        icon: <CalendarMonthIcon/>
    }
]

const SDrawer = (props) => {
  const navigate = useNavigate();

  const {mobileOpen}=props;
  const {handleDrawerToggle}=props;
  const handleSideBarClick = (path) => {
    navigate(path, { replace: true });
  }

  return (
    <div>
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
        <Toolbar />
        <List>
            {menuItems.map(item => (
                <ListItem button key={item.title} onClick={() => handleSideBarClick(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title}/>
                </ListItem>
            ))}
        </List>
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
        <Toolbar />
        <List>
            {menuItems.map(item => (
                <ListItem button key={item.title} >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.title}/>
                </ListItem>
            ))}
        </List>
      </Drawer>
 
    </div>
  );
};

export default SDrawer;
