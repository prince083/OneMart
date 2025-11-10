import { createContext,
    useContext,
    useState } from 'react';


export const authDataContext = createContext();

export const AuthProvider = ({ children }) => {
    let serverUrl = "http://localhost:8000";
    let value = { serverUrl };
    return ( 
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}
