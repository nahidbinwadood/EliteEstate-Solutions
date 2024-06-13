import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { TbGpsFilled } from "react-icons/tb";
import { MdVerifiedUser } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from 'react-router-dom';
// eslint-disable-next-line react/prop-types
const Advertisement_Card = ({ advertise }) => {
  const {
    // eslint-disable-next-line react/prop-types
    price_range, property_image,  property_location,  verification_status,} = advertise;

  return (
    <div className="relative px-4 lg:px-0 ">
      <Swiper
       spaceBetween={30}
       centeredSlides={true}
       loop={true}
       autoplay={{
         delay: 9000,
         disableOnInteraction: false,
       }}
       
       navigation={true}
       modules={[Autoplay, Pagination, Navigation]}
       className="mySwiper"
      >
        {
          // eslint-disable-next-line react/prop-types
          property_image.map((item) => (
            <SwiperSlide key={item.id}>
              <div
                className="w-full font-qs bg-center bg-cover h-[50vh]"
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),url(${item})`,
                }}
              ></div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <div className="absolute z-10 top-24  md:top-64 w-full px-4 ">
     
        <div className="space-y-4 md:mt-12 ">
          <div className="flex items-start md:items-center flex-col md:flex-row  justify-between pb-3 ">
            <div className="flex items-center font-semibold font-lora text-white">
              <div>
                <FaSackDollar className="size-5 mr-2 md:size-8 md:mr-4"></FaSackDollar>
              </div>
              <h2 className="md:text-2xl"> {price_range}</h2>
            </div>
            <div className="flex items-center">
              <MdVerifiedUser className="text-[#00CE63] size-5 mr-2 md:size-8  " /> 
              <h2 className="md:text-xl font-lora font-medium text-white">
                {verification_status}
              </h2>
            </div>
          </div>
          <div className="flex items-center font-semibold font-lora text-white">
            <div>
              <TbGpsFilled className="size-5 mr-2 md:size-8 md:mr-4" />
            </div>
            <div>
              <h2 className="md:text-2xl"> {property_location}</h2>
            </div>
          </div>
          <div className="flex lg:justify-end">
            <Link to="/property-details/" className="btn-details px-4 md:px-8  md:py-3 font-bold font-roboto">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisement_Card;
