import React, { useState, useEffect, useContext, createContext } from 'react'
import { authenticate } from '../services/auth-service'

const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}> { children } </authContext.Provider>
}

export const useAuth = () => useContext(authContext)

function useProvideAuth() {
    const [authed, setAuthed] = localStorage.getItem("logged") || useState(false);
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(false)

    const login = (request) => {
        setLoading(true);
        authenticate(request)
        .then((resp)=>{
            setAuthed(true);
            handleSubmit(resp);
        })
        .catch((err)=>{
            setAuthed(false)
            console.log(err)
        })
        setLoading(false);
    }
    
    const logout = () => {
        setLoading(true);
        setAuthed(false)
        console.log("logout...")
        localStorage.removeItem("authed")
        setLoading(false);
    }

    const isLogged = () =>{
        return localStorage.getItem("authed")===true
    }

    useEffect(() => {
        if(authed){
            localStorage.setItem("authed", authed);
        }
    }, [authed])

    return {
        user,
        login,
        logout,
        authed,
        isLogged
      }
}

const handleSubmit = (resp) => {
    const accessToken = JSON.parse(resp.data.payload).accessToken;
    localStorage.setItem("accessToken", accessToken);
    
}