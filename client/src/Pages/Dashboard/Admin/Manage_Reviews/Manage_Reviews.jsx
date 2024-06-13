import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Admin_Review_Card from "../../../../Components/Dashboard/Admin_Review_Card/Admin_Review_Card";

const Manage_Reviews = () => {
  const axiosSecure = useAxiosSecure();
  const { data: allReviews = [], refetch } = useQuery({
    queryKey: ["myReviews"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/reviews`);
      return data;
    },
  });
  console.log(allReviews);
  return (
    <div>
      <div>
        <h2 className="font-lora text-2xl md:text-4xl font-bold text-center my-12">
          All Reviews
        </h2>
      </div>
      <div className=" container my-16 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {allReviews.map((review) => (
          <Admin_Review_Card
            key={review._id}
            review={review}
            refetch={refetch}
          ></Admin_Review_Card>
        ))}
      </div>
    </div>
  );
};

export default Manage_Reviews;
