import React, { useState, useEffect, useContext, createContext } from 'react'
import { authenticate } from '../services/auth-service'

const authContext = createContext()

export function ProvideAuth({ children }) {
  const auth = useProvideAuth()
  return <authContext.Provider value={auth}> { children } </authContext.Provider>
}

export const useAuth = () => useContext(authContext)

function useProvideAuth() {
    const [user, setUser] = useState(localStorage.getItem("user"));
    const [loading, setLoading] = useState(false)

    const login = (request, navigate) => {
        setLoading(true);
        authenticate(request)
        .then((resp)=>{
            handleSubmit(resp);
            navigate("/app");
        })
        .catch((err)=>{
            setUser(null)
            //TODO revisar si conviene mostrar el error
            navigate("/");
        })
        setLoading(false);
    }
    
    const logout = (ev, navigate) => {
        setLoading(true);
        localStorage.removeItem("accessToken")
        localStorage.removeItem("user")
        setLoading(false);
        setUser(null)
        navigate("/");
    }

    const isLogged = () =>{
        const user = JSON.parse(localStorage.getItem("user"));
        return user?.authed === true
    }

    useEffect(() => {
    }, [])

    return {
        user,
        login,
        logout,
        isLogged
    }
}

const handleSubmit = (resp) => {
    const accessToken = JSON.parse(resp.data.payload).accessToken;
    const userId = JSON.parse(resp.data.payload).id;

    const user = {
        userId,
        "authed": true
    }

    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("user", JSON.stringify(user));
}