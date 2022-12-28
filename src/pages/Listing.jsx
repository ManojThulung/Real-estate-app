import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../component/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
import { BiLinkAlt } from "react-icons/bi";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";

function Listing() {
  const [isLoading, setIsLoading] = useState(true);
  const [listing, setListing] = useState(null);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const params = useParams();
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
    </main>
  );
}

export default Listing;
