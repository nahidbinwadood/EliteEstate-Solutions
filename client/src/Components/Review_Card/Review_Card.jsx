/* eslint-disable react/prop-types */

const Review_Card = ({ review }) => {
  return (
    <div className="flex gap-6 border-2 font-lora lg:h-[30vh] border-[#b9be72] rounded-xl px-4  py-6 md:p-0 md:px-8">
      <div className="size-24 md:size-60  flex items-center justify-center w-full">
        <img className="w-full rounded-full" src={review.reviewer_image} alt="" />
      </div>
      <div className="flex flex-col gap-5 justify-center">
        <div className="flex flex-col items-center justify-between">
          <h2 className="text-xl md:text-3xl  font-semibold">{review.reviewer_name}</h2>
          <h2 className="md:text-2xl font-semibold">{review.property_title}</h2>
        </div>
        <div>
          <h2 className=" md:text-lg text-gray-600 font-medium">
            {review.review_description}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Review_Card;
