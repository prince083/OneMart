



function NewLetterBox(){
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <div className='w-[100vw] min-h-fit md:h-[70vh] flex items-center justify-center flex-col bg-gradient-to-r from-gray-100 to-blue-200 gap-[10px] pb-10' >
                <p className='md:text-[30px] text-[20px] text-gray-900 font-semibold px-[20px]'>Subscribe now & get 20% off</p>
                <p className="md:text-[18px] text-[14px] text-center text-blue-900 font-semibold px-[20px]">Subscribe now and enjoy exclusive savings, special deals, and early access to new collections</p>
                <form action=""onSubmit={handleSubmit} className="w-[100%] h-[30%] md:h-[50%] flex items-center justify-center mt-[20px] gap-[20px] px-[20px]">
                    <input type="text" className="placeholder:text-gray-400 bg-gray-100 shadow-xl w-[600px]  max-w-[60%] h-[40px] px-[20px] rounded-lg shadow-gray-400"
                    placeholder="Enter you E-mail"
                    required />
                    <button type='submit'className='text-[15px] md:text-[16px] px-[10px] md:px-[30px] py-[12px] md:py-[10px] bg-blue-900 cursor-pointer hover:bg-slate-400 text-white flex items-center justify-center gap-[20px] border-[1px] border-[#80808049] rounded-lg shadow-xl shadow-gray-400'>Subscribe</button>
                </form>
            </div>
        </>
    )
}

export default NewLetterBox;