import React, {useContext} from 'react';
import NavBar from './NavBar';
import { AuthContext } from '../context/AuthContext';
import SDrawer from './SDrawer';
import { useNavigate } from 'react-router-dom';

const NavigationUI = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    auth.logout();
    navigate("/", { replace: true });
  }
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {

    setMobileOpen(!mobileOpen);
  };
  return (
    <>
        <NavBar
          logoutHandler={logoutHandler}
          handleDrawerToggle={handleDrawerToggle}
        />
        <SDrawer
          mobileOpen={mobileOpen}
          handleDrawerToggle={handleDrawerToggle}
        />
    </>
  );
};

export default NavigationUI;