import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import AdvertiseRow from "../../../../Components/Dashboard/Table/AdvertiseRow";

const Advertise_Property = () => {
  const axiosSecure = useAxiosSecure();
  const { data: verifiedProperty = [], refetch } = useQuery({
    queryKey: ["verifiedProperty"],
    queryFn: async () => {
      const { data } = await axiosSecure("/property/verified");
      return data;
    },
  });
  console.log(verifiedProperty);

  return (
    <div className="container mx-auto px-4 font-lora sm:px-8">
      <div>
        <h2 className="font-lora text-4xl font-bold text-center my-12">
          All Properties
        </h2>
      </div>
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
                    Property Image
                  </th>
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
                    Price Range
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                  >
                    Agent Name
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                  >
                    Advertise
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* User data table row */}
                {verifiedProperty.map((property) => (
                  <AdvertiseRow
                    key={property._id}
                    property={property}
                    refetch={refetch}
                  ></AdvertiseRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertise_Property;
