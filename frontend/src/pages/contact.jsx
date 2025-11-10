import Title from "../component/title";
import contact from '../assets/contact.png'
import NewLetterBox from "../component/newLetterBox";



function Contact() {
    return (
        <>
            <div className='w-[99vw] md:w-[100vw] min-h-[100vh] flex items-center justify-center flex-col bg-gradient-to-r from-white to-blue-200 gap-[50px] pt-[80px] mb-15'>
                <Title text1={'CONTACT'} text2={'US'} />
                <div className="w-[100%] flex items-center justify-center flex-col lg:flex-row">
                    <div className='lg:w-[50%] w-[100%] flex items-center justify-center '>
                        <img src={contact} alt="" className='lg:w-[70%] w-[80%] shadow-md shadow-black rounded-sm' />
                    </div>
                    <div className='lg:w-[50%] w-[80%] flex items-start justify-center gap-[20px] flex-col mt-[20px] lg:mt-[0px]'>
                        <p className='lg:w-[80%] w-[100%]   text-blue-950 font-bold lg:text-[18px]    text-[15px]'>Our Store</p>
                        <div className='lg:w-[80%] w-[100%]   text-gray-900 md:text-[16px] text-[13px]'>
                            <p>12345 Random Station</p>
                            <p>random city , state , India</p>
                        </div>
                        <div className='lg:w-[80%] w-[100%]   text-gray-900 md:text-[16px] text-    [13px]'>
                            <p>tel: +91-9876543210</p>
                            <p>Email: admin@onecart.com</p>
                        </div>
                        <p className='lg:w-[80%] w-[100%] text-[15px] text-gray-900 lg:text-[18px] mt-[10px] font-bold'>Careers at
                            OneCart</p>
                        <p className='lg:w-[80%] w-[100%] text-gray-900 md:text-[16px] text-[13px]'>Learn more about our teams and job
                            openings</p>
                        <button className='px-[30px] py-[20px] flex items-center justify-center text-white bg-blue-900 border  active:bg-slate-600 hover:bg-slate-600 rounded-md cursor-pointer'>Explore Jobs</button>
                    </div>
                </div>
                <NewLetterBox />
            </div>
        </>
    )
}

export default Contact;