import React, {useContext} from 'react';

import './Layout.css';
import { AuthContext } from '../context/AuthContext';
import SideDrawer from './SideDrawer';


const Layout = (props) => {
    const auth = useContext(AuthContext);
    return (
      <div className="root">
        {auth.isLogged && <SideDrawer />}
        <div className="page">{props.children}</div>
        <h5 text-align="right">This is a sample tag</h5>
        <p>Hello world</p>
      </div>
    );
}

export default Layout;