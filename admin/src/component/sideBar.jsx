import { IoMdAdd } from "react-icons/io";
import { MdViewList } from "react-icons/md";
import { FaBoxOpen } from "react-icons/fa";
import { NavLink } from "react-router-dom";



function SideBar() {
    return (
        <div className="w-[18%] min-h-[100vh] border-r border-gray-300 bg-white/40 backdrop-blur-sm py-[80px] fixed left-0 top-0 flex flex-col gap-2">
            <NavLink
                to="/add"
                className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-4 py-3 cursor-pointer transition-colors ${
                        isActive
                            ? "bg-orange-100 text-orange-600 border-r-4 border-r-orange-500 font-semibold"
                            : "text-gray-700 hover:bg-orange-50 hover:text-black"
                    }`
                }
            >
                <IoMdAdd className="w-[20px] h-[20px] text-orange-500" />
                <p className="hidden md:block">Add Items</p>
            </NavLink>
            <NavLink
                to="/lists"
                className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-4 py-3 cursor-pointer transition-colors ${
                        isActive
                            ? "bg-orange-100 text-orange-600 border-r-4 border-r-orange-500 font-semibold"
                            : "text-gray-700 hover:bg-orange-50 hover:text-black"
                    }`
                }
            >
                <MdViewList className="w-[20px] h-[20px] text-orange-500" />
                <p className="hidden md:block">List Items</p>
            </NavLink>
            <NavLink
                to="/orders"
                className={({ isActive }) =>
                    `flex items-center justify-center md:justify-start gap-3 border border-gray-200 border-r-0 px-4 py-3 cursor-pointer transition-colors ${
                        isActive
                            ? "bg-orange-100 text-orange-600 border-r-4 border-r-orange-500 font-semibold"
                            : "text-gray-700 hover:bg-orange-50 hover:text-black"
                    }`
                }
            >
                <FaBoxOpen className="w-[20px] h-[20px] text-orange-500" />
                <p className="hidden md:block">View Orders</p>
            </NavLink>
        </div>
    )
}
export default SideBar;