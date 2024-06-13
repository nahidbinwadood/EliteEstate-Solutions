import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import My_Review_Card from "../../../../Components/Dashboard/My_Review_Card/My_Review_Card";

const My_Reviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myReviews = [], refetch } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/reviews/${user?.email}`);
      return data;
    },
  });
  console.log(myReviews);
  return (
    <div className="px-4">
      <div>
        <h2 className="font-lora text-2xl md:text-4xl font-bold text-center my-12">
          My Reviews
        </h2>
      </div>
      <div className=" container my-16 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myReviews.map((review) => (
          <My_Review_Card
            key={review._id}
            review={review}
            refetch={refetch}
          ></My_Review_Card>
        ))}
      </div>
    </div>
  );
};

export default My_Reviews;
