import {createContext, useContext } from "react";

export const AuthContext = createContext({   // initial val
    token: undefined,
    user: '',
    setToken : (t)=>{},
    setUser : (u)=>{},
})

export const AuthContextProvider = AuthContext.Provider

export default function useAuth(){      //custom hook
    return useContext(AuthContext)
}