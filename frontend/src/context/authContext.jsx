import {
    createContext,
    useContext,
    useState
} from 'react';


export const authDataContext = createContext();

export const AuthProvider = ({ children }) => {
    let serverUrl = import.meta.env.VITE_SERVER_URL || "https://onemart-nu7w.onrender.com";
    let value = { serverUrl };
    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}
