import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Offer from "./pages/Offer";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SingIn from "./pages/SingIn";
import Header from "./component/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<SingIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
