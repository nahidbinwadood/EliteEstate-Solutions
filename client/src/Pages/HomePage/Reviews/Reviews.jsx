import Review_Card from "../../../Components/Review_Card/Review_Card";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const Reviews = () => {
  const axiosPubic = useAxiosPublic();
  const { data: reviewsLatest = [] } = useQuery({
    queryKey: ["reviewsLatest"],
    queryFn: async () => {
      const { data } = await axiosPubic("/reviews/latest");
      return data;
    },
  });
  return (
    <div className="my-16 pt-12 container mx-auto px-4">
      <div className="space-y-4  ">
        <h2 className="text-2xl md:text-4xl text-center font-lora font-bold">
          Client Testimonials
        </h2>
        <p className="font-roboto text-lg lg:w-2/3 mx-auto text-center pb-12">
          Discover what our clients have to say about their experience with us.
          Read authentic testimonials from satisfied buyers and sellers,
          highlighting our commitment to excellence and customer satisfaction.
          Join the ranks of our delighted clients and experience exceptional
          service in real estate.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviewsLatest.map((review) => (
          <Review_Card key={review._id} review={review}></Review_Card>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
