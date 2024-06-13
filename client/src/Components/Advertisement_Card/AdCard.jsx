/* eslint-disable react/prop-types */
import { FaSackDollar } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdVerifiedUser } from "react-icons/md";
import { TbGpsFilled } from "react-icons/tb";
// eslint-disable-next-line react/prop-types
const AdCard = ({ advertise }) => {
  const { minPrice, maxPrice } = advertise;
  const min = minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const max = maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div
      className="w-full flex flex-col  text-center space-y-5
    text-white items-center justify-end py-6 font-qs bg-center bg-cover h-[50vh]"
      style={{
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),url(${advertise.property_image})`,
      }}
    >
      <div className="space-y-4   ">
        <div className="flex items-start md:items-center flex-col md:flex-row  gap-12 pb-3 ">
          <div className="flex items-center font-semibold font-lora text-white">
            <div>
              <FaSackDollar className="size-5 mr-2 md:size-8 md:mr-4"></FaSackDollar>
            </div>
            <h2 className="md:text-2xl font-semibold">
              ${min}-${max}
            </h2>
          </div>
          <div className="flex items-center">
            <MdVerifiedUser className="text-[#00CE63] size-5 mr-2 md:size-8  " />
            <h2 className="md:text-2xl font-lora font-medium text-white">
              {advertise.verification_status}
            </h2>
          </div>
        </div>
        <div className="flex items-center font-semibold font-lora text-white">
          <div>
            <TbGpsFilled className="size-5 mr-2 md:size-8 md:mr-4" />
          </div>
          <div>
            <h2 className="md:text-2xl"> {advertise.propertyLocation}</h2>
          </div>
        </div>
        <div className="flex lg:justify-end">
          <Link
            to={`/property-details/${advertise._id}`}
            className="btn-details px-4 md:px-8  md:py-3 font-bold font-roboto"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
