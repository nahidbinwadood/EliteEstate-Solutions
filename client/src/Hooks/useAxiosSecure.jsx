import axios from "axios";

const axiosSecure = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});import { useNavigate } from 'react-router-dom';
 import useAuth from './useAuth';



const useAxiosSecure = () => {
  const navigate=useNavigate();
  const{logOut}=useAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      const token=localStorage.getItem("access-token")
      // console.log("request stopped by interceptors",token);
      config.headers.authorization= `Bearer ${token}`
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  
  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(function (response) {
    return response;
}, async (error) => {
    const status = error.response.status;
     console.log('status error in the interceptor', status);
    // for 401 or 403 logout the user and move the user to the login
    if (status === 401 || status === 403) {
        await logOut();
        navigate('/login');
    }
    return Promise.reject(error);
})

    // request interceptor to add authorization header for every secure call to teh api
 

   
  return axiosSecure;
};

export default useAxiosSecure;
