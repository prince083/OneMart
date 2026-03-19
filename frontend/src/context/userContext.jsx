import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { authDataContext } from "./authContext.jsx";
import axios from "axios";



export const UserDataContext = createContext();

function UserContext({ children }) {
    const [userData, setUserData] = useState("");
    let { serverUrl } = useContext(authDataContext);

    const getCurrentUser = async () => {
        try {
            const token = localStorage.getItem("token");
            const requestHeaders = {
                'withCredentials': true
            };

            if (token && token !== "null" && token !== "undefined") {
                requestHeaders['Authorization'] = `Bearer ${token}`;
            }

            let result = await axios.post(`${serverUrl}/api/user/getcurrentuser`,
                {},
                {
                    withCredentials: true,
                    headers: requestHeaders
                }
            )
            setUserData(result.data);
            return true;
        } catch (error) {
            setUserData(null);
            console.log(error);
            return false;
        }
    }

    useEffect(() => {
        getCurrentUser();
    }, [])

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
