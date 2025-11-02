import React from 'react'
import { createContext, useState, useContext, useEffect } from 'react'

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const [user, setUser] = useState(() => {
        try {
            const raw = localStorage.getItem('auth_user')
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            return null;
        }
    })
    useEffect(() => {
        if (user) localStorage.setItem('auth_user', JSON.stringify(user))
        else
            localStorage.removeItem('auth_user')
    }, [user])

    const login = ({ username, password }) => {
        if (username == 'admin' && password == 'admin') {
            const u = { username: 'admin', role: 'admin' }
            setUser(u)
            return { ok: true }
        }


        // if (username && password){
        //     const u = {username:'admin', role : 'admin'}
        //     setUser(u)
        //     return {ok : true}
        // }
        return { ok: false, message: "invalid credentials" }
    }

    const logout = () => {
        setUser(null)
    }
    return (
        (<AuthContext.Provider value={{ login, logout, user }}>
            {children}
        </AuthContext.Provider>)
    )
}


export const useAuth = () => useContext(AuthContext);