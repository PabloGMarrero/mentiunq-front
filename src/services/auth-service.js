import axios from 'axios';
import { REST_API_URL } from './constants'
import React, { useState, useContext, createContext, useMemo } from "react";

const API_URL = `${REST_API_URL}/oauth`;

export const authenticate = (request) => {
    return axios.post(API_URL + "/authenticate", request);
}

const authContext = createContext()

export const AuthProvider = ({ children }) => {
    const [authed, setAuthed] = useState(false);
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(false)
  
    const login = (request) => {
        setLoading(true);
        console.log("antes authenticate")
        authenticate(request)
        .then((resp)=>{
            console.log("antes then")
            setAuthed(true);
            handleSubmit(resp);
            console.log("despues then")
        })
        .catch((err)=>{
            console.log("antes catch")
            setAuthed(false)
            console.log(err)
            console.log("despues catch")
        })
        setLoading(false);
        console.log("antes authenticate")
    }
    
    const logout = () => {
        setLoading(true);
        setAuthed(false)
        console.log("logout...")
        setLoading(false);
    }

    const value = useMemo(
        () => ({
            loading,
            authed,
            user,
            login,
            logout
        }),
        [user]
      );
    
    return <authContext.Provider value={value}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext);
};

const handleSubmit = (resp) => {
    const accessToken = JSON.parse(resp.data.payload).accessToken;
    localStorage.setItem("accessToken", accessToken);
}