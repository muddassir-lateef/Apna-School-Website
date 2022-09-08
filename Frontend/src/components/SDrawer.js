import { Drawer, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Toolbar, Collapse, ListSubheader } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import React from "react";

import Face6Icon from '@mui/icons-material/Face6';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NestedList from "./NestedList";
import Divider from '@mui/material/Divider';
const drawerWidth = 240;
const menuItems = [
  {
    
    menuTitle: "Student",
    enteries: [{
      title: "All students",
      path: '/admin/students',
      icon: <Face6Icon />
    },
    {
      title: "All teachers",
      path: '/admin/teachers',
      icon: <Face6Icon />
    },
    {
      title: "Calendar",
      path: '/admin/calendar',
      icon: <CalendarMonthIcon />
    }
    ]
  },

  {
    menuTitle: "Teacher",
    enteries: [{
      title: "All students",
      path: '/admin/students',
      icon: <Face6Icon />
    },
    {
      title: "All teachers",
      path: '/admin/teachers',
      icon: <Face6Icon />
    },
    {
      title: "Calendar",
      path: '/admin/calendar',
      icon: <CalendarMonthIcon />
    }
    ]
  }

]


const SDrawer = (props) => {
  const navigate = useNavigate();

  const { mobileOpen } = props;
  const { handleDrawerToggle } = props;

  const handleSideBarClick = (path) => {
    if (mobileOpen) handleDrawerToggle();
    navigate(path, { replace: true });
  }
  const [studentMenuOpen, setStudentMenuOpen] = React.useState(true);

  const handleStudentMenuClick = () => {
    setStudentMenuOpen(!studentMenuOpen);
  };

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
        <List >

          {menuItems.map((menu) => (
            <>
              <ListItemButton onClick={handleStudentMenuClick}>
                <ListItemText primary={menu.menuTitle} />
                {studentMenuOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={studentMenuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                  {menu.enteries.map(item => (
                    <>
                      <ListItem button key={item.title} onClick={() => handleSideBarClick(item.path)} sx={{ pl: 4 }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    </>
                  ))}
                </List>
              </Collapse>
            </>
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
        <List >

          {menuItems.map((menu) => (
            <>
              <ListItemButton onClick={handleStudentMenuClick}>
                <ListItemText primary={menu.menuTitle} />
                {studentMenuOpen ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={studentMenuOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                  {menu.enteries.map(item => (
                    <>
                      <ListItem button key={item.title} onClick={() => handleSideBarClick(item.path)} sx={{ pl: 4 }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    </>
                  ))}
                </List>
              </Collapse>
            </>
          ))}

        </List>
      </Drawer>

    </div>
  );
};

export default SDrawer;
