



function Title({text1, text2}) {
    return (
        <>
            <div className="inline-flex gap-2 items-center test-center mb-3 text-[35px] md:text-[40px]">
                <p className="text-[#1A1A1A]">{text1} <span className="text-[#1A1A1A]">{text2}</span></p>
            </div>
        </>
    )
}

export default Title;