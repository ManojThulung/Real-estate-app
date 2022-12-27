import Moment from "react-moment";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

function ListItems({ listing, id }) {
  return (
    <li className="bg-white relative flex flex-col justify-between items-center shadow-sm rounded-md m-[10px] overflow-hidden transition-shadow duration-150 hover:shadow-lg">
      <Link className="contents" to={`/category/${listing.type}/${id}`}>
        <img
          className="h-[170px] w-full object-cover transition-scale hover:scale-105 duration-200 ease-in"
          loading="lazy"
          src={listing.imgUrls[0]}
          alt="house"
        />
        <Moment
          className="absolute top-2 left-2 text-sm font-semibold text-white bg-blue-600 rounded-lg px-2 py-1 shadow-lg uppercase"
          fromNow
        >
          {listing.timestamp.toDate()}
        </Moment>
        <div className="w-full p-[10px]">
          <div className="flex items-center space-x-1">
            <MdLocationOn className="h-4 w-4 text-green-600" />
            <p className="font-semibold text-gray-600 truncate text-sm">
              {listing.address}
            </p>
          </div>
          <p className="font-semibold text-xl truncate mb-0">{listing.name}</p>
          <p className="font-semibold mt-2 text-blue-400">
            Rs.{" "}
            {listing.offer
              ? Number(listing.discountPrice).toLocaleString("en-IN")
              : Number(listing.regularPrice).toLocaleString("en-IN")}
            {listing.type === "rent" && " / Rent"}
          </p>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <p className="text-xs font-bold">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Bedrooms`
                  : `1 Bedroom`}
              </p>
            </div>
            <div className="flex items-center space-x-1">
              <p className="text-xs font-bold">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Bathrooms`
                  : `1 Bathroom`}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default ListItems;
