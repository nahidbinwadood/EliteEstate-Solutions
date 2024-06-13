/* eslint-disable no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import Property_Card from "../../Components/Property_Card/Property_Card";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import image from "../../assets/All_Properties/banner-2.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
const AllProperties = () => {
  //search
  const [searchText, setSearchText] = useState("");
  const [properties, setProperties] = useState([]);
  const [priceRange, setPriceRange] = useState("");
  const [search, setSearch] = useState("");
  const handleSearch = () => {
    console.log("searching text is", searchText);
    setSearch(searchText);
  };

  useEffect(() => {
    const getData = async () => {
      const [minPrice, maxPrice] = priceRange
        ? priceRange.split("-").map(Number)
        : [0, Infinity];
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/properties`,
        {
          params: { minPrice, maxPrice, search },
        }
      );
      setProperties(response.data);
    };
    getData();
  }, [priceRange, search]);

  return (
    <div>
      <div
        className="w-full flex  flex-col text-center space-y-5
         text-white items-center justify-center font-qs bg-center bg-cover h-[80vh]"
        style={{
          backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),url(${image})`,
        }}
      >
        <h2 className="font-lora font-bold text-2xl md:text-4xl lg:text-5xl">
          {" "}
          Verified Properties Listing
        </h2>
        <p className="font-roboto text-lg lg:w-2/3 mx-auto">
          Explore a curated selection of verified properties by trusted agents,
          complete with detailed information and images.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row my-6 items-center gap-6 justify-center">
        <div>
          <select
            onChange={(e) => setPriceRange(e.target.value)}
            defaultValue="default"
            name="category"
            id="category"
            className="border p-3 input input-bordered rounded-md"
          >
            <option value="default" disabled>
              Filter By Price
            </option>
            <option value="10000-50000">$0 - $10,000</option>
            <option value="10000-50000">$10,000 - $50,000</option>
            <option value="50000-100000">$50,000 - $100,000</option>
            <option value="200000-500000">$200,000 - $500,000</option>
            <option value="500000-990000">$500,000 - $990,000</option>
          </select>
        </div>
        <div className=" ">
          <div className="flex p-1  border rounded-lg    focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300">
            <input
              className="px-6 py-2 border-none text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent"
              type="text"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
              name="search"
              placeholder="Enter the Location"
              aria-label="Enter the Location"
            />

            <button
              onClick={() => handleSearch()}
              type="button"
              className="inline-block rounded-lg bg-warning px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-warning-3 transition duration-150 ease-in-out hover:bg-warning-accent-300 hover:shadow-warning-2 focus:bg-warning-accent-300 focus:shadow-warning-2 focus:outline-none focus:ring-0 active:bg-warning-600 active:shadow-warning-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className=" container my-16 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {properties.map(
          (property) =>
            property.verification_status == "verified" && (
              <Property_Card
                key={property._id}
                property={property}
              ></Property_Card>
            )
        )}
      </div>
    </div>
  );
};

export default AllProperties;
