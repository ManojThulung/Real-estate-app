import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListItems from "../component/ListItems";
import Slider from "../component/Slider";
import { db } from "../firebase";

function Home() {
  const [offerListings, setOfferListings] = useState(null);
  const [rentListings, setRentListings] = useState(null);
  const [saleListings, setSaleListings] = useState(null);

  //for Recent Offers
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //referece
        const listingRef = collection(db, "listings");
        //query
        const q = query(
          listingRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );

        const querySnap = await getDocs(q);
        let list = [];
        querySnap.forEach((doc) => {
          return list.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(list);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListing();
  }, []);

  //for Recent Rent
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //referece
        const listingRef = collection(db, "listings");
        //query
        const q = query(
          listingRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );

        const querySnap = await getDocs(q);
        let list = [];
        querySnap.forEach((doc) => {
          return list.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(list);
      } catch (error) {
        console.log(error);
      }
    };

    fetchListing();
  }, []);

  //for recent sales
  useEffect(() => {
    const fetchListing = async () => {
      try {
        //referece
        const listingRef = collection(db, "listings");
        //query
        const q = query(
          listingRef,
          where("type", "==", "sell"),
          orderBy("timestamp", "desc"),
          limit(4)
        );

        const querySnap = await getDocs(q);
        let list = [];
        querySnap.forEach((doc) => {
          return list.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchListing();
  }, []);

  return (
    <div>
      <Slider />
      <div className="max-w-6xl m-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent Offers</h2>
            <Link to="/offer">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 hover:underline transition duration-150 ease-in-out">
                Show more offers
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {offerListings.map(({ data, id }) => (
                <ListItems key={id} listing={data} id={id} />
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent Rents</h2>
            <Link to="/category/rent">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 hover:underline transition duration-150 ease-in-out">
                Show more places for Rent
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {rentListings.map(({ data, id }) => (
                <ListItems key={id} listing={data} id={id} />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent Sales</h2>
            <Link to="/category/sell">
              <p className="px-3 text-sm text-blue-600 hover:text-blue-800 hover:underline transition duration-150 ease-in-out">
                Show more places in Sales
              </p>
            </Link>
            <ul className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {saleListings.map(({ data, id }) => (
                <ListItems key={id} listing={data} id={id} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
