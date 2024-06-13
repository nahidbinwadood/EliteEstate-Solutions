import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useRole = () => {
    const {user,loading}=useAuth();
    const axiosSecure=useAxiosSecure();
    const {data:role="",isLoading}=useQuery({
        queryKey:["user",user?.email],
        enabled: !loading && !!user?.email,
        queryFn:async()=>{
            const {data}=await axiosSecure(`/users/${user?.email}`)
            return data.role
        }
    })
    return  [role,isLoading]
};

export default useRole;