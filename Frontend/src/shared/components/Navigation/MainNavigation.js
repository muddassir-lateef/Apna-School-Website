import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import './MainNavigation.css';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import Backdrop from '../UIElements/Backdrop';
import SideBarNavLinks from './SideBarNavLinks';

const MainNavigation = (props) =>{


    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const openDrawerHandler =() =>{
        setDrawerIsOpen(true);
    }

    const closeDrawerHandler =() =>{
        setDrawerIsOpen(false);
    }

    return(
        <div className='main-navigation'>
            {drawerIsOpen? <Backdrop onClick={closeDrawerHandler}/>: null};
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
              <nav className='main-navigation__drawer-nav'><SideBarNavLinks/></nav>
            </SideDrawer>
            <MainHeader className='main_vertical_nav'>
                <button className='main-navigation__menu-btn' onClick={openDrawerHandler}>
                    <span/>
                    <span/>
                    <span/>
                </button>
                <h1 className='main-navigation__title'>
                    <Link to='/'>Apna School</Link>
                </h1>
                
                <nav className='main-navigation__header-nav'>
                    <NavLinks/>
                </nav>
            </MainHeader>
            
            <nav className="sidenav">
                <SideBarNavLinks/>
            </nav>
        </div>
    );
};

export default MainNavigation;