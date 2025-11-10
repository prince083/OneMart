import { useContext, useEffect, useState } from "react";
import { shopDataContext } from "../context/shopContext";
import Title from "./title";
import Card from "./card";




function LatestCollection() {
    let { products } = useContext(shopDataContext);
    let [ latestProducts, setLatestProducts ] = useState([]);

    useEffect(()=>{
        setLatestProducts(products.slice(0,6));
    }, [products])

    return (
        <>
            <div className="h-[8%] w-[100%] text-center md:mt-[50px]">
                <Title text1={"LATEST"} text2={"COLLECTIONS"} />
                <p className="w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-blue-100">Step Into New Style - New Collection Dropping This Season!</p>
            </div>
            <div className="w-[100%] h-[50%] mt-[30px] flex items-center justify-center flex-wrap gap-[50px]">
                {latestProducts.map((item, index)=>(
                    <Card key={index} name={item.name} image={item.image1} id={item._id} price={item.price} />
                ))}
            </div>
        </>
    )
}

export default LatestCollection;