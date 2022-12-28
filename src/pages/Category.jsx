import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import ListItems from "../component/ListItems";
import Spinner from "../component/Spinner";
import { db } from "../firebase";

function Category() {
  const [offerListings, setOfferListings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetchedListing, setLastFetchListing] = useState(null);
  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", params.categoryType),
          orderBy("timestamp", "desc"),
          limit(8)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);
        let list = [];
        querySnap.forEach((doc) => {
          return list.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setOfferListings(list);
        setIsLoading(false);
      } catch (error) {
        toast.error("Could Not fetch offers data");
      }
    };
    fetchListing();
  }, [params.categoryType]);

  const onFetchMoreListing = async () => {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("type", "==", params.categoryType),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);
      let list = [];
      querySnap.forEach((doc) => {
        return list.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setOfferListings((prevList) => [...prevList, ...list]);
      setIsLoading(false);
    } catch (error) {
      toast.error("Could Not fetch offers data");
    }
  };
  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-bold">
        {params.categoryType === "rent" ? "Places for Rent" : "Places for Sale"}
      </h1>
      {isLoading ? (
        <Spinner />
      ) : offerListings && offerListings.length > 0 ? (
        <>
          <main>
            <ul className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {offerListings.map(({ id, data }) => (
                <ListItems key={id} listing={data} id={id} />
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <div className="flex justify-center items-center">
              <button
                onClick={onFetchMoreListing}
                className="bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out"
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>There are no current offers available</p>
      )}
    </div>
  );
}

export default Category;
