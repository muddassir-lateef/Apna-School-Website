import React, {useContext} from 'react';
import NavBar from '../../components/NavBar';
import { AuthContext } from '../../context/AuthContext';

const AdminHome = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <NavBar/>
    </>
  );
};

export default AdminHome;