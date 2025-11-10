import { IoMdAdd } from "react-icons/io";
import { MdViewList } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";



function SideBar() {
    let navigate = useNavigate();

    return (
        <>
            <div className="w-[18%] min-h-[100vh] border-r-[1px]
            py-[70px] fixed left-0 top-0">
                <div className="flex items-center  justyfy-center 
                md:justify-start gap-3 border border-gray-200
                border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]"
                onClick={()=>{navigate('/add')}}>
                    <IoMdAdd className="w-[20px] h-[20px]" />
                    <p className="hidden md:block">Add Items</p>
                </div>
                <div className="flex items-center  justyfy-center 
                md:justify-start gap-3 border border-gray-200
                border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]"
                onClick={()=>{navigate('/lists')}}>
                    <MdViewList className="w-[20px] h-[20px]" />
                    <p className="hidden md:block">List Items</p>
                </div>
                <div className="flex items-center  justyfy-center 
                md:justify-start gap-3 border border-gray-200
                border-r-0 px-3 py-2 cursor-pointer hover:bg-[#2c7b89]"
                onClick={()=>{navigate('/orders')}}>
                    <FaBoxOpen className="w-[20px] h-[20px]" />
                    <p className="hidden md:block">View Orders</p>
                </div>
            </div>
        </>
    )
}
export default SideBar;