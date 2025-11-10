import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-l from-[#141414] to-[#0c2025] text-white">

      <h1 className="text-7xl font-bold text-red-500">404</h1>
      <p className="text-2xl mt-4 text-gray-300">Page Not Found</p>

      <p classname="text-gray-500 mt-2">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-8 px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-semibold shadow-lg cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
