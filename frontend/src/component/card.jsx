import { useContext } from "react";
import { shopDataContext } from "../context/shopContext";
import { useNavigate } from "react-router-dom";




function Card({image, id, name, price }){
    let { currency } = useContext(shopDataContext);
    let navigate = useNavigate();
    return (
        <>
            <div className="w-[300px] max-w-[90%] h-[400px] bg-[#ffffffa0] backdrop-blur-lg rounded-lg hover:scale-[102%] flex items-start justify-start flex-col p-[10px] cursor-pointer border-[1px] border-[#80808049]"
            onClick={()=>{navigate(`/productdetail/${id}`)}}>
                <img src={image} alt=""
                className="w-[1005] h-[80%] rounded-sm object-cover" />
                <div className="text-[#c3f6fa] text-[18px] py-[10px] overflow-hidden">{name}</div>
                <div className="text-[#f3fafa] text-[14px]">{currency}{price}</div>
            </div>
        </>
    )
}

export default Card;