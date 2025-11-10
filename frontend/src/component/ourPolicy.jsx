import Title from "./title";
import { RiExchangeFundsLine } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { BiSupport } from "react-icons/bi";


function OurPolicy() {

    return (
        <>
            <div className='w-[100vw] min-h-fit md:h-[70vh] flex items-center justify-start flex-col bg-gradient-to-r from-gray-100 to-blue-200 gap-[50px]'>
                <div className='min-h-[8%] w-[100%] text-center mt-[70px]'>
                    <Title text1={"OUR"} text2={"POLICY"} />
                    <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-gray-900'>Customer-Friendly Policies | Committed to Your Satisfaction and Safety.</p>
                </div>
                <div className='w-[100%] md:min-h-[50%] min-h-fit flex items-center justify-center flex-wrap lg:gap-[30px] gap-[50px] mb-20'>
                    <div className="w-[400px] max-w-[90%] h-[30vh] p-[10px] flex items-center justify-center flex-col gap-[10px] bg-white shadow-xl">
                        <RiExchangeFundsLine className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]"/>
                        <p className="font-semibold md:text-[18px] text-[19px] text-blue-900 text-center">Easy Exchange Policy</p>
                        <p className="font-semibold md:text-[25px] text-[15px] text-gray-900 text-center">Exchange Made Easy - Quick, Simple, and Customer-Friendly Process. </p>
                    </div>
                    <div className="w-[400px] max-w-[90%] h-[30vh] p-[10px] flex items-center justify-center flex-col gap-[10px] bg-white shadow-xl">
                        <SiTicktick className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]"/>
                        <p className="font-semibold md:text-[18px] text-[19px] text-orange-400 text-center">Get Awesom Discounts!</p>
                        <p className="font-semibold md:text-[25px] text-[15px] text-gray-900 text-center">Shop With Confidance 7 Days Easy returns </p>
                    </div>
                    <div className="w-[400px] max-w-[90%] h-[30vh]  flex items-center justify-center flex-col gap-[10px] bg-white shadow-xl">
                        <BiSupport className="md:w-[60px] w-[30px] h-[30px] md:h-[60px] text-[#90b9ff]"/>
                        <p className="font-semibold md:text-[18px] text-[19px] text-blue-900 text-center">Cutomer Support</p>
                        <p className="font-semibold md:text-[25px] text-[15px] text-gray-900 text-center"> Your Satisfection Is Our Priority.</p>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default OurPolicy;