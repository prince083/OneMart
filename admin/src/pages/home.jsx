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
            setTotalProducts(products.data.length);

            // Fetch Orders Count
            const orders = await axios.post(`${serverUrl}/api/order/list`, {}, {
                withCredentials: true,
            });
            setTotalOrders(orders.data.length);

        } catch (err) {
            console.error("Failed to fetch counts", err);
        }
    };
    useEffect(() => {
        fetchCounts();
    }, []);


    return (
        <>
            <div className="w-[100vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]
            text-[white] relative">
                <Nav />
                <SideBar />
                {/* Cards Section */}
                <div className="w-full flex flex-col justify-between gap-10 pt-30 pl-[30%]">

                    <p className="font-bold text-4xl text-amber-600">Welcome Admin!</p>

                    <div className="w-[90%] lg:w-[80%] flex flex-col lg:flex-row justify-between gap-6">

                        {/* Total Products Card */}
                        <div className="flex-1 bg-[#1b1b1b] border border-gray-700 rounded-xl p-6 shadow-lg">
                            <h2 className="text-lg font-semibold text-gray-300">Total Products</h2>
                            <p className="text-4xl font-bold mt-3 text-blue-400">{totalProducts}</p>
                        </div>

                        {/* Total Orders Card */}
                        <div className="flex-1 bg-[#1b1b1b] border border-gray-700 rounded-xl p-6 shadow-lg">
                            <h2 className="text-lg font-semibold text-gray-300">Total Orders</h2>
                            <p className="text-4xl font-bold mt-3 text-green-400">{totalOrders}</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;