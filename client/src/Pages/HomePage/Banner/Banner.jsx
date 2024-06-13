import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Carousel from "./Carousel";
import bg1 from "../../../assets/Banner/Banner-13.jpg";
import bg2 from "../../../assets/Banner/Banner-8.jpg";
import bg3 from "../../../assets/Banner/Banner-7.jpg";
import bg4 from "../../../assets/Banner/Banner-9.jpg";
import bg5 from "../../../assets/Banner/Banner-11.jpg";

const Banner = () => {
  return (
    <div
 
      className="pb-10 "
    >
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Carousel
            image={bg1}
            text="Find Your Dream Home"
            paragraph="Discover the perfect home for you and your family with our comprehensive listings and personalized services. From cozy apartments to spacious houses, we have it all.

"
          ></Carousel>
        </SwiperSlide>
        <SwiperSlide>
          <Carousel
            image={bg2}
            text="Invest in Your Future"
            paragraph="Explore profitable real estate opportunities and secure your financial future. Our expert guidance will help you make informed investment decisions in a dynamic market."
          ></Carousel>
        </SwiperSlide>
        <SwiperSlide>
          <Carousel
            image={bg3}
            text="Luxury Living Awaits"
            paragraph="Experience upscale living in our premium properties. Tailored to your lifestyle and preferences, our luxurious homes offer the ultimate in comfort and sophistication."
          ></Carousel>
        </SwiperSlide>
        <SwiperSlide>
          <Carousel
            image={bg4}
            text="Your Trusted Partner in Real Estate"
            paragraph="Navigate the real estate market with confidence. With years of experience and a commitment to excellence, we are your trusted partner in buying, selling, and investing."
          ></Carousel>
        </SwiperSlide>
        <SwiperSlide>
          <Carousel
            image={bg5}
            text="Start Fresh Today"
            paragraph="Begin your new chapter in a home that meets all your needs. Whether you're looking for a modern apartment or a family house, we have the perfect options for you."
          ></Carousel>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
