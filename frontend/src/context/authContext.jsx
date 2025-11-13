import { createContext,
    useContext,
    useState } from 'react';


export const authDataContext = createContext();

export const AuthProvider = ({ children }) => {
    let serverUrl = "https://onemart-nu7w.onrender.com";
    let value = { serverUrl };
    return ( 
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}
