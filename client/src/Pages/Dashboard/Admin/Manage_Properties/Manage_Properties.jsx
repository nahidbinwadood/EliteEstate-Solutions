import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import PropertyDataRow from "../../../../Components/Dashboard/Table/PropertyDataRow";

const Manage_Properties = () => {
  const axiosSecure = useAxiosSecure();
  const { data: properties = [],refetch } = useQuery({
    queryKey: ["all-properties"],
    queryFn: async () => {
      const { data } = await axiosSecure("/properties");
      return data;
    },
  });
  
  return (
    <>
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
                      Agent Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                    >
                      Agent Email
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
                     Actions 
                    </th>
                    
                     
                  </tr>
                </thead>
                <tbody>
                  {/* User data table row */}
                  {properties.map((property) => (
                    <PropertyDataRow key={property._id} property={property} refetch={refetch}></PropertyDataRow>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Manage_Properties;
