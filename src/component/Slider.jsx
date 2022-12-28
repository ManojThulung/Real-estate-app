import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import Spinner from "./Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router-dom";

function Slider() {
  const [listings, setListings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchListing = async () => {
      const listingRef = collection(db, "listings");
      const q = query(listingRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let lists = [];
      querySnap.forEach((doc) => {
        return lists.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(lists);
      setIsLoading(false);
    };
    fetchListing();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
          className="max-w-[1260px] m-auto relative"
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="w-full h-[350px] relative overflow-hidden"
              ></div>
              <p className="text-white absolute left-1 top-3 font-medium max-w-[90%] bg-blue-600 shadow-lg rounded rounded-br-3xl opacity-90 px-3 py-1">
                {data.name}
              </p>
              <p className="text-white absolute left-1 bottom-1 font-medium max-w-[90%] bg-red-600 shadow-lg rounded rounded-tr-3xl opacity-90 px-3 py-1">
                Rs. {Number(data.regularPrice).toLocaleString("en-IN")}
                {data.type === "rent" ? " / Month" : ""}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
}

export default Slider;
