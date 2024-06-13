import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import Wishlist_Card from "../../../../Components/Wishlist_Card/Wishlist_Card";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: wishlists = [], refetch } = useQuery({
    queryKey: ["wishlists", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/wishlist/${user?.email}`);
      return data;
    },
  });
 
  return (
    <div className="px-4 overflow-x-hidden">
      <div>
        <h2 className="font-lora text-2xl md:text-4xl font-bold text-center my-12">
          My Wishlist
        </h2>
      </div>
      <div className=" container my-16 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlists.map((wishlist) => (
          <Wishlist_Card key={wishlist._id} wishlist={wishlist} refetch={refetch}></Wishlist_Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
