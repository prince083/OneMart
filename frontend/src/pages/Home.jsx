import Background from "../component/background";
import Hero from "../component/hero";
import { useEffect, useState } from "react";
import Product from "./product";
import OurPolicy from "../component/ourPolicy";
import NewLetterBox from "../component/newLetterBox";
import Footer from "../component/footer";



const Home = () => {
  let heroData = [
    {text1:"30% OFF Limited Offer", text2:"Style that"},
    { text1: "Buy 1 Get 1 Free", text2: "Trendy Collections" },
    { text1: "Flat 50% OFF", text2: "New Arrivals" },
    { text1: "Exclusive Deals", text2: "Shop the Latest" }
  ]

  let [heroCount, setHeroCount] = useState(0);

  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount(prevCount=> (prevCount === 3? 0:prevCount+1))
    },3000)
    return ()=> clearInterval(interval)
  },[])

  return (
    <div className=" overflow-x-hidden relative top-[70px]">
      <div className='w-[100vw] lg-h-[100vh] md-h-[50vh] sm-h-[30vh] bg-gradient-to-l
      from-[#141414] to-[#0c2025] flex flex-row-reverse'>
        <Background heroCount={heroCount}/>
        <Hero
        heroCount={heroCount}
        setHeroCount={setHeroCount}
        heroData={heroData[heroCount]}
        />
      </div>
      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  )
}

export default Home;