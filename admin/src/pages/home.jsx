import { useContext, useEffect } from "react";
import Nav from "../component/nav";
import SideBar from "../component/sideBar";
import { authDataContext } from "../context/authContext";
import { useState } from "react";
import axios from "axios";





function Home() {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);

    const { serverUrl } = useContext(authDataContext);

    const fetchCounts = async () => {
        try {
            // Fetch Products Count
            const products = await axios.get(`${serverUrl}/api/product/list`, {
                withCredentials: true,
            });
            if (Array.isArray(products.data)) {
                setTotalProducts(products.data.length);
            }

            // Fetch Orders Count
            const token = localStorage.getItem("admin-token");
            const orders = await axios.post(`${serverUrl}/api/order/list`, {}, {
                withCredentials: true,
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            if (Array.isArray(orders.data)) {
                setTotalOrders(orders.data.length);
            }

        } catch (err) {
            console.error("Failed to fetch counts", err);
        }
    };
    useEffect(() => {
        fetchCounts();
    }, []);


    return (
        <>
            <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-gray-100 to-blue-200 text-gray-800 relative">
                <Nav />
                <SideBar />
                {/* Cards Section */}
                <div className="w-full flex flex-col justify-between gap-10 pt-30 pl-[30%]">

                    <p className="font-bold text-4xl text-[#003366]">
                        Welcome <span className="text-orange-500">Admin!</span>
                    </p>

                    <div className="w-[90%] lg:w-[80%] flex flex-col lg:flex-row justify-between gap-6">

                        {/* Total Products Card */}
                        <div className="flex-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <h2 className="text-lg font-semibold text-gray-600">Total Products</h2>
                            <p className="text-4xl font-bold mt-3 text-orange-500">{totalProducts}</p>
                        </div>

                        {/* Total Orders Card */}
                        <div className="flex-1 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                            <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
                            <p className="text-4xl font-bold mt-3 text-[#003366]">{totalOrders}</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;