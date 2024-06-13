import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import Agent_Property_Card from "../../../../Components/Dashboard/Agent_Property_Card/Agent_Property_Card";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const My_Added_Properties = () => {
  const { user } = useAuth();
  const axiosSecure =  useAxiosSecure()
  const { data: myProperties = [],refetch} = useQuery({
    queryKey: ["myProperties",user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-listings/${user?.email}`);   
  
      return data;
    },
  });
   return (
    <div className="px-4">
      <div>
        <h2 className="font-lora text-2xl md:text-4xl font-bold text-center my-12">
          My Added Properties
        </h2>
      </div>
      <div className=" container my-16 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProperties.map((property) => (
          <Agent_Property_Card
            key={property._id}
            property={property}
            refetch={refetch}
          ></Agent_Property_Card>
        ))}
      </div>
    </div>
  );
};

export default My_Added_Properties;
