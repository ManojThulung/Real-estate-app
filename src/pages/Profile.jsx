import { getAuth, updateProfile } from "firebase/auth";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase";
import { FcHome } from "react-icons/fc";
import ListItems from "../component/ListItems";

function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [listings, setListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;
  const [isChangeDetail, setIsChangeDetail] = useState(false);

  useEffect(() => {
    const fetchUserListing = async () => {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );

      const querySnap = await getDocs(q);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListing(listings);
      setIsLoading(false);
    };

    fetchUserListing();
  }, [auth.currentUser.uid]);

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

  const onDelete = async (listingId) => {
    if (window.confirm("You sure you want to Delete?")) {
      await deleteDoc(doc(db, "listings", listingId));
      const updateListings = listings.filter(
        (listing) => listing.id !== listingId
      );
      setListing(updateListings);
      toast.success("Deleted Successfully.");
    }
  };

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`);
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
      <div className="max-w-6xl m-auto px-3 mt-6">
        {!isLoading && listings.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-6">
              My Listings
            </h2>
            <ul className="mb-6 sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {listings.map((listing) => (
                <ListItems
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                  onDelete={() => onDelete(listing.id)}
                  onEdit={() => onEdit(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
}

export default Profile;
