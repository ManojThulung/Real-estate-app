import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Header() {
  const [pageState, setPageState] = useState("Sign In");
  const navigate = useNavigate();
  const location = useLocation();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign In");
      }
    });
  }, [auth]);

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <div className="bg-white sticky top-0 z-40 border-b shadow-sm">
      <header className="px-3 flex justify-between items-center max-w-7xl mx-auto">
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
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "text-black border-b-green-500"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Header;
