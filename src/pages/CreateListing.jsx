import React, { useState } from "react";

function CreateListing() {
  const [fromData, setFormData] = useState({
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
  } = fromData;

  const onChange = () => {};

  return (
    <main className="px-2 max-w-md mx-auto">
      <h1 className="text-center text-3xl font-bold mt-6">Create a Listing</h1>
      <form>
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
            value={false}
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
            value={true}
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
            value={false}
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
            value={true}
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
            value={false}
            onClick={onChange}
            className={`text-sm px-7 py-3 w-full uppercase font-semibold shadow-sm rounded hover:shadow-lg transition duration-150 ease-in-out active:shadow-lg ${
              !offer ? "bg-gray-300 text-black" : "bg-gray-700 text-white"
            }`}
          >
            Yes
          </button>
          <button
            type="button"
            id="furnished"
            value={true}
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
                  min="1000"
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
          Create List
        </button>
      </form>
    </main>
  );
}

export default CreateListing;
