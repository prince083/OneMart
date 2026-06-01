import back1 from '../assets/back1.jpg'
import back2 from '../assets/back2.jpg'
import back3 from '../assets/back3.jpg'
import back4 from '../assets/back4.jpg'


function Background({ heroCount }) {
    const images = [back2, back1, back3, back4];

    return (
        <div className="w-[100%] h-[100%] float-right border-l border-orange-200 rounded-l-3xl overflow-hidden">
            <img
                src={images[heroCount]}
                alt="Background"
                className="w-full h-full object-cover"
            />
        </div>
    );
}

export default Background;