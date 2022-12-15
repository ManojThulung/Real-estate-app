import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <header className="px-3 flex justify-between items-center">
        <div
          className="text-green-600 font-bold text-2xl cursor-pointer"
          onClick={() => navigate("/")}
        >
          Real Estate
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/") && "text-black border-b-green-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/offer") && "text-black border-b-green-500"
              }`}
              onClick={() => navigate("/offer")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 font-semibold text-gray-500 border-b-[3px] border-b-transparent ${
                pathMatchRoute("/sign-in") && "text-black border-b-green-500"
              }`}
              onClick={() => navigate("/sign-in")}
            >
              Sign in
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
