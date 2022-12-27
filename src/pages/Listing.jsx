import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../component/Spinner";
import { db } from "../firebase";
import { Swiper, SwiperSlide } from "swiper/react";
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
      >
        {listing.imgUrls.map((url, i) => (
          <SwiperSlide key={i}>
            <div
              className="relative w-full h-[300px]"
              style={{
                background: `url(${url}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}

export default Listing;
