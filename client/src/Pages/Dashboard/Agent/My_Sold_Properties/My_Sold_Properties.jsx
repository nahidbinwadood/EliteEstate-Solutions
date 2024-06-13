import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import SoldPropertiesRow from "../../../../Components/Dashboard/Table/SoldPropertiesRow";

const My_Sold_Properties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: sold = [], refetch } = useQuery({
    queryKey: ["sold", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/offers/sold/${user?.email}`);
      return data;
    },
  });
  console.log(sold);
  const totalPrice = sold
    .reduce((total, item) => total + item.offered_price, 0)
    .toFixed(2);
    const price = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <div className="container mx-auto px-4 font-lora sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                  >
                    Property Title
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                  >
                    Property Location
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                  >
                    Buyer Email
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                  >
                    Buyer Name
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                  >
                    Sold Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* User data table row */}
                {sold.map((item) => (
                  <SoldPropertiesRow
                    key={item._id}
                    item={item}
                    refetch={refetch}
                  ></SoldPropertiesRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div>
        <h2 className="font-lora text-4xl font-bold text-center my-12">
          Total Property Sold
        </h2>
      </div>
      <div className="flex items-center justify-center gap-12 ">
        <div className="flex flex-col items-center gap-4 border-r-2 border-dashed border-gray-600 px-6">
          <h2 className="font-semibold text-2xl">Agent Information </h2>
          <div className="flex items-center justify-evenly gap-6">
            <img className="size-16 rounded-full" src={user?.photoURL} alt="" />
            <h2 className=" text-xl font-medium"> {user?.displayName}</h2>
            <h2 className=" text-xl font-medium"> {user?.email}</h2>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-semibold text-2xl">Total Sold: </h2>
          <div className="flex items-center justify-evenly gap-6">
            <h2 className=" text-xl font-semibold"> ${price}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default My_Sold_Properties;
