import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gradient-to-l from-blue-100 to-white text-gray-800">

      <h1 className="text-7xl font-bold text-blue-950">404</h1>
      <p className="text-2xl mt-4 font-semibold text-gray-700">Page Not Found</p>

      <p className="text-gray-600 mt-2">
        The page you are looking for doesn't exist or has been moved.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-8 px-8 py-3 rounded-xl bg-blue-950 hover:bg-blue-800 transition text-white font-semibold shadow-md cursor-pointer"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
