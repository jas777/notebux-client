import React, {createContext, useContext, useState} from "react";
import User from "../types/User";
import useToken from "../hooks/useToken";
import axios from "axios";
import {API_URL} from "../App";

const useProvideAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useToken(false);

    const signIn = (email: string, password: string, cb: (user: User | null) => void) => {

        let data = JSON.stringify({
            email,
            password
        });

        axios({
            method: 'post',
            url: `${API_URL}/auth/login`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }).then(r => {
            if (typeof r.data === 'string') {
                axios.get(`${API_URL}/@me`, {
                    headers: {Authorization: `Bearer ${r.data}`}
                }).then(rUser => {
                    setUser(rUser.data)
                    setToken(r.data)
                    cb(rUser.data)
                })
            } else {
                cb(null)
            }
        })
    };

    const signOut = (cb: () => void) => {
        setToken("")
        setUser(null)
        cb()
    };

    const fetchUser = (cb?: (user: User) => void) => {
        axios.get<User>(`${API_URL}/@me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(r => {
            if (r.data.email) {
                setUser(r.data)
            }
        })
    }

    return {
        user,
        setUser,
        signIn,
        signOut,
        fetchUser
    };
}

const authContext = createContext<ReturnType<typeof useProvideAuth> | undefined>(undefined);

const ProvideAuth = ({children}: { children: JSX.Element }) => {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
            </authContext.Provider>
    );
}

const useAuth = () => useContext(authContext);

export {
    ProvideAuth,
    useProvideAuth,
    useAuth
}
