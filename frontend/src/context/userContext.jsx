import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { authDataContext } from "./authContext.jsx";
import axios from "axios";



export const UserDataContext = createContext();

function UserContext({children}){
    const [userData, setUserData] = useState("");
    let {serverUrl} = useContext(authDataContext);

    const getCurrentUser = async () => {
        try {
            let result  = await axios.post(`${serverUrl}/api/user/getcurrentuser`, {}, { withCredentials: true, })
            setUserData(result.data);
        } catch (error) {
            setUserData(null);
            console.log(error);
        }
    }

    useEffect(()=>{
        getCurrentUser();
    },[])

    let value = {
        userData, setUserData, getCurrentUser
    }
    
    return (
        <div>
            <UserDataContext.Provider value={value}>
                {children}
            </UserDataContext.Provider>
        </div>
    )
}

export default UserContext;