import BestSeller from "../component/bestSeller";
import LatestCollection from "../component/latestCollection";




function Product() {
    return (
        <>
            <div className="w-[100vw] min-h-[100vh] bg-gradient-to-l from-gray-100 to-blue-200 flex items-center justify-start flex-col py-[20px]">

                <div className="w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col">
                    <LatestCollection />
                </div>

                <div className="w-[100%] min-h-[70px] flex items-center justify-center gap-[10px] flex-col">
                    <BestSeller />
                </div>


            </div>
        </>
    )
}

export default Product;