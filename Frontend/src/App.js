import './App.css';
import {BrowserRouter as Router, Route, Navigate, Routes} from 'react-router-dom';
import React, { useState, useCallback } from 'react';

import { AuthContext } from './shared/context/auth-context';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Auth from './staff/pages/Auth';
import Students from './students/pages/Students';
import NewStudent from './students/pages/NewStudent';
import NewTeacher from './teachers/pages/NewTeacher';

function App() {/////
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const login = useCallback(()=>{
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(()=>{
    setIsLoggedIn(false);
  }, []);

  let routes;
  if(isLoggedIn){
    routes = (
      <Routes>
        <Route path="/" element={<Navigate to="/students" />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/students" element={<Students/>}></Route>
        <Route path="/student/new" element={<NewStudent/>}></Route>
        <Route path="/teacher/new" element={<NewTeacher/>}></Route>
      </Routes>
    );
  }
  else{
    routes = (
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <Router>
        <MainNavigation />
        <main>
          {routes}
        </main>
      </Router>
    </AuthContext.Provider>
  );
}



export default App;
