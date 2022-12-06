import { createContext } from "react";

export const  AuthContext = createContext({
    isLogged: false, 
    user : null,
    key: null,
    setKey: ()=>{},
    setUser: ()=>{},
    login: () => {},
    logout: () => {}
});