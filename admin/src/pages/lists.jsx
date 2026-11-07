import { useContext, useEffect, useState } from "react";
import Nav from "../component/nav";
import SideBar from "../component/sideBar";
import { authDataContext } from "../context/authContext";
import axios from 'axios';




function Lists() {
    let [list, setList] = useState([]);
    let { serverUrl } = useContext(authDataContext);

    const fetchList = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/product/list`)
            setList(result.data);
            console.log(result.data);
        } catch (err) {
            console.error("Error fetching list:", err.response?.data || err.message);
        }
    }

    const removeList = async (id) => {
        try {
            const token = localStorage.getItem("admin-token");
            let result = await axios.post(`${serverUrl}/api/product/remove/${id}`,{},{
                withCredentials: true,
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            })

            if(result.data){
                fetchList()
            }
            else{
                console.log("Failed to remove product")
            }
        } catch (error) {
            console.log(`Remove error ${error}`)
        }
    }

    useEffect(()=>{
        fetchList();
    },[])

    return (
        <>
            <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-gray-100 to-blue-200 text-gray-800">
                <Nav />
                <div className="w-[100%] h-[100%] flex items-center justify-start">
                    <SideBar />

                    <div className="w-[80%] h-[100%] lg:ml-[320px] md:ml-[230px] mt-[70px] flex flex-col gap-[20px] overflow-x-hidden py-[50px] ml-[150px]">
                        <div className="text-[28px] md:text-[36px] font-bold text-[#003366] mb-[10px]">All Your Products</div>

                        {
                            list?.length > 0 ? (
                                list.map((item, index)=>(
                                    <div
                                      className="w-[90%] bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl flex items-center justify-start gap-[15px] md:gap-[25px] p-[12px] md:px-[24px] shadow-sm hover:shadow-md transition-all"
                                      key={index}
                                    >
                                      <img
                                        src={item.image1}
                                        className="w-[60px] md:w-[90px] h-[60px] md:h-[90px] object-cover rounded-lg border border-gray-200 bg-gray-50"
                                        alt=""
                                      />
                                      <div className="flex-1 flex flex-col items-start justify-center gap-[4px]">
                                        <div className="text-gray-900 font-semibold text-[16px] md:text-[18px]">{item.name}</div>
                                        <div className="text-gray-500 text-[14px]">{item.category}</div>
                                        <div className="text-orange-600 font-bold text-[15px] md:text-[16px]">₹{item.price}</div>
                                      </div>
                                      
                                      <div
                                        className="flex items-center justify-center cursor-pointer"
                                        onClick={()=>removeList(item._id)}
                                      >
                                        <span className="w-[34px] h-[34px] flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-600 border border-gray-200 transition-colors font-bold text-sm" title="Delete product">
                                            ✕
                                        </span>
                                      </div>

                                    </div>
                                ))
                            )
 
                            : (
                                <div className="text-gray-600 text-lg">No products available.</div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Lists;