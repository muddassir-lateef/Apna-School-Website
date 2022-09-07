import React, {useContext} from 'react';
import NavBar from '../../components/NavBar';
import { AuthContext } from '../../context/AuthContext';
import SDrawer from '../../components/SDrawer';
const AdminHome = () => {
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logout();
  }
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <NavBar logoutHandler={logoutHandler} handleDrawerToggle={handleDrawerToggle} />
      <SDrawer mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
    </>
  );
};

export default AdminHome;