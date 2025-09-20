import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-blue-50">
  <h1 className="text-5xl font-extrabold text-red-500 mb-4">403</h1>
  <p className="text-xl mb-6 text-gray-700">
    Oops! 🚦 Looks like you’ve taken a wrong turn. Only certain runners can sprint this way!
  </p>
  <Link
    to="/login"
    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    Back to Start Line
  </Link>
</div>

  );
};

export default Unauthorized;
