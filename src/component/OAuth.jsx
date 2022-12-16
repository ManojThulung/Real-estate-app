import { FcGoogle } from "react-icons/fc";

function OAuth() {
  return (
    <button className="flex justify-center items-center w-full bg-red-600 px-7 py-3 text-sm font-medium text-white uppercase rounded shadow-sm hover:bg-red-700 transition duration-150 ease-in-out hover:shadow-md active:shadow-lg active:bg-red-800">
      <FcGoogle className="mr-2 bg-white rounded-full text-2xl" />
      Continue With Google
    </button>
  );
}

export default OAuth;
