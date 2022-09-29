import { createContext } from 'react';
//import { authenticate } from '../services/auth-service'

export const AuthContext = createContext();
//AuthContext.displayName = 'AuthContext'

export function AuthProvider(props) {

    const login = console.log("login"); 
    return (
            <AuthContext.Provider value={{login}}>
                {props.children}
            </AuthContext.Provider>)};
