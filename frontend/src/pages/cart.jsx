import { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/shopContext";
import { useNavigate } from "react-router-dom";
import Title from "../component/title";
import { RiDeleteBin6Line } from "react-icons/ri";
import CartTotal from "../component/cartTotal";



function Cart() {
    const { products, currency, cartItem, updateQuantity } = useContext(shopDataContext);
    const [cartData, setCartData ] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const tempData = [];
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                if (cartItem[items][item] > 0) {
                    tempData.push({
                        _id: items,
                        size: item,
                        quantity: cartItem[items][item],
                    });
                }
            }
        }
        setCartData(tempData); // ✅ Set the state
    }, [cartItem]);

    return (
        <div className='w-[100vw] min-h-[100vh] p-[20px] pt-10 overflow-hidden bg-white'>
            <div className='h-[8%] w-[100%] text-center mt-[80px]'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            <div className='w-[100%] h-[92%] flex flex-wrap gap-[20px]'>
                {
                    cartData.map((item, index) => {
                        const productData = products.find((product) => product._id === item._id);

                        return (
                            <div key={index} className='w-[100%] h-[10%] border-t border-b border-gray-200 py-4'>
                                <div className='w-[100%] h-[80%] flex items-start gap-6 bg-white py-[10px] px-[20px] rounded-2xl relative shadow-sm border border-gray-100'>
                                    <img className="w-[100px] h-[100px] rounded-md object-cover"
                                    src={productData.image1} alt="" />

                                    <div className='flex items-start justify-center flex-col gap-[10px]'>
                                        <p className='md:text-[20px] text-[18px] text-gray-800 font-medium'>{productData.name}</p>
                                        <div className='flex items-center gap-[20px]'>
                                            <p className='text-[18px] text-gray-600'>
                                                {currency} {productData.price}</p>
                                            <p className='w-[40px] h-[40px] text-[16px] text-gray-700 bg-gray-100 rounded-md mt-[5px] flex items-center justify-center border-[1px] border-gray-300'>{item.size}</p>
                                        </div>
                                    </div>
                                    <input type="number" min={1} defaultValue={item.quantity} 
                                        className='md:max-w-20 max-w-15 md:px-2 md:py-2 py-[5px] px-[10px] text-gray-800 text-[18px] font-semibold bg-gray-50 absolute md:top-[40%] top-[46%] left-[75%] md:left-[50%] border-[1px] border-gray-300 rounded-md outline-none focus:ring-1 focus:ring-blue-400'
                                        onChange={(e) => e.target.value === ' ' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} />
                                        
                                    <RiDeleteBin6Line className="text-red-500 w-[24px] h-[24px] absolute top-[50%] md:top-[40%] md:right-[5%] right-1 cursor-pointer hover:text-red-700 transition"
                                        onClick={() => updateQuantity(item._id, item.size, 0)} />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className="flex justify-start items-end my-20">
                <div className="w-full sm:w-[450px]">
                    <CartTotal />
                    <button className='text-[16px] font-semibold tracking-wide hover:bg-gray-800 cursor-pointer bg-black py-[12px] px-[40px] rounded-md text-white flex items-center justify-center gap-[20px] mt-[30px] w-full transition' onClick={() => {
                        if (cartData.length > 0) {
                            navigate('/placeorder');
                        } else {
                            alert('Your cart is empty');
                        }
                    }}>
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Cart;