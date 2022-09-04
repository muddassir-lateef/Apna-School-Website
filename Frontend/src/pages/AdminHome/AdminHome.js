import React, {useContext} from 'react';

import { AuthContext } from '../../context/AuthContext';

const AdminHome = () => {
  const auth = useContext(AuthContext);
  return (
    <>
      <h1>Admin Panel</h1>
      <h2>Hello get siked gashti {auth.user}</h2>
    </>
  );
};

export default AdminHome;