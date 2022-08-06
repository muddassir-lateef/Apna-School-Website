import React, {useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';
 
const NavLinks = (props)=>{
    const navigate = useNavigate();

    const auth = useContext(AuthContext);
    const logoutHandler = () =>{
        auth.logout();
        navigate("/auth", { replace: true });
    }
    
    return(
        <div className='nav-links'>
            <div className='logout-btn'>
            {auth.isLoggedIn &&(
                <li>
                    <button onClick={logoutHandler}>LOGOUT</button>
                </li>)
            }
            </div>
        </div>
    );
};

export default NavLinks;