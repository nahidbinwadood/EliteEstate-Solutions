import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import RequestsDataRow from "../../../../Components/Dashboard/Table/RequestsDataRow";

const Request_Properties = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: requests = [], refetch } = useQuery({
    queryKey: ["requests",user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/offers/request/${user?.email}`);
      return data;
    },
  });
  console.log(requests);
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
                    Offered Price
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
                {requests.map((request) => (
                  <RequestsDataRow
                    key={request._id}
                    request={request}
                    refetch={refetch}
                  ></RequestsDataRow>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Request_Properties;
