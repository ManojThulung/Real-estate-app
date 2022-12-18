import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OAuth from "../component/OAuth";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onResetPassword = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success(`Password reset email is sent to ${email}`);
      navigate("/sign-in");
    } catch (error) {
      toast.error(`The email ${email} is not signed up`);
    }
  };

  return (
    <section>
      <h1 className="text-3xl text-center font-bold mt-6">Forgot Password</h1>
      <div className="flex justify-center flex-wrap px-6 py-12 items-center max-w-7xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/photo-1585914641050-fa9883c4e21c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onResetPassword}>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email address"
              className="mb-6 w-full transition ease-in-out py-2 px-4 text-xl rounded-[5px] border-gray-300 bg-white text-gray-600 border-[2px]"
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p>
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-red-600 hover:underline">
                  Register
                </Link>
              </p>
              <p>
                <Link to="/sign-in" className="text-blue-600 hover:underline">
                  Sign In?
                </Link>
              </p>
            </div>
            <button className="bg-blue-600 w-full py-3 px-7 text-white font-medium uppercase rounded shadow-sm text-sm hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800">
              send reset password
            </button>
            <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:border-gray-300 after:flex-1">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;
