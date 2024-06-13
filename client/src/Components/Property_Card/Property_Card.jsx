/* eslint-disable react/prop-types */
import { FaLocationDot } from "react-icons/fa6";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";
// eslint-disable-next-line react/prop-types
const Property_Card = ({property}) => {
  const {minPrice,maxPrice}=property;
  const min=minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const max=maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
 
  return (
    <div className="font-roboto border">
      <div>
        <img className="w-full h-72" src={property.property_image} alt="" />
      </div>
      <div className="space-y-5 px-6 mt-6">
        <div className="text-center pb-2">
          <h2 className="font-roboto text-2xl font-bold">
            {property.propertyTitle}
          </h2>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <FaLocationDot className="size-7" />
            <h2 className="font-semibold text-xl">{property.propertyLocation}</h2>
          </div>
          <div className="flex items-center gap-2">
            <IoMdCheckmarkCircle className="size-7 text-green-500" />
            <h2 className="font-semibold text-xl">{property.verification_status}</h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AiFillDollarCircle className="size-8" />
          <h2 className="text-xl font-medium">${min}-${max}</h2>
        </div>
        <div className="border"></div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-semibold text-xl">Agent Information :</h2>
          <div className="flex items-center justify-evenly gap-6">
            <img className="size-16 rounded-full" src={property.agentInfo.agent_photo} alt="" />
            <h2 className=" text-xl font-medium"> {property.agentInfo.agent_name}</h2>
          </div>
        </div>
        <div className="border"></div>
        <div className="flex lg:justify-center py-4">
          <Link
            // eslint-disable-next-line react/prop-types
            to={`/property-details/${property._id}`}
            className="btn-details px-4 md:px-8  md:py-3 font-bold font-roboto"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Property_Card;
