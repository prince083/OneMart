import logo from '../assets/vcart-logo.png'



function Footer() {
    return (
        <>
            <div className='w-[100%] md:h-[36vh] h-fit mb-[77px] md:mb-[0px]'>
                <div className='w-[100%] md:h-[30vh] h-[15vh] md:mb-[0px] bg-blue-200 flex items-center justify-center md:px-[50px] px-[5px]'>

                    {/* Logo and Branding Column */}
                    <div className='md:w-[30%] w-[35%] h-[100%] flex items-start justify-center flex-col gap-[5px]'>
                        <div className='flex items-start justify-start gap-[5px] mt-[10px] md:mt-[40px]'>
                            <img src={logo} alt="" className='md:w-[40px] md:h-[40px] w-[30px] h-[30px]' />
                            <p className='text-[19px] md:text-[20px] text-[black]'>OneMart</p>
                        </div>
                        <p className='text-[15px] hidden md:block text-gray-800'>OneMart is your all round shopping destination, offering top-Quality products, unbeatable deals, and fast delivery-all backed by trusted service designed to make your life easier every day.</p>
                        <p className='text-[15px] flex md:hidden text-gray-800'>Fast, Eassy, Relisble, OneMart Shoping</p>

                    </div>

                    <div className='md:w-[25%] w-[30%] h-[100%] flex items-center justify-center flex-col text-center'>
                        <div className='flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]'>
                            <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans '>COMPANY</p>
                        </div>
                        <ul>
                            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Home</li>
                            <li className='text-[15px] text-[#1e2223] cursor-pointer '>About us</li>
                            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>Delivery</li>
                            <li className='text-[15px] text-[#1e2223] cursor-pointer'>Privacy Policy</li>
                        </ul>
                    </div>
                    <div className='w-[40%] h-[100%] flex items-center justify-center flex-col text-center'>
                        <div className='flex items-center justify-center gap-[5px] mt-[10px] md:mt-[40px]'>
                            <p className='text-[19px] md:text-[20px] text-[#1e2223] font-sans '>Get In Touch</p>
                        </div>
                        <ul>
                            <li className='text-[15px] text-[#1e2223] cursor-pointer'>+91-1234567890</li>
                            <li className='text-[15px] text-[#1e2223] cursor-pointer '>contact@onemart.com</li>
                            <li className='text-[15px] text-[#1e2223] hidden md:block cursor-pointer'>+1-092-789-4567</li>
                            <li className='text-[15px] text-[#1e2223] cursor-pointer'>admin@onemart.com</li>
                        </ul>
                    </div>
                </div>
                <div className='w-[100%] h-[1px] bg-slate-400'></div>
                <div className='w-[100%] h-[5vh] bg-blue-200 flex items-center justify-center'>Copyright 2025@onemart.com-All Rights Reserved</div>
            </div>
        </>
    )
}

export default Footer;