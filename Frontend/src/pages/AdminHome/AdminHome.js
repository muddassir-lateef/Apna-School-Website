import React, {useContext} from 'react';
import NavBar from '../../components/NavBar';
import { AuthContext } from '../../context/AuthContext';
import SDrawer from '../../components/SDrawer';
import AllStudents from '../Students/AllStudents';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';


const AdminHome = () => {
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logout();
  }
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    console.log("Drawer toggled")

    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar
          logoutHandler={logoutHandler}
          handleDrawerToggle={handleDrawerToggle}
        />
        <SDrawer
          mobileOpen={mobileOpen}
                handleDrawerToggle={handleDrawerToggle}   
        />

        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <AllStudents />
        </Box>
      </Box>
    </>
  );
};

export default AdminHome;