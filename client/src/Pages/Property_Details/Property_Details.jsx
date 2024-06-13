/* eslint-disable react/no-unescaped-entities */
// eslint-disable-next-line react/no-unescaped-entities
import { IoLocationSharp, IoPersonCircle } from "react-icons/io5";
import { FaEnvelope, FaPhone } from "react-icons/fa6";
import icon from "../../assets/icons/location-pin-map-svgrepo-com.svg";
import { AiFillDollarCircle } from "react-icons/ai";
import "./Wishlist.css";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import ReviewModal from "../../Components/Modals/ReviewModal";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Review_Card from "../../Components/Review_Card/Review_Card";

const Property_Details = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const axiosPublic = useAxiosPublic();
  const { data: property = {} } = useQuery({
    queryKey: ["property"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/properties/${id}`);
      return data;
    },
  });
  const { propertyTitle } = property;

  const [reviews, setReviews] = useState([]);
  console.log(reviews);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axiosSecure.get(
          `/review?property_title=${property.propertyTitle}`
        );
        setReviews(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (propertyTitle) {
      fetchReviews();
    }
  }, [axiosSecure, property.propertyTitle, propertyTitle]);

  let { minPrice, maxPrice } = property;
  const min = minPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const max = maxPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const closeModal = () => {
    setIsOpen(!isOpen);
  };
  //wishlist
  const handleWishList = async () => {
    const {
      propertyTitle,
      property_image,
      propertyLocation,
      verification_status,
    } = property;
    const wishlistInfo = {
      propertyTitle,
      property_image,
      propertyLocation,
      verification_status,
      buyer_name: user.displayName,
      buyer_email: user.email,
      maxPrice,
      minPrice,
      agent_name: property.agentInfo.agent_name,
      agent_photo: property.agentInfo.agent_photo,
      agent_email: property.agentInfo.agent_email,
    };
    console.log(wishlistInfo);
    try {
      const { data } = await axiosPublic.post("/wishlist", wishlistInfo);
      console.log(data);
      if (data.insertedId) {
        toast.success("This property has been added in your wishlist !");
      } else {
        toast.error("You already added this property in your wishlist !");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="container mx-auto my-16 px-4">
      <div className="max-w-screen-lg mx-auto my-16">
        <img
          className="w-full object-contain md:h-[60vh] overflow-hidden rounded-xl"
          src={property.property_image}
          alt=""
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 mb-12 gap-12 lg:gap-0">
        <div className="md:col-span-8 space-y-6 md:border-r-2 border-dashed border-gray-600 px-6 md:px-12">
          <div className="pb-6">
            <h2 className="font-lora text-2xl md:text-4xl font-bold ">
              {property.propertyTitle}
            </h2>
          </div>
          <div className="flex flex-col gap-2 md:flex-row justify-between font-roboto ">
            <div className="flex items-center gap-3">
              <IoLocationSharp
                className="size-7 md:size-10 text-[#4296FF]"
                src={icon}
                alt=""
              />
              <h2 className="font-semibold text-lg md:text-2xl">
                {property.propertyLocation}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <AiFillDollarCircle className="size-7 md:size-10 text-[#4296FF]" />
              <h2 className=" font-semibold text-lg md:text-2xl">
                ${min}-${max}
              </h2>
            </div>
          </div>
          <div>
            <p className="font-medium md:text-xl text-gray-600 leading-10 overflow-auto">
              {property.description}
            </p>
          </div>
        </div>
        <div className="md:col-span-4 font-roboto mx-4">
          <div className="pb-12">
            <h2 className="font-lora font-bold text-center  text-2xl md:text-3xl">
              Agent Details{" "}
            </h2>
          </div>
          <div className="flex gap-12 items-center justify-center">
            <div>
              <img
                className="size-24 rounded-full mx-auto"
                src={property?.agentInfo?.agent_photo}
                alt=""
              />
            </div>
            <div className="space-y-6  ">
              <div className="flex items-center ">
                <IoPersonCircle className="size-8 mr-4 text-blue-400" />
                <h2 className="font-semibold md:text-xl">
                  {property?.agentInfo?.agent_name}
                </h2>
              </div>
              <div className="flex items-center ">
                <FaEnvelope className="size-6 ml-1 mr-5 text-blue-400" />
                <h2 className="font-semibold md:text-xl">
                  {property?.agentInfo?.agent_email}
                </h2>
              </div>
              <div className="flex items-center ">
                <FaPhone className="size-6 ml-1 mr-5 text-blue-400" />
                <h2 className="font-semibold md:text-xl">
                  {property?.agentInfo?.agent_number
                    ? property?.agentInfo?.agent_number
                    : "017XXXXXXXX"}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="md:px-12 flex items-center justify-between">
        <button
          onClick={handleWishList}
          className="btn-wishlist font-roboto transition duration-150 font-medium md:font-bold px-4 md:text-lg md:px-8 py-3"
        >
          {" "}
          Add to Wishlist
        </button>
        <button
          onClick={() => setIsOpen(true)}
          className="btn-review font-roboto transition duration-150 font-medium md:font-bold px-4 md:text-lg md:px-8 py-3"
        >
          {" "}
          Add to Review
        </button>
        <ReviewModal
          property={property}
          closeModal={closeModal}
          user={user}
          loading={loading}
          setLoading={setLoading}
          isOpen={isOpen}
        ></ReviewModal>
      </div>
      <div className="mt-12 text-center">
        <h2 className="font-lora text-2xl md:text-4xl font-bold my-12 "> Reviews</h2>
        <div className=" container my-16 mx-auto grid grid-cols-1 md:grid-cols-2   gap-6">
          {reviews.map((review) => (
            <Review_Card key={review._id} review={review}></Review_Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Property_Details;
