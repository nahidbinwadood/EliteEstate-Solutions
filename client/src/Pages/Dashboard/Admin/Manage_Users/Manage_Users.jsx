import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import UserDataRow from "../../../../Components/Dashboard/Table/UserDataRow";

const Manage_Users = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [],refetch } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const { data } = await axiosSecure("/users");
      return data;
    },
  });
  console.log(users);
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
                      User Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                    >
                      User Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                    >
                      Make Admin
                    </th>

                    <th
                      scope="col"
                      className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                    >
                      Make Agent
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                    >
                      Mark as Fraud
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-slate-300 border-r-2 border-white text-slate-700 font-semibold text-center text-lg"
                    >
                      Delete User
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* User data table row */}
                  {users.map((user) => (
                    <UserDataRow key={user._id} user={user} refetch={refetch}></UserDataRow>
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

export default Manage_Users;
