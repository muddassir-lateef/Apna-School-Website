import { Drawer, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Toolbar, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React, { useState } from "react";
import ClassIcon from '@mui/icons-material/Class';
import Face6Icon from '@mui/icons-material/Face6';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
const drawerWidth = 240;
const initial_menuItems = [
  {
    
    menuTitle: "All Students",
    visible: false,
    enteries: [{
      title: "Search Students",
      path: '/students/search',
      icon: <Face6Icon />
    },
    {
      title: "Add Student",
      path: '/students/add',
      icon: <AddIcon />
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
    visible: false,
    enteries: [{
      title: "Search Teacher",
      path: '/teacher/search',
      icon: <PersonSearchIcon />
    },
    {
      title: "Add Teacher",
      path: '/teacher/add',
      icon: <PersonAddIcon />
    },
    {
      title: "Assign Class",
      path: '/teacher/assign',
      icon: <ClassIcon />
    }
    ]
  },

  {
    menuTitle: "Exams",
    visible: false,
    enteries: [{
      title: "All Exams",
      path: '/admin/students',
      icon: <Face6Icon />
    },
    {
      title: "New Exam",
      path: '/admin/teachers',
      icon: <AddIcon />
    },
    {
      title: "Calendar",
      path: '/admin/calendar',
      icon: <CalendarMonthIcon />
    }
    ]
  },
  {
    menuTitle: "Class",
    visible: false,
    enteries: [{
      title: "Search Class",
      path: '/class/searchClass',
      icon: <Face6Icon />
    },
    {
      title: "Add Class",
      path: '/class/addClass',
      icon: <AddIcon />
    },
    {
      title: "Delete Class",
      path: '/admin/calendar',
      icon: <CalendarMonthIcon />
    }
    ]
  },
  {
    menuTitle: "Attendance",
    visible: false,
    enteries: [{
      title: "Mark Student Attendance",
      path: "/attendance/student",
      icon: <Face6Icon />
    },

    ]
  }



]


const SDrawer = (props) => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState(initial_menuItems);

  const updateMenuItemsVisibility = (index) => {
    let temp_menu_items = menuItems;
    temp_menu_items[index].visible = !temp_menu_items[index].visible;
    setMenuItems(temp_menu_items);
  }

  const { mobileOpen } = props;
  const { handleDrawerToggle } = props;

  const handleSideBarClick = (path) => {
    if (mobileOpen) handleDrawerToggle();
    navigate(path, { replace: true });
  }
  const [studentMenuOpen, setStudentMenuOpen] = React.useState(true);

  const handleStudentMenuClick = (index) => {
    updateMenuItemsVisibility(index);
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

          {menuItems.map((menu, index) => (
            <>
              <ListItemButton onClick={()=>handleStudentMenuClick(index)}>
                <ListItemText primary={menu.menuTitle} />
                {menu.visible ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={menu.visible} timeout="auto" unmountOnExit>
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
        <List>

          {menuItems.map((menu, index) => (
            <>
              <ListItemButton onClick={()=>handleStudentMenuClick(index)}>
                <ListItemText primary={menu.menuTitle} />
                {menu.visible ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={menu.visible} timeout="auto" unmountOnExit>
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
