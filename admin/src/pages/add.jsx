import Nav from "../component/nav";
import SideBar from "../component/sideBar";
import uploadImg from "../assets/upload.png";
import { useContext, useState } from "react";
import { authDataContext } from "../context/authContext";
import axios from 'axios';
import { toast } from "react-toastify";
import Loading from "../component/loading";


function Add() {
    let [image1, setImage1] = useState(false);
    let [image2, setImage2] = useState(false);
    let [image3, setImage3] = useState(false);
    let [image4, setImage4] = useState(false);
    let [name, setName] = useState('');
    let [description, setDescription] = useState('men..');
    let [category, setCategory] = useState('Men');
    let [price, setPrice] = useState('');
    let [subCategory, setSubCategory] = useState('TopWear');
    let [bestseller, setBestSeller] = useState(true);
    let [sizes, setSizes] = useState([]);

    const [loading, setLoading] = useState(false);

    let {serverUrl} = useContext(authDataContext);

    const handleAddProduct = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            let formData = new FormData();
            formData.append("image1", image1);
            formData.append("image2", image2);
            formData.append("image3", image3);
            formData.append("image4", image4);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("category", category);
            formData.append("price", price);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);
            formData.append("sizes", JSON.stringify(sizes));

            const token = localStorage.getItem("admin-token");
            let result = await axios.post(`${serverUrl}/api/product/addproduct`,
                formData, {
                    withCredentials: true,
                    headers: token ? { Authorization: `Bearer ${token}` } : {}
                })
            console.log(result.data);
            toast.success("Product Added Successfully!");
            setLoading(false);

            if(result.data){
                setName("")
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice("")
                setBestSeller(false)
                setCategory("Men")
                setSubCategory("TopWear")
                setDescription("Men")
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Failed to add product. Please try again.");
        }
    }
    return (
        <>
            <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-gray-100 to-blue-200 text-gray-800 overflow-x-hidden relative">
                <Nav />
                <SideBar />
                <div className="w-[82%] h-[100%] flex items-center justify-center overflow-x-hidden absolute right-0 bottom-[5%]">

                    <form onSubmit={handleAddProduct} className="w-[100%] md:w-[90%] h-[100%] mt-[70px] flex flex-col gap-[25px] py-[50px] px-[30px] md:px-[60px]">
                        <div className="text-[28px] md:text-[36px] font-bold text-[#003366]">Add New Product</div>

                        <div className="w-[80%] flex items-start justify-center flex-col mt-[10px] gap-[10px]">
                            <p className="text-[18px] md:text-[22px] font-semibold text-gray-800">Upload Images</p>
                        </div>

                        <div className="w-[100%] h-[100%] flex items-center justify-start gap-4">
                            <label htmlFor="image1" className="w-[75px] h-[75px] md:w-[100px] md:h-[100px] cursor-pointer">
                                <img src={!image1 ? uploadImg : URL.createObjectURL(image1)}
                                 alt="" 
                                 className="w-full h-full object-cover rounded-xl shadow-md border-2 border-dashed border-gray-300 hover:border-orange-500 bg-white/70 p-1 transition-colors"/>
                                <input type="file" id='image1'
                                hidden
                                onChange={(e)=>setImage1(e.target.files[0])}
                                required />
                            </label>
                            <label htmlFor="image2" className="w-[75px] h-[75px] md:w-[100px] md:h-[100px] cursor-pointer">
                                <img src={!image2 ? uploadImg : URL.createObjectURL(image2)}
                                 alt="" 
                                 className="w-full h-full object-cover rounded-xl shadow-md border-2 border-dashed border-gray-300 hover:border-orange-500 bg-white/70 p-1 transition-colors"/>
                                <input type="file" id='image2'
                                hidden
                                onChange={(e)=>setImage2(e.target.files[0])}
                                required />
                            </label>
                            <label htmlFor="image3" className="w-[75px] h-[75px] md:w-[100px] md:h-[100px] cursor-pointer">
                                <img src={!image3 ? uploadImg : URL.createObjectURL(image3)}
                                 alt="" 
                                 className="w-full h-full object-cover rounded-xl shadow-md border-2 border-dashed border-gray-300 hover:border-orange-500 bg-white/70 p-1 transition-colors"/>
                                <input type="file" id='image3'
                                hidden
                                onChange={(e)=>setImage3(e.target.files[0])}
                                required />
                            </label>
                            <label htmlFor="image4" className="w-[75px] h-[75px] md:w-[100px] md:h-[100px] cursor-pointer">
                                <img src={!image4 ? uploadImg : URL.createObjectURL(image4)}
                                 alt="" 
                                 className="w-full h-full object-cover rounded-xl shadow-md border-2 border-dashed border-gray-300 hover:border-orange-500 bg-white/70 p-1 transition-colors"/>
                                <input type="file" id='image4'
                                hidden
                                onChange={(e)=>setImage4(e.target.files[0])}
                                required />
                            </label>
                        </div>

                        <div className="w-[80%] flex items-start justify-center flex-col gap-[8px]">
                            <p className="text-[18px] md:text-[22px] font-semibold text-gray-800">
                                Product Name
                            </p>
                            <input type="text" placeholder="Type here"
                            className="w-[600px] max-w-[98%] h-[44px] rounded-lg
                            border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none
                            bg-white px-[15px] text-[16px] text-gray-800 placeholder:text-gray-400 shadow-sm transition-all"
                            onChange={(e)=>setName(e.target.value)} value={name}
                            required />
                        </div>

                        <div className="w-[80%] flex items-start justify-center flex-col gap-[8px]">
                            <p className="text-[18px] md:text-[22px] font-semibold text-gray-800">
                                Product Description
                            </p>
                            <textarea type="text" placeholder="Type here"
                            className="w-[600px] max-w-[98%] h-[100px] rounded-lg
                            border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none
                            bg-white px-[15px] py-[10px] text-[16px] text-gray-800 placeholder:text-gray-400 shadow-sm transition-all"
                            onChange={(e)=>setDescription(e.target.value)} value={description}
                            required />
                        </div>
                        <div className="w-[85%] flex items-center gap-[20px] flex-wrap">
                            <div className="md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[8px]">
                                <p className="text-[18px] md:text-[22px] font-semibold text-gray-800">
                                    Product Category
                                </p>
                                <select name="" id="" className="bg-white border border-gray-300 w-[70%] px-[12px]
                                py-[9px] rounded-lg text-gray-800 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none shadow-sm cursor-pointer"
                                onChange={(e)=>setCategory(e.target.value)} value={category}
                                required>
                                    <option value="Men">Men</option>
                                    <option value="Women">Women</option>
                                    <option value="Kids">Kids</option>
                                </select>
                            </div>

                            <div className="md:w-[30%] w-[100%] flex items-start sm:justify-center flex-col gap-[8px]">
                                <p className="text-[18px] md:text-[22px] font-semibold text-gray-800">
                                    Sub-Category
                                </p>
                                <select name="" id="" className="bg-white border border-gray-300 w-[70%] px-[12px]
                                py-[9px] rounded-lg text-gray-800 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none shadow-sm cursor-pointer"
                                onChange={(e)=>setSubCategory(e.target.value)} value={subCategory}
                                required>
                                    <option value="TopWear">Top Wear</option>
                                    <option value="BottomWear">Bottom Wear</option>
                                    <option value="WinterWear">Winter Wear</option>
                                </select>
                            </div>
                        </div>

                        <div className="w-[80%] flex items-start justify-center flex-col gap-[8px]">
                            <p className="text-[18px] md:text-[22px] font-semibold text-gray-800">
                                Product Price
                            </p>
                            <input type="number" placeholder="₹2000"
                            className="w-[600px] max-w-[98%] h-[44px] rounded-lg
                            border border-gray-300 focus:border-orange-400 focus:ring-2 focus:ring-orange-200 outline-none
                            bg-white px-[15px] text-[16px] text-gray-800 placeholder:text-gray-400 shadow-sm transition-all"
                            onChange={(e)=>setPrice(e.target.value)} value={price}
                            required />
                        </div>

                        <div className='w-[80%] flex items-start justify-center flex-col gap-[10px] py-[10px]'>
                            <p className='text-[18px] md:text-[22px] font-semibold text-gray-800'>Product Size</p>

                            <div className='flex items-center justify-start gap-[12px] flex-wrap'>

                                {["S", "M", "L", "XL", "XXL"].map((size) => (
                                    <div
                                        key={size}
                                        className={`px-[18px] py-[8px] rounded-lg text-[16px] font-medium border border-gray-300 cursor-pointer transition-all shadow-sm ${
                                            sizes.includes(size)
                                                ? "bg-orange-500 text-white border-orange-500 shadow-orange-200"
                                                : "bg-white text-gray-700 hover:border-orange-400"
                                        }`}
                                        onClick={() =>
                                            setSizes((prev) =>
                                                prev.includes(size)
                                                    ? prev.filter((item) => item !== size)
                                                    : [...prev, size]
                                            )
                                        }
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className='w-[80%] flex items-center justify-start gap-[10px] mt-[10px]'>
                            <input
                                type="checkbox"
                                id='checkbox'
                                checked={bestseller}
                                onChange={(e) => setBestSeller(e.target.checked)}
                                className='w-[20px] h-[20px] accent-orange-500 cursor-pointer'
                            />
                            <label
                                htmlFor="checkbox"
                                className='text-[16px] md:text-[18px] font-semibold text-gray-800 cursor-pointer'
                            >
                                Add to BestSeller
                            </label>
                        </div>

                        <button className='w-[160px] py-[12px] px-[20px] rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold flex items-center justify-center gap-[10px] shadow-md transition-colors cursor-pointer mt-2'>
                            {loading ? <Loading/> : 'Add Product'} 
                        </button>


                    </form>
                </div>
            </div>
        </>
    )
}

export default Add;