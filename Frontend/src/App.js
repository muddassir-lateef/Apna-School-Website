import { useState, useCallback } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {AuthContext} from './context/AuthContext';

import './App.css';
import SignIn from'./pages/SignIn/Signin';
import AdminHome from './pages/AdminHome/AdminHome';
import SideDrawer from './components/SideDrawer';
import AllStudents from './pages/Students/AllStudents';


function App() {
  /////

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  const setCurrentUser = useCallback((u)=>{
    setUser(u);
  }, [])

  let routes;
  if (loggedIn){
    routes = (
      <Routes>
        <Route path="/student" element={<AllStudents />} />
        <Route path="/" element={<AdminHome />} />
      </Routes>
    );

  }
  else{
    routes = (
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLogged: loggedIn, login: login, logout: logout, user:user, setUser:setCurrentUser }}
    >
      <Router>
      {loggedIn && <SideDrawer/>}
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}


export default App;
