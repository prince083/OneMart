import Title from "./title";
import { RiExchangeFundsLine } from "react-icons/ri";
import { SiTicktick } from "react-icons/si";
import { BiSupport } from "react-icons/bi";


function OurPolicy() {

    return (
        <>
            <div className='w-[100vw] min-h-fit md:h-[70vh] flex items-center justify-start flex-col bg-gradient-to-r from-gray-100 to-blue-200 gap-[50px]'>
                <div className='min-h-[8%] w-[100%] text-center md:text-start md:ml-[8%] mt-[70px]'>
                    <Title text1={"OUR"} text2={"POLICY"} />
                    <p className='w-[100%] m-auto text-[13px] md:text-[20px] px-[10px] text-gray-900'>Customer-Friendly Policies | Committed to Your Satisfaction and Safety.</p>
                </div>
                <div className='w-full md:min-h-[50%] min-h-fit flex items-stretch justify-center flex-wrap lg:gap-[30px] gap-[50px] mb-20 px-5 md:px-10'>
                    <div className="w-[350px] max-w-[90%] h-auto py-10 px-4 flex items-center justify-center flex-col gap-4 bg-white shadow-xl rounded-lg">
                        <RiExchangeFundsLine className="w-[40px] md:w-[60px] h-[40px] md:h-[60px] text-[#90b9ff] shrink-0" />
                        <p className="font-semibold md:text-[18px] text-[19px] text-blue-900 text-center">Easy Exchange Policy</p>
                        <p className="font-semibold md:text-[20px] text-[15px] text-gray-900 text-center">Exchange Made Easy - Quick, Simple, and Customer-Friendly Process. </p>
                    </div>
                    <div className="w-[350px] max-w-[90%] h-auto py-10 px-4 flex items-center justify-center flex-col gap-4 bg-white shadow-xl rounded-lg">
                        <SiTicktick className="w-[40px] md:w-[60px] h-[40px] md:h-[60px] text-[#90b9ff] shrink-0" />
                        <p className="font-semibold md:text-[18px] text-[19px] text-orange-400 text-center">Get Awesome Discounts!</p>
                        <p className="font-semibold md:text-[20px] text-[15px] text-gray-900 text-center">Shop With Confidence 7 Days Easy returns </p>
                    </div>
                    <div className="w-[350px] max-w-[90%] h-auto py-10 px-4 flex items-center justify-center flex-col gap-4 bg-white shadow-xl rounded-lg">
                        <BiSupport className="w-[40px] md:w-[60px] h-[40px] md:h-[60px] text-[#90b9ff] shrink-0" />
                        <p className="font-semibold md:text-[18px] text-[19px] text-blue-900 text-center">Customer Support</p>
                        <p className="font-semibold md:text-[20px] text-[15px] text-gray-900 text-center"> Your Satisfaction Is Our Priority.</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default OurPolicy;