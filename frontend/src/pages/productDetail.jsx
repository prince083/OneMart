import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { shopDataContext } from "../context/shopContext";
import { IoIosStar, IoIosStarHalf } from "react-icons/io";
import RelatedProduct from "../component/reletedProduct";



function ProductDetail() {
    let { productId } = useParams();
    let { products, currency, addToCart } = useContext(shopDataContext);
    let [productData, setProductData] = useState(false)

    const [image, setImage] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [size, setSize] = useState('')

    const fetchProductData = async () => {
        products.map(((item) => {
            if (item._id === productId) {
                setProductData(item)
                setImage1(item.image1)
                setImage2(item.image2)
                setImage3(item.image3)
                setImage4(item.image4)
                setImage(item.image1)

                return null;
            }
        }))
    }

    useEffect(() => {
        fetchProductData();
    }, [productId, products])

    return productData ? (
        <>
        <div className="w-full min-h-screen bg-gradient-to-r from-white to-blue-200 flex flex-col lg:flex-row items-start justify-center gap-10 py-12 px-6 mt-10">

            {/* Left Section - Product Images */}
            <div className="lg:w-1/2 w-full flex flex-col-reverse lg:flex-row items-center justify-center gap-6 mt-4">

                {/* Thumbnails */}
                <div className="lg:w-[20%] w-full flex lg:flex-col flex-wrap items-center justify-center gap-4">
                    {[image1, image2, image3, image4].map((imgSrc, index) => (
                        <div
                            key={index}
                            className="w-[70px] md:w-[100px] h-[70px] md:h-[110px] bg-slate-300 border-2 border-gray-900 rounded-md overflow-hidden cursor-pointer"
                            onClick={() => setImage(imgSrc)}
                        >
                            <img
                                src={imgSrc}
                                alt={`Product thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Main Image */}
                <div className="lg:w-[70%] w-[90%] h-[40vh] border border-[#80808049] rounded-md overflow-hidden shadow-sm">
                    <img
                        src={image}
                        alt="Product"
                        className="w-full h-full object-fit rounded-md"
                    />
                </div>
            </div>

            {/* Right Section - Product Details */}
            <div className="lg:w-1/2 w-full flex flex-col items-start justify-start gap-2 px-4">
                <h1 className="text-[20px] md:text-[30px] font-semibold text-gray-900">
                    {productData.name.toUpperCase()}
                </h1>

                <div className="flex items-center gap-1">
                    <IoIosStar className="text-[20px] fill-amber-500" />
                    <IoIosStar className="text-[20px] fill-amber-500" />
                    <IoIosStar className="text-[20px] fill-amber-500" />
                    <IoIosStar className="text-[20px] fill-amber-500" />
                    <IoIosStarHalf className="text-[20px] fill-amber-500" />
                    <p className="text-[18px] font-semibold pl-2 text-gray-900">124</p>
                </div>

                <p className="text-[28px] md:text-[30px] font-semibold text-gray-900">
                    {currency} {productData.price}
                </p>

                <p className="w-[90%] text-[18px] md:text-[20px] font-semibold text-gray-900">
                    {productData.description}
                </p>

                {/* Size Selection */}
                <div className="flex flex-col gap-3 mt-4">
                    <p className="text-[22px] md:text-[25px] font-semibold text-gray-900">Select Size</p>
                    <div className="flex gap-3 flex-wrap">
                        {productData.sizes.map((item, index) => (
                            <button
                                key={index}
                                className={`border py-2 px-4 bg-slate-300 rounded-md ${item === size ? 'bg-red-300 text-red-600 text-[20px]' : ''}`}
                                onClick={() => setSize(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <button
                        className="text-[16px] active:bg-yellow-400 cursor-pointer bg-orange-400 py-3 px-6 rounded-2xl mt-3 border border-[#80808049] text-white shadow-md shadow-black"
                        onClick={() => addToCart(productData._id, size)}
                    >
                        Add To Cart
                    </button>
                </div>

                <div className="w-[90%] h-[1px] bg-slate-700 mt-4"></div>
                <div className="w-[90%] text-[16px] text-gray-900 space-y-1">
                    <p>100% Original Product.</p>
                    <p>Cash on delivery is available on this product</p>
                    <p>Easy return and exchange policy within 7 days</p>
                </div>
            </div>
        </div>

        {/* Description and Reviews Section */ }
        <div className="w-full min-h-[70vh] bg-gradient-to-r    from-white to-blue-200 flex flex-col items-start   justify-start overflow-x-hidden px-6 lg:px-20">

        {/* Tabs */}
        <div className="flex mt-4 gap-2">
            <p className="border px-5 py-3 text-sm text-gray-900 cursor-pointer">Description</p>
            <p className="border px-5 py-3 text-sm text-gray-900 cursor-pointer">Reviews (124)</p>
        </div>

        {/* Description Box */}
        <div className="w-full md:w-[80%] bg-gray-300 border text-gray-900 text-[15px] md:text-[18px] lg:text-[20px] px-6 py-8 mt-4 rounded-md shadow-sm">
            <p className="leading-relaxed">
                Upgrade your wardrobe with this stylish slim-fit cotton shirt, available now on OneCart.
                Crafted from breathable, high-quality fabric, it offers all-day comfort and effortless style.
                Easy to maintain and perfect for any setting, this shirt is a must-have essential for those
                who value both fashion and function.
            </p>
        </div>

        {/* Related Products */}
        <div className="mt-16 w-full">
            <RelatedProduct
                category={productData.category}
                subCategory={productData.subCategory}
                currentProductId={productData._id}
            />
        </div>
        </div>
        </>

    ) : (<div>Loading...</div>)
}

export default ProductDetail;