/* eslint-disable react/prop-types */
import { AiFillDollarCircle } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { HiMiniCurrencyDollar } from "react-icons/hi2";
import {
  MdOutlinePayments,
  MdOutlinePending,
  MdVerified,
} from "react-icons/md";

import { Link } from "react-router-dom";

const Property_Bought_Card = ({ property }) => {
  const price = property.offered_price
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 console.log(property.transaction_id);
  return (
    <div className="font-roboto border">
      <div>
        <img className="w-full md:h-72" src={property.property_image} alt="" />
      </div>
      <div className="space-y-5 px-6 mt-6">
        <div className="text-center pb-2">
          <h2 className="font-roboto text-xl md:text-2xl font-bold">
            {property.propertyTitle}
          </h2>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <FaLocationDot className="size-7" />
            <h2 className="font-medium md:text-xl">
              {property.propertyLocation}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {property.status === "pending" ? (
              <MdOutlinePending className="size-7 text-yellow-600" />
            ) : property.status === "accepted" ? (
              <MdVerified className="size-7 text-green-500" />
            ) : <HiMiniCurrencyDollar className="size-7 text-green-500" />}
            <h2 className="font-medium md:text-xl">{property.status}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AiFillDollarCircle className="size-8" />
          <h2 className="font-medium md:text-xl">$ {price}</h2>
        </div>
        <div className="border"></div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-semibold  md:text-xl">Agent Information :</h2>
          <div className="flex items-center justify-evenly gap-6">
            <img
              className="size-16 rounded-full"
              src={property.agent_photo}
              alt=""
            />
            <h2 className="font-medium md:text-xl"> {property.agent_name}</h2>
          </div>
        </div>
        <div className="border"></div>
        {property.status === "accepted" ||  property.status === "bought" ? (
          <div className="flex lg:justify-between h-20 items-center py-4">
            {property.status === "accepted" && (
              <Link
                to={`/dashboard/payment/${property._id}`}
                className="flex gap-2 items-center text-lg justify-center btn-update px-4 md:px-8  md:py-3 font-bold font-roboto"
              >
                <MdOutlinePayments className="size-6" />
                Pay
              </Link>
            )}
            {property.transaction_id && (
              <div className="flex flex-col md:flex-row items-center justify-center gap-2">
                <h2 className="font-lora font-semibold text-xl">TXID :</h2>
                <h2 className="font-lora font-medium text-lg">
                  {property.transaction_id}
                </h2>
              </div>
            )}
          </div>
        ) : ""}
      </div>
    </div>
  );
};

export default Property_Bought_Card;
