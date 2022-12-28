import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../component/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiLinkAlt } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { FaBed, FaBath, FaParking, FaChair } from "react-icons/fa";

import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { getAuth } from "firebase/auth";
import Contact from "../component/Contact";

function Listing() {
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactLandLord, setContactLandLord] = useState(false);
  const params = useParams();
  const auth = getAuth();
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchListing = async () => {
      const docRef = doc(db, "listings", params.listingId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        navigation
        pagination={{ type: "progressbar" }}
        slidesPerView={1}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
        className="max-w-[1260px] m-auto relative"
      >
        {listing.imgUrls.map((url, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative w-full h-[340px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
        <div
          className="absolute bottom-[4%] right-[3%] shadow-sm bg-white p-1 z-10 rounded-full cursor-pointer hover:shadow-xl transition-shadow duration-150 ease-in-out"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            setShareLinkCopied(true);
            setTimeout(() => {
              setShareLinkCopied(false);
            }, 1500);
          }}
        >
          <BiLinkAlt className="text-lg text-gray-600" />
        </div>
        {shareLinkCopied && (
          <p className="absolute bottom-[12%] bg-white right-[3%] px-2 z-10 rounded-md text-gray-800 text-sm">
            Link Copied
          </p>
        )}
      </Swiper>
      <div className="flex flex-col md:flex-row max-w-6xl lg:m-auto lg:space-x-5 rounded-lg shadw-lg bg-white p-4 m-4">
        <div className="w-full">
          <p className="text-blue-900 font-bold text-xl mb-3">
            {listing.name} - Rs.{" "}
            {listing.offer
              ? Number(listing.discountPrice).toLocaleString("en-IN")
              : Number(listing.regularPrice).toLocaleString("en-IN")}
            {listing.type === "rent" ? " / month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <MdLocationOn className="text-green-700 mr-1 mt-[2px] text-lg" />
            {listing.address}
          </p>
          <div className="flex justify-start itmes-center space-x-4">
            <p className=" bg-red-600 text-white p-1 px-[60px] font-semibold text-center rounded-md">
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>
            {listing.offer && (
              <p className="bg-red-800 text-white p-1 px-[25px] font-semibold text-center rounded-md">
                Rs.{" "}
                {(
                  +listing.regularPrice - +listing.discountPrice
                ).toLocaleString("en-IN")}{" "}
                Discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex items-center font-semibold text-sm space-x-2 lg:space-x-10 mb-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : `1 Bedroom`}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms`
                : `1 Bathroom`}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? `Parking Spot` : `No Parking`}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? `Furnished` : `Not Furnished`}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandLord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandLord(true)}
                className="w-full text-white font-semibold uppercase text-sm rounded cursor-pointer px-7 py-3 shadow-sm bg-blue-600 hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg transition duration-200 ease-in-out "
              >
                Contact landlord
              </button>
            </div>
          )}
          {contactLandLord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg:h-[400px] mt-6 md:ml-2 rounded z-10 overflow-hidden">
          <p className="text-gray-700 p-4 font-semibold text-sm">
            Location Map <span className="text-2xl">🗺️</span> will be added here
            soon...
          </p>
        </div>
      </div>
    </main>
  );
}

export default Listing;
