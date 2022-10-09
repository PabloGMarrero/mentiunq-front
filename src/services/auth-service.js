import axios from 'axios';
import { REST_API_URL } from './constants'
import React, { useState, useContext, createContext } from "react";

const API_URL = `${REST_API_URL}/oauth`;

export const authenticate = (request) => {
    return axios.post(API_URL + "/authenticate", request);
}

const authContext = createContext()

export function AuthProvider({ children }) {
    const auth = useProvideAuth()
    return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
    return useContext(authContext)
}

const handleSubmit = (resp) => {
    const accessToken = JSON.parse(resp.data.payload).accessToken;
    localStorage.setItem("accessToken", accessToken);
}

function useProvideAuth() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const signin = (user) => {
        if (user) {
            setLoading(false)
            setUser(user)
            return user
        } else {
            setLoading(false)
            setUser(false)
            return false
        }
    }

    const signout = () => {
        console.log("signout...")
    }


    return {
        user,
        loading,
        signin,
        signout,
    }
}