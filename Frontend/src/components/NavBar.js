import { AppBar, styled, Toolbar, Typography, Box, Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import SchoolIcon from '@mui/icons-material/School';
import React, {useContext} from "react";
import { theme } from "../Themes/Default-theme";
import { AuthContext} from '../../src/context/AuthContext';


const StyledToolbar = styled(Toolbar)({
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const LogoutButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
        backgroundColor: "red"
      }    
}));



const NavBar = () => {
    const auth = useContext(AuthContext);

    const logoutHandler = () => {
        auth.logout();
    }
  return (
    <AppBar>
      <StyledToolbar>
        <Icons>
          <SchoolIcon />
          <Typography variant="h5">Apna School</Typography>
        </Icons>

        <LogoutButton variant="contained" onClick={logoutHandler} >
          <LogoutIcon />
          Logout
        </LogoutButton>
      </StyledToolbar>
    </AppBar>
  );
};

export default NavBar;
