import { useContext, useState } from 'react';
import ai from '../assets/ai.png';
import { shopDataContext } from '../context/shopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import open from '../assets/bots.mp3';


function Ai() {
    let { showSearch, setShowSearch } = useContext(shopDataContext);
    let navigate = useNavigate();
    let openSound = new Audio(open);
    let [activeAi, setActiveAi] = useState(false);

    function speak(message) {
        let utterence = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterence);
    }

    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    if (!recognition) {
        console.log("Speech Recognition not supported");
        toast.error("not listening!");
        return null;
    }

    recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript.trim();
        if(transcript.toLowerCase().includes("open") && !showSearch) {
            speak("Opening search");
            setShowSearch(true);
            navigate("/collection");
        } else if(transcript.toLowerCase().includes("close") && showSearch) {
            speak("Closing search");
            setShowSearch(false);
        } else if(transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") || transcript.toLowerCase().includes("product") || transcript.toLowerCase().includes("products")) {
            speak("Opening collection");
            setShowSearch(true);
            navigate("/collection");
        } else if(transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("aboutpage")) {
            speak("Opening about page");
            navigate("/about");
        } // Home navigation
        else if (
            transcript.toLowerCase().includes("home") ||
            transcript.toLowerCase().includes("homepage")
        ) {
            speak("Opening home page");
            navigate("/");
            setShowSearch(false);
        }

        // Cart navigation
        else if (
            transcript.toLowerCase().includes("cart") ||
            transcript.toLowerCase().includes("kaat") ||
            transcript.toLowerCase().includes("caat")
        ) {
            speak("Opening your cart");
            navigate("/cart");
            setShowSearch(false);
        } // Contact Page
        else if (transcript.toLowerCase().includes("contact")) {
            speak("Opening contact page");
            navigate("/contact");
            setShowSearch(false);
        }

        // Orders Page
        else if (
            transcript.toLowerCase().includes("order") ||
            transcript.toLowerCase().includes("myorders") ||
            transcript.toLowerCase().includes("orders") ||
            transcript.toLowerCase().includes("my order")
        ) {
            speak("Opening your orders page");
            navigate("/order");
            setShowSearch(false);
        }
        else {
            toast.error("Command not recognized. Please try again.");
        }

    }
    recognition.onend=() => {
        setActiveAi(false);
    }
    return (
        <div className='fixed bottom-[5%] left-[2%]'
        onClick={()=>{
            recognition.start();
            openSound.play();
            setActiveAi(true);
        }}>
            <img
                src={ai}
                alt=""
                className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125 rounded-full border-2 border-green-500' : 'translate-x-[0] translate-y-[0] scale-100 rounded-full border-2 border-white'} transition-transform`}
                style={{
                    filter: activeAi
                        ? "drop-shadow(0px 0px 30px green)"
                        : "drop-shadow(0px 0px 20px black)"
                }}
            />
        </div>
    )
}

export default Ai;