import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { db } from "../firebase";

function OAuth() {
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //Check user existance in db
      const docRef = doc(db, "users", user.uid);

      const docSnap = await getDoc(docRef); //check the user match in database users

      //if the user doesn't match
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      toast.error("Something went wrong with the Google Authentication.");
    }
  };

  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex justify-center items-center w-full bg-red-600 px-7 py-3 text-sm font-medium text-white uppercase rounded shadow-sm hover:bg-red-700 transition duration-150 ease-in-out hover:shadow-md active:shadow-lg active:bg-red-800"
    >
      <FcGoogle className="mr-2 bg-white rounded-full text-2xl" />
      Continue With Google
    </button>
  );
}

export default OAuth;
