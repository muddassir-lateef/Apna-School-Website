import { useState, useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import { Box, Toolbar } from "@mui/material";
import "./App.css";

import NavigationUI from "./components/NavigationUI";
import { LoggedInRoutes, LoggedOutRoutes } from "./routes/AllRoutes";

function App() {
  /////
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [key, setKey] = useState("");
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);
  const setCurrentUser = useCallback((u) => {
    setUser(u);
  }, []);
  const setSecretKey = useCallback((k) => {
    setKey(k);
  }, []);

  let routes = loggedIn ? LoggedInRoutes() : LoggedOutRoutes();

  return (
    <AuthContext.Provider
      value={{
        isLogged: loggedIn,
        login: login,
        logout: logout,
        key: key,
        user: user,
        setUser: setCurrentUser,
        setKey: setSecretKey
      }}
    >
      <Router>
        <Box sx={{ display: "flex" }}>
          {loggedIn && <NavigationUI />}
          {loggedIn && (
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Toolbar/>
              {routes}
            </Box>
          )}
          {!loggedIn && (
            <Box component="main" sx={{ flexGrow: 1 }}>
              {routes}
            </Box>
          )}
        </Box>
      </Router>
    </AuthContext.Provider> 
  );
}

export default App;
