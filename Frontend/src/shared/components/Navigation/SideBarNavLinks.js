import React, {useContext} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../context/auth-context';
import './NavLinks.css';
 
const SideBarNavLinks = (props)=>{
    const navigate = useNavigate();

    const auth = useContext(AuthContext);
    const logoutHandler = () =>{
        auth.logout();
        navigate("/auth", { replace: true });
    }
    
    return(
        <ul className='nav-links'>
            {auth.isLoggedIn &&(
                <li className='first-item'>
                    <NavLink to='/students' exact>All Students</NavLink>
                </li>)
            }
            {auth.isLoggedIn &&(
                <li>
                    <NavLink to='/student/new'>Add Student</NavLink>
                </li>)
            }
            {auth.isLoggedIn &&(
                <li>
                    <NavLink to='/teacher/new'>Add Teacher</NavLink>
                </li>)
            } 
            {auth.isLoggedIn &&(
                <li>
                    <NavLink to='/student/new'>Add Student</NavLink>
                </li>)
            }
            {auth.isLoggedIn &&(
                <li>
                    <NavLink to='/teacher/new'>Add Teacher</NavLink>
                </li>)
            } {auth.isLoggedIn &&(
                <li>
                    <NavLink to='/student/new'>Add Student</NavLink>
                </li>)
            }
            {auth.isLoggedIn &&(
                <li>
                    <NavLink to='/teacher/new'>Add Teacher</NavLink>
                </li>)
            } {auth.isLoggedIn &&(
                <li>
                    <NavLink to='/student/new'>Add Student</NavLink>
                </li>)
            }
            {auth.isLoggedIn &&(
                <li>
                    <NavLink to='/teacher/new'>Add Teacher</NavLink>
                </li>)
            } {auth.isLoggedIn &&(
                <li>
                    <NavLink to='/student/new'>Add Student</NavLink>
                </li>)
            }
            {auth.isLoggedIn &&(
                <li>
                    <NavLink to='/teacher/new'>Add Teacher</NavLink>
                </li>)
            } {auth.isLoggedIn &&(
                <li>
                    <NavLink to='/student/new'>Add Student</NavLink>
                </li>)
            }
            {auth.isLoggedIn &&(
                <li>
                    <NavLink to='/teacher/new'>Add Teacher</NavLink>
                </li>)
            } 
            
            {!auth.isLoggedIn &&(
                <li className='last-item'>
                    <NavLink to='/auth'>Authenticate</NavLink>
                </li>)
            }
            {auth.isLoggedIn &&(
                <li className='last-item'>
                    <button onClick={logoutHandler}>LOGOUT</button>
                </li>)
            }
        </ul>
    );
};

export default SideBarNavLinks;