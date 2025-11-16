import { createContext } from "react";




export const authDataContext = createContext();

function AuthContext({children}){
    let serverUrl = "https://onemart-nu7w.onrender.com"
    let value = {
        serverUrl
    }
    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContext;