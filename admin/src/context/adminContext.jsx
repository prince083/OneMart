import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { authDataContext } from "./authContext";
import { useEffect } from "react";

import axios from 'axios';




export const adminDataContext = createContext();

function AdminContext({ children }) {
    let [adminData, setAdminData] = useState(null);
    let { serverUrl } = useContext(authDataContext);

    const getAdmin = async () => {
        try {
            const token = localStorage.getItem("admin-token");
            if (!token) {
                setAdminData(null);
                return null;
            }
            let result = await axios.get(`${serverUrl}/api/user/getadmin`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setAdminData(result.data);
            return result.data;
        } catch (error) {
            // Only clear session if 401 (invalid token), not on network errors
            if (error?.response?.status === 401) {
                localStorage.removeItem("admin-token");
                setAdminData(null);
            }
            console.log("getAdmin failed:", error.response?.data || error.message);
            return null;
        }
    }

    useEffect(() => {
        getAdmin();
    }, [])

    let value = {
        adminData, setAdminData, getAdmin
    }

    return (
        <adminDataContext.Provider value={value}>
            {children}
        </adminDataContext.Provider>
    )
}

export default AdminContext;