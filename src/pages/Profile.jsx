import { getAuth } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  const onSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center flex-col">
        <h1 className="text-center text-3xl font-bold mt-6">My Profile</h1>
        <div className="w-full md:w-[50%] mx-auto border-2 border-black px-4 py-6">
          <form>
            <input
              className="w-full mb-6 text-lg px-4 py-2 text-grey-700 bg-white border-2 border-gray-300 rounded transition duration-200 ease-in=out"
              type="text"
              id="name"
              value={name}
              disabled
            />
            <input
              className="w-full mb-6 text-lg px-4 py-2 text-grey-700 bg-white border-2 border-gray-300 rounded transition duration-200 ease-in=out"
              type="email"
              id="email"
              value={email}
              disabled
            />
            <div className="flex justify-between sm:text-lg whitespace-nowrap text-sm">
              <p>
                Change your Name?{" "}
                <span className="text-red-600 font-semibold cursor-pointer hover:underline">
                  Edit
                </span>
              </p>
              <p
                onClick={onSignOut}
                className="text-blue-700 font-semibold cursor-pointer hover:underline"
              >
                Sign Out
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
