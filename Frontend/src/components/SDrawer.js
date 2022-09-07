import {Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from "@mui/material";

import React from "react";

import Face6Icon from '@mui/icons-material/Face6';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const drawerWidth = 240;
const menuItems = [
    {
        title: "All students",
        path: '/students',
        icon: <Face6Icon/>
    },
    {
        title: "All teachers",
        path: '/teachers',
        icon: <Face6Icon/>
    },
    {
        title: "Calendar",
        path: '/calendar',
        icon: <CalendarMonthIcon/>
    }
]

const SDrawer = (props) => {

  const {mobileOpen}=props;
  const {handleDrawerToggle}=props;

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
                <ListItem button key={item.title} >
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
