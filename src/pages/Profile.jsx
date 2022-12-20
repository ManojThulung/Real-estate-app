import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const [isChangeDetail, setIsChangeDetail] = useState(false);

  const onSignOut = () => {
    auth.signOut();
    navigate("/");
  };

  const onNameChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        //update in the firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        //update in the firbase store
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
        });

        toast.success("Profile name updated");
      }
    } catch (error) {
      toast.error("Could not be updated");
    }
  };
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center flex-col">
        <h1 className="text-center text-3xl font-bold mt-6">My Profile</h1>
        <div className="w-full md:w-[50%] mx-auto px-4 py-6">
          <form>
            <input
              className={`w-full mb-6 text-lg px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded transition duration-200 ease-in=out ${
                isChangeDetail && "bg-yellow-100 text-black border-blue-400"
              }`}
              type="text"
              id="name"
              value={name}
              disabled={!isChangeDetail}
              onChange={onNameChange}
            />
            <input
              className="w-full mb-6 text-lg px-4 py-2 text-gray-700 bg-white border-2 border-gray-300 rounded transition duration-200 ease-in=out"
              type="email"
              id="email"
              value={email}
              disabled
            />
            <div className="flex mb-8 justify-between sm:text-lg whitespace-nowrap text-sm">
              <p>
                Change your Name?{" "}
                <span
                  onClick={() => {
                    isChangeDetail && onSubmit();
                    setIsChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 font-semibold cursor-pointer hover:underline"
                >
                  {isChangeDetail ? "Set Change" : "Edit"}
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
          <button
            type="submit"
            className="bg-blue-600 w-full text-white uppercase text-md font-medium px-4 py-3 rounded hover:bg-blue-700 shadow-sm hover:shadow-lg transition duration-150 ease-in-out active:bg-blue-800"
          >
            <Link
              to="/create-listing"
              className="flex justify-center items-center"
            >
              <FcHome className="text-2xl bg-white rounded-full mr-2" />
              Rent or Sell your Home
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}

export default Profile;
