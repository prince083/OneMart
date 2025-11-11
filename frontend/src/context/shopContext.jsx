import { createContext, useContext, useEffect, useState } from "react"
import axios from 'axios'
import { authDataContext } from "./authContext";
import { UserDataContext } from "./userContext";



export const shopDataContext = createContext();
function ShopContext({children}){
    let [products, setProducts] = useState([]);
    let { userData } = useContext(UserDataContext);
    let [search, setSearch] = useState('');
    let [showSearch, setShowSearch] = useState(false);
    let { serverUrl } = useContext(authDataContext);
    let [ cartItem, setCartItem ] = useState({});
    let currency = '₹';
    let delivery_fee = 40;

    const getProducts = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/product/list`)
            setProducts(result.data);
        } catch (error) {
            console.log('product fatch error:',error);
        }
    }

    const addToCart = async (itemId, size) => {
        if(!size) {
            console.log("Select Product size");
            return;
        }

        let cartData = structuredClone(cartItem); //clone product

        if(cartData[itemId]){
            if(cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            } 
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }

        setCartItem(cartData);
        
        if (userData) {
            try {
                let result = await axios.post(`${serverUrl}/api/cart/add`, {itemId, size}, { withCredentials: true });
                console.log(result.data);
            } catch (error) {
                console.log(error);

            }
        }
    }

    const getUserCart = async () => {
        try {
            const result = await axios.post(`${serverUrl}/api/cart/get`, {}, { withCredentials: true });
            setCartItem(result.data.cartData);
        } catch (error) {
            console.log(error);
        }
    }

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItem); //clone product
        cartData[itemId][size] = quantity;
        setCartItem(cartData);

        if (userData) {
            try {
                await axios.post(`${serverUrl}/api/cart/update`, {itemId, size, quantity}, { withCredentials: true });
            } catch (error) {
                console.log(error);
            }
        }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItem) {
            for (const item in cartItem[items]) {
                try {
                    if (cartItem[items][item] > 0) {
                        totalCount += cartItem[items][item];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;

        for (const items in cartItem) {
            // Find product info by ID
            const itemInfo = products.find((product) => product._id === items);
            if (!itemInfo) continue; // Skip if product not found

            // Loop through sizes
            for (const size in cartItem[items]) {
                try {
                    if (cartItem[items][size] > 0) {
                        totalAmount += itemInfo.price * cartItem[items][size];
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        }

        return totalAmount;
    };




    useEffect(()=>{
        getProducts();
    }, [])

    useEffect(()=>{
        getUserCart();
    }, [])


    let value = {
        products, currency, delivery_fee, getProducts,
        search, setSearch, showSearch, setShowSearch, cartItem,
        addToCart, getCartCount, setCartItem, updateQuantity, getCartAmount
    }

    return (
        <>
            <shopDataContext.Provider value={value}>
                {children}
            </shopDataContext.Provider>
        </>
    )
}

export default ShopContext;