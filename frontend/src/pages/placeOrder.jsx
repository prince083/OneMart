import { useContext, useState } from 'react';
import Title from '../component/title';
import CartTotal from '../component/cartTotal';
import razorpay from '../assets/razorpay.png';
import { shopDataContext } from '../context/shopContext';
import { authDataContext } from '../context/authContext';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';



function PlaceOrder() {
    let [method, setMethod] = useState('cod');
    let navigate = useNavigate();
    const { cartItem, setCartItem, products, getCartAmount, delivery_fee } = useContext(shopDataContext);
    const { serverUrl } = useContext(authDataContext);
    let [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        phone: ''
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((data) => ({
            ...data,
            [name]: value
        }));
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Order Payment",
            description: "Checkout",
            order_id: order.id,
            receipt: order.receipt,
            handler: async function (response) {
                console.log("Payment successful:", response);
                const {data} = await axios.post(`${serverUrl}/api/order/verifyrazorpay`,response,{withCredentials:true});
                if(data){
                    setCartItem({});
                    navigate('/order');
                }
            },
        }
        const rzp = new window.Razorpay(options);
        rzp.open();
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        try {
            let orderItems = []
            for (const items in cartItem) {
                for (const item in cartItem[items]) {
                    if (cartItem[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.size = item
                            itemInfo.quantity = cartItem[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }
            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }

            switch (method) {
                case 'cod':
                    // Handle Cash on Delivery order placement

                    const result =  await axios.post(`${serverUrl}/api/order/placeorder`, orderData, { withCredentials: true });
                    console.log(result.data);
                    if(result.data){
                        setCartItem({});
                        navigate('/order');
                    }
                    break;
                case 'razorpay':
                    // Handle Razorpay order placement
                    const resultRazorpay = await axios.post(`${serverUrl}/api/order/razorpay`, orderData, { withCredentials: true });
                    if(resultRazorpay.data){
                        // Redirect to Razorpay payment gateway or handle payment here
                        initPay(resultRazorpay.data);
                    }
                    break;
                default:
                    console.log('Invalid payment method selected.');
            }
        } catch (error) {
            console.error("Order submission error:", error);
        }
    }

    return (
        <div className='w-[100vw] min-h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025] flex items-center justify-center flex-col md:flex-row gap-[50px] relative'>
            <div className='lg:w-[50%] w-[100%] h-[100%] flex items-center justify-center lg:mt-[0px] mt-[90px] '>
                <form onSubmit={onSubmitHandler} className='lg:w-[70%] w-[95%] lg:h-[70%] h-[100%]'>
                    <div className='py-[10px] mt-[50px]'>
                        <Title text1={'DELIVERY'} text2={'ADDRESS'} />
                    </div>
                    <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
                        <input type="text" placeholder='First name' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
                        required
                        onChange={onChangeHandler}
                        name='firstName'
                        value={formData.firstName} />

                        <input type="text" placeholder='Last name' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]'
                        required
                        onChange={onChangeHandler}
                        name='lastName'
                        value={formData.lastName} />
                    </div>
                    <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
                        <input type="email" placeholder='Enter Your email' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
                        required
                        onChange={onChangeHandler}
                        name='email'
                        value={formData.email} />
                    </div>
                    {/* 💡 New: Street address row */}
                    <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
                        <input type="text" placeholder='Street' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
                        required
                        onChange={onChangeHandler}
                        name='street'
                        value={formData.street} />
                    </div>

                    {/* 💡 New: City / State row */}
                    <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
                        <input type="text" placeholder='City' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
                        required
                        onChange={onChangeHandler}
                        name='city'
                        value={formData.city} />

                        <input type="text" placeholder='State' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]'
                        required
                        onChange={onChangeHandler}
                        name='state'
                        value={formData.state} />
                    </div>

                    {/* 💡 New: Pincode / Country row */}
                    <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
                        <input type="text" placeholder='Pincode' className='w-[48%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
                        required
                        onChange={onChangeHandler}
                        name='pincode'
                        value={formData.pincode} />

                        <input type="text" placeholder='Country' className='w-[48%] h-[50px] rounded-md shadow-sm shadow-[#343434] bg-slate-700 placeholder:text-[white] text-[18px] px-[20px]'
                        required
                        onChange={onChangeHandler}
                        name='country'
                        value={formData.country} />
                    </div>

                    {/* 💡 New: Phone row */}
                    <div className='w-[100%] h-[70px] flex items-center justify-between px-[10px]'>
                        <input type="tel" placeholder='Phone' className='w-[100%] h-[50px] rounded-md bg-slate-700 placeholder:text-[white] text-[18px] px-[20px] shadow-sm shadow-[#343434]'
                        required
                        onChange={onChangeHandler}
                        name='phone'
                        value={formData.phone} />
                    </div>
                    {/* 💡 New: Submit Button for "Place Order" */}
                    <div className='w-[100%] px-[10px] mt-[20px]'>
                        <button
                            type="submit"
                            className='bg-blue-600 hover:bg-blue-700 text-white text-[18px] py-[10px] px-[50px] rounded-2xl flex items-center justify-center gap-[20px] absolute lg:right-[20%] bottom-[10%] right-[35%] border-[1px] border-[#80808049] ml-[30px] mt-[20px]'
                        >
                            Place Order
                        </button>
                    </div>
                </form>
            </div>
            <div className='lg:w-[50%] w-[100%] min-h-[100%] flex items-center justify-center gap-[30px] '>
                <div className='lg:w-[70%] w-[90%] lg:h-[70%] h-[100%] flex items-center justify-center gap-[10px] flex-col'>
                    <CartTotal />
                    <div className='py-[10px]'>
                        <Title text1={'Payment'} text2={'Method'} />
                    </div>
                    <div className='w-[100%] h-[30vh] lg:h-[100px] flex items-start mt-[20px] lg:mt-[0px] justify-center gap-[50px]'>
                        <button onClick={() => setMethod('razorpay')} className={`w-[150px] h-[50px] rounded-sm ${method === 'razorpay' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`}>
                            <img src={razorpay} className='w-[100%] h-[100%] object-fill rounded-sm' alt="" />
                        </button>
                        <button type='submit' onClick={() => setMethod('cod')} className={`w-[200px] h-[50px] bg-gradient-to-t from-[#95b3f8] to-[white] text-[14px] px-[20px] rounded-sm text-[#332f6f] font-bold ${method === 'cod' ? 'border-[5px] border-blue-900 rounded-sm' : ''}`}>
                            CASH ON DELIVERY
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaceOrder;