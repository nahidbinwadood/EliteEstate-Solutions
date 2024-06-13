import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Property_Bought_Card from "../../../../Components/Dashboard/Property_Bought_Card/Property_Bought_Card";

const Property_Bought = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: boughtProperties = [], refetch } = useQuery({
    queryKey: ["boughtProperties", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/offers/${user?.email}`);
      return data;
    },
  });
  console.log(boughtProperties);
  return (
    <div className="overflow-x-hidden px-4">
      <div>
        <h2 className="font-lora text-2xl md:text-4xl font-bold text-center my-12">
          My Bought Properties
        </h2>
      </div>
      <div className=" container my-16 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boughtProperties.map((property) => (
          <Property_Bought_Card
            key={property._id}
            property={property}
            refetch={refetch}
          ></Property_Bought_Card>
        ))}
      </div>
    </div>
  );
};

export default Property_Bought;
