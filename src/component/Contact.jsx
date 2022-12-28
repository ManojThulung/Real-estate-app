import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebase";

function Contact({ userRef, listing }) {
  const [landLord, setLandLord] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLandLord(docSnap.data());
      } else {
        toast.error("Cound not get the Data");
      }
    };

    fetchListing();
  }, [userRef]);

  const onChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {landLord !== null && (
        <div className="flex flex-col w-full">
          <p className="">
            Contact {landLord.name} for {listing.name}
          </p>
          <p>Email: {landLord.email}</p>
          <textarea
            id="message"
            type="text"
            name="message"
            value={message}
            onChange={onChange}
            placeholder="Message"
            className="bg-white rounded text-gray-700 border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
          />
          <a
            href={`mailto:${landLord.email}?subject=${listing.name}&body=${message}`}
          >
            <button
              type="button"
              className="w-full mb-6 mt-3 text-white font-semibold uppercase text-sm rounded cursor-pointer px-7 py-3 shadow-sm bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg transition duration-200 ease-in-out "
            >
              Sent message
            </button>
          </a>
        </div>
      )}
    </>
  );
}

export default Contact;
