/* eslint-disable react/prop-types */
 

// eslint-disable-next-line react/prop-types
const ReviewCard = ({review}) => {
    const{reviewer_name,reviewer_image,review_description,property_title}=review;
    return (
        <div className="flex gap-6 border-2 font-lora h-[30vh] border-[#b9be72] rounded-xl  px-8">
            <div className="size-24 md:size-60  flex items-center justify-center">
                <img className="w-full rounded-full" src={reviewer_image} alt="" />
            </div>
            <div className="flex flex-col gap-5 justify-center">
                <div className="flex items-center justify-between">
                    <h2 className="md:text-3xl font-semibold">{reviewer_name}</h2>
                    <h2 className="text-2xl font-semibold">{property_title}</h2>
                </div>
                <div>
                    <h2 className=" text-lg text-gray-600 font-medium">{review_description}</h2>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;