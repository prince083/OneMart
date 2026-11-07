import { useState } from "react";
import Nav from "../component/nav";
import SideBar from "../component/sideBar";
import { useContext } from "react";
import { authDataContext } from "../context/authContext"
import axios from "axios";
import { useEffect } from "react";
import { SiEbox } from "react-icons/si";


function Orders() {
    let [orderData, setOrderData] = useState([]);
    let { serverUrl } = useContext(authDataContext);

    const fetchAllOders = async() => {
        try {
            const token = localStorage.getItem("admin-token");
            let result = await axios.post(`${serverUrl}/api/order/list`,{}, {
                withCredentials: true,
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            if (Array.isArray(result.data)) {
                setOrderData(result.data.reverse());
            }
        } catch (error) {
            console.log("Load order data error:", error);
        }
    }
    useEffect(()=>{
            fetchAllOders();
    },[])

    const statusHandler = async (e, orderId) => {
        try {
            const token = localStorage.getItem("admin-token");
            const result = await axios.post(serverUrl + '/api/order/status', {orderId,status:e.target.value},
                { withCredentials: true, headers: token ? { Authorization: `Bearer ${token}` } : {} })
            if (result.data) {
                await fetchAllOders()
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-gray-100 to-blue-200 text-gray-800">
            <Nav />
            <div className='w-[100%] h-[100%] flex items-center lg:justify-start justify-center'>
                <SideBar />
                <div className='lg:w-[85%] md:w-[70%] h-[100%] lg:ml-[310px] md:ml-[250px] mt-[70px] flex flex-col gap-[20px] overflow-x-hidden py-[50px] ml-[100px]'>
                    <div className='text-[28px] md:text-[36px] font-bold text-[#003366] mb-[10px]'>All Orders List</div>

                    {
                        orderData.map((order, index)=>(
                            <div key={index} className='w-[90%] bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl flex lg:items-center items-start justify-between flex-col lg:flex-row p-[18px] md:px-[24px] gap-[20px] shadow-sm hover:shadow-md transition-all'>
                                <SiEbox className='w-[48px] h-[48px] text-orange-500 p-2.5 rounded-xl bg-orange-50 shrink-0 border border-orange-100'/>

                                <div className='flex-1'>
                                    <div className='flex items-start justify-center flex-col gap-[4px] text-[15px] font-semibold text-gray-900'>
                                        {
                                            order.items.map((item, index) => {
                                                if(index === order.items.length - 1){
                                                    return <p key={index}>{item.name} <span className="text-orange-500 font-bold">x {item.quantity}</span> <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded ml-1">{item.size}</span></p> 
                                                } else {
                                                    return <p key={index}>{item.name} <span className="text-orange-500 font-bold">x {item.quantity}</span> <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded ml-1">{item.size}</span></p> 
                                                }
                                            })
                                        }
                                    </div>
                                    
                                    <div className='text-[13px] text-gray-600 mt-2 leading-relaxed'>
                                        <p className="font-semibold text-gray-800">{order.address.firstName + " " + order.address.lastName}</p>
                                        <p>{order.address.street + ", " + order.address.city + ", " + order.address.state + ", " + order.address.country + " - " + order.address.pinCode}</p>
                                        <p className="text-gray-500">{order.address.phone}</p>
                                    </div>

                                </div>

                                <div className='text-[13px] text-gray-600 flex flex-col gap-1 min-w-[150px]'>
                                    <p><span className="font-medium text-gray-700">Items:</span> {order.items.length}</p>
                                    <p><span className="font-medium text-gray-700">Method:</span> {order.paymentMethod}</p>
                                    <p><span className="font-medium text-gray-700">Payment:</span> <span className={order.payment ? "text-green-600 font-semibold" : "text-amber-600 font-semibold"}>{order.payment ? 'Done' : 'Pending'}</span></p>
                                    <p><span className="font-medium text-gray-700">Date:</span> {new Date(order.date).toLocaleDateString()}</p>
                                    <p className="text-[18px] font-bold text-orange-600 mt-1">₹{order.amount}</p>
                                </div>
                                
                                <select value={order.status} className='px-[14px] py-[8px] bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none font-medium cursor-pointer shadow-sm text-sm'
                                onChange={(e)=>statusHandler(e,order._id)} >
                                    <option value="Order Placed">Order Placed</option>
                                    <option value="Packing">Packing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for delivery">Out for delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>

                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Orders;