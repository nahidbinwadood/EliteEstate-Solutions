/* eslint-disable react/prop-types */
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";
import { MdLocalOffer } from "react-icons/md";
import { RiDeleteBin4Line } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import DeleteModal from "../Modals/DeleteModal";

// eslint-disable-next-line react/prop-types

const Wishlist_Card = ({ wishlist, refetch }) => {
  const [isDelete, setIsDelete] = useState(false);
  const closeModal = () => {
    setIsDelete(!isDelete);
  };
  const min = wishlist.minPrice
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const max = wishlist.maxPrice
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  //delete wishlist
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/wishlist/${id}`
      );
      refetch();
      toast.success(
        `${wishlist.propertyTitle} has removed from your wishlist!`
      );
      console.log(data);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="font-roboto border">
      <div>
        <img className="w-full md:h-72" src={wishlist.property_image} alt="" />
      </div>
      <div className="space-y-5 px-6 mt-6">
        <div className="text-center pb-2">
          <h2 className="font-roboto text-xl md:text-2xl font-bold">
            {wishlist.propertyTitle}
          </h2>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <FaLocationDot className="size-7" />
            <h2 className="font-medium md:text-xl">
              {wishlist.propertyLocation}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <IoMdCheckmarkCircle className="size-7 text-green-500" />
            <h2 className="font-medium md:text-xl">
              {wishlist.verification_status}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AiFillDollarCircle className="size-8" />
          <h2 className="font-medium md:text-xl">
            ${min}-${max}
          </h2>
        </div>
        <div className="border"></div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-semibold md:text-xl">Agent Information :</h2>
          <div className="flex items-center justify-evenly gap-6">
            <img
              className="size-16 rounded-full"
              src={wishlist.agent_photo}
              alt=""
            />
            <h2 className=" font-medium md:text-xl"> {wishlist.agent_name}</h2>
          </div>
        </div>
        <div className="border"></div>
        <div className="flex justify-between gap-4 py-4">
          <Link
            // eslint-disable-next-line react/prop-types
            to={`/dashboard/make-offer/${wishlist._id}`}
            className="flex gap-2 items-center lg:text-lg justify-center btn-update px-4 py-1 md:px-8  md:py-3 font-medium md:font-bold font-roboto"
          >
            <MdLocalOffer className="size-6" />
            Make an Offer
          </Link>
          <button
            onClick={closeModal}
            className="flex gap-2 items-center md:text-lg justify-center btn-delete  px-3  md:px-8  md:py-3 font-medium font-roboto"
          >
            <RiDeleteBin4Line className="size-6" />
            Remove
          </button>
          <DeleteModal
            isDelete={isDelete}
            closeModal={closeModal}
            handleDelete={handleDelete}
            id={wishlist?._id}
          ></DeleteModal>
        </div>
      </div>
    </div>
  );
};

export default Wishlist_Card;
