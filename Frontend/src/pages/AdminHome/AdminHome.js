import React, {useContext} from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Toolbar } from '@mui/material';


const AdminHome = () => {
  const auth = useContext(AuthContext);

  return (
    <>
    <Toolbar/>
      <h1>This is an admin page, {auth.user}</h1>
    </>
  );
};

export default AdminHome;