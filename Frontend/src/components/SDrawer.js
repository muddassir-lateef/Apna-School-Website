import { Drawer, List, ListItem, ListItemIcon, ListItemButton, ListItemText, Toolbar, Collapse } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import React, { useState } from "react";
import ClassIcon from '@mui/icons-material/Class';
import Face6Icon from '@mui/icons-material/Face6';
import PrintIcon from '@mui/icons-material/Print';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import AddIcon from '@mui/icons-material/Add';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
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
      title: "Results",
      path: '/students/results',
      icon: <SportsScoreIcon /> 
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
      path: '/exams/search',
      icon: <TextSnippetIcon />
    },
    {
      title: "New Exam",
      path: '/exams/add',
      icon: <AddIcon />
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
    }
    ]
  },
  {
    menuTitle: "Fee",
    visible: false,
    enteries: [{
      title: "All Fees",
      path: '/Fee/ViewFees',
      icon: <Face6Icon />
    },
    {
      title: "New Fees",
      path: '/Fee/AddNewFees',
      icon: <AddIcon />
    },
    {
    title : "Print Fee",
    path : '/Fee/PrintFees',
    icon: <PrintIcon />
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
  },
  {
    
    menuTitle: "Certifications",
    visible: false,
    enteries: [{
      title: "Generate Certificate",
      path: '/certificates/generate',
      icon: <CardMembershipIcon />
    },
    ]
  },




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
            <div key={index}>
              <ListItemButton onClick={()=>handleStudentMenuClick(index)}>
                <ListItemText primary={menu.menuTitle} />
                {menu.visible ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={menu.visible} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                  {menu.enteries.map(item => (
                    <div key={item.title}>
                      <ListItem button key={item.title} onClick={() => handleSideBarClick(item.path)} sx={{ pl: 4 }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    </div>
                  ))}
                </List>
              </Collapse>
            </div>
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
            <div key={index}>
              <ListItemButton onClick={()=>handleStudentMenuClick(index)}>
                <ListItemText primary={menu.menuTitle} />
                {menu.visible ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={menu.visible} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                  {menu.enteries.map(item => (
                    <div key={item.title}>
                      <ListItem button key={item.title} onClick={() => handleSideBarClick(item.path)} sx={{ pl: 4 }}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    </div>
                  ))}
                </List>
              </Collapse>
            </div>
          ))}

        </List>
      </Drawer>

    </div>
  );
};

export default SDrawer;
