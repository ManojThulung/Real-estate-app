import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../component/Spinner";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router";

function EditListing() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isListing, setIsListing] = useState(null);
  const params = useParams();
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
    discountPrice: 0,
    images: {},
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    regularPrice,
    discountPrice,
    images,
  } = formData;

  const onChange = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    //for files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }
    //for text/boolean/number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  // to fetch data
  useEffect(() => {
    setIsLoading(true);
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setIsListing(docSnap.data());

        setFormData({ ...docSnap.data() });
        setIsLoading(false);
      } else {
        navigate("/");
        toast.error("Listing does not Exist");
      }
    };

    fetchListing();
  }, [params.listingId, navigate]);

  // to allow access to edit only to its owner.
  useEffect(() => {
    if (isListing && isListing.userRef !== auth.currentUser.uid) {
      navigate("/");
      toast.error("You cannot edit this Listing");
    }
  }, [auth.currentUser.uid, isListing, navigate]);

  //Image upload function
  const storeImage = async (image) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`;
      const storageRef = ref(storage, filename);

      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (+discountPrice >= +regularPrice) {
      toast.error("Discount Price must be less than Regular Price");
      return;
    }

    if (images.length > 6) {
      toast.error("Number of images need to be less than 6");
      return;
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image))
    ).catch((error) => {
      setIsLoading(false);
      toast.error("Images not uploaded");
      return;
    });

    setIsLoading((prevState) => (prevState = true));

    const formDataCopy = {
      ...formData,
      imgUrls,
      timestamp: serverTimestamp(),
      userRef: auth.currentUser.uid,
    };

    delete formDataCopy.images;
    !formDataCopy.offer && delete formDataCopy.discountPrice;
    const docRef = doc(db, "listings", params.listingId);
    await updateDoc(docRef, formDataCopy);
    setIsLoading((prevState) => (prevState = false));
    toast.success("Listing Created!");
    navigate(`/category/${formDataCopy.type}/${docRef.id}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="px-2 max-w-md mx-auto">
      <h1 className="text-center text-3xl font-bold mt-6">Edit Listing</h1>
      <form onSubmit={onSubmit}>
        <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
        <div className="flex gap-4">
          <button
            type="button"
            id="type"
            value="sell"
            onClick={onChange}
            className={`text-sm px-7 py-3 w-full uppercase font-semibold shadow-sm rounded hover:shadow-lg transition duration-150 ease-in-out active:shadow-lg ${
              type === "rent"
                ? "bg-gray-300 text-black"
                : "bg-gray-600 text-white"
            }`}
          >
            Sell
          </button>
          <button
            type="button"
            id="type"
            value="rent"
            onClick={onChange}
            className={`text-sm px-7 py-3 w-full uppercase font-semibold shadow-sm rounded hover:shadow-lg transition duration-150 ease-in-out active:shadow-lg ${
              type === "sell"
                ? "bg-gray-300 text-black"
                : "bg-gray-600 text-white"
            }`}
          >
            Rent
          </button>
        </div>

        <p className="text-lg mt-6 font-semibold">Property Name</p>
        <input
          type="text"
          id="name"
          value={name}
          placeholder="Property name"
          maxLength="32"
          minLength="5"
          onChange={onChange}
          required
          className="w-full px-4 py-2 text-md text-gray-700 rounded border-gray-300 transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 mb-6"
        />

        <div className="flex space-x-6 mb-6">
          <div>
            <p className="text-lg font-semibold">Bedrooms</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="40"
              required
              className="w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 transition duration-150 ease-in-out text-center focus:text-gray-700 focus:border-slate-600 focus:bg-white"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Bathrooms</p>
            <input
              type="number"
              id="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="40"
              required
              className="w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 transition duration-150 ease-in-out text-center focus:text-gray-700 focus:border-slate-600 focus:bg-white"
            />
          </div>
        </div>

        <p className="text-lg mt-6 font-semibold">Parking Spot</p>
        <div className="flex gap-4">
          <button
            type="button"
            id="parking"
            value={true}
            onClick={onChange}
            className={`text-sm px-7 py-3 w-full uppercase font-semibold shadow-sm rounded hover:shadow-lg transition duration-150 ease-in-out active:shadow-lg ${
              !parking ? "bg-gray-300 text-black" : "bg-gray-700 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="parking"
            value={false}
            onClick={onChange}
            className={`text-sm px-7 py-3 w-full uppercase font-semibold shadow-sm rounded hover:shadow-lg transition duration-150 ease-in-out active:shadow-lg ${
              parking ? "bg-gray-300 text-black" : "bg-gray-600 text-white"
            }`}
          >
            no
          </button>
        </div>

        <p className="text-lg mt-6 font-semibold">Furnished</p>
        <div className="flex gap-4">
          <button
            type="button"
            id="furnished"
            value={true}
            onClick={onChange}
            className={`text-sm px-7 py-3 w-full uppercase font-semibold shadow-sm rounded hover:shadow-lg transition duration-150 ease-in-out active:shadow-lg ${
              !furnished ? "bg-gray-300 text-black" : "bg-gray-700 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value={false}
            onClick={onChange}
            className={`text-sm px-7 py-3 w-full uppercase font-semibold shadow-sm rounded hover:shadow-lg transition duration-150 ease-in-out active:shadow-lg ${
              furnished ? "bg-gray-300 text-black" : "bg-gray-600 text-white"
            }`}
          >
            no
          </button>
        </div>

        <p className="text-lg mt-6 font-semibold">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          placeholder="Address"
          onChange={onChange}
          required
          className="w-full px-4 py-2 text-md text-gray-700 rounded border-gray-300 transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 mb-6"
        />

        {/* {!geoLocationEnable && (
          <div className="flex mb-6 items-center justify-start space-x-6">
            <div>
              <p className="font-semibold text-lg">Latitude</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChange}
                min="-90"
                max="90"
                className="w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 transition duration-150 ease-in-out text-center focus:text-gray-700 focus:border-slate-600 focus:bg-white"
              />
            </div>
            <div>
              <p className="font-semibold text-lg">Longitude</p>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChange}
                min="-180"
                max="180"
                className="w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 transition duration-150 ease-in-out text-center focus:text-gray-700 focus:border-slate-600 focus:bg-white"
              />
            </div>
          </div>
        )} */}

        <p className="text-lg font-semibold">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          placeholder="Description"
          onChange={onChange}
          required
          className="w-full px-4 py-2 text-md text-gray-700 rounded border-gray-300 transition duration-150 ease-in-out focus:bg-white focus:text-gray-700 focus:border-slate-600 mb-6"
        />

        <p className="text-lg font-semibold">Offer</p>
        <div className="flex gap-4 mb-6">
          <button
            type="button"
            id="offer"
            value={true}
            onClick={onChange}
            className={`text-sm px-7 py-3 w-full uppercase font-semibold shadow-sm rounded hover:shadow-lg transition duration-150 ease-in-out active:shadow-lg ${
              !offer ? "bg-gray-300 text-black" : "bg-gray-700 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="offer"
            value={false}
            onClick={onChange}
            className={`text-sm px-7 py-3 w-full uppercase font-semibold shadow-sm rounded hover:shadow-lg transition duration-150 ease-in-out active:shadow-lg ${
              offer ? "bg-gray-300 text-black" : "bg-gray-600 text-white"
            }`}
          >
            no
          </button>
        </div>

        <div className="flex items-center mb-6">
          <div>
            <p className="font-semibold text-xl">Regular Price</p>
            <div className="flex items-center w-full">
              <p className="text-lg whitespace-normal mr-2">Rs.</p>
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChange}
                min="1000"
                max="50000000"
                required
                className="w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
              />
              {type === "rent" && (
                <div>
                  <p className="text-lg w-full whitespace-nowrap ml-2">
                    {" "}
                    / Month
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {offer && (
          <div className="flex items-center mb-6">
            <div>
              <p className="font-semibold text-xl">Discount Price</p>
              <div className="flex items-center w-full">
                <p className="text-lg whitespace-normal mr-2">Rs.</p>
                <input
                  type="number"
                  id="discountPrice"
                  value={discountPrice}
                  onChange={onChange}
                  max="50000000"
                  required={offer}
                  className="w-full rounded px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600"
                />
                {/* {type === "rent" && (
                  <div>
                    <p className="text-lg w-full whitespace-nowrap ml-2">
                      {" "}
                      / Month
                    </p>
                  </div>
                )} */}
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <p className="font-semibold text-xl">Images</p>
          <p className="text-gray-600">
            The first image will be cover (max 6 images)
          </p>
          <input
            type="file"
            id="images"
            multiple
            accept=".jpg,.jpeg,.png"
            onChange={onChange}
            required
            className="bg-white w-full px-3 py-2 border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600"
          />
        </div>

        <button
          type="submit"
          className="w-full mb-6 bg-blue-600 px-7 py-3 rounded text-md uppercase font-medium shadow-sm text-white transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-lg active:shadow-lg active:bg-blue-800 focus:shadow-lg focus:bg-blue-800"
        >
          Update List
        </button>
      </form>
    </main>
  );
}

export default EditListing;
