/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import image from "../../assets/Login/login-bg.jpg";
import logo from "../../assets/logo/Logo.svg";
import google from "../../assets/Login/google.svg";
import { FaLock } from "react-icons/fa";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ImSpinner4 } from "react-icons/im";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { user, loading, googleLogIn, setLoading, logIn } = useAuth();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogle = async () => {
    try {
      const result = await googleLogIn();
      console.log(result);
      toast.success("You've been Logged In Successfully");
      navigate(location?.state || "/");
      setLoading(false);
    } catch (err) {
      toast.error(err?.message);
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await logIn(email, password);
      console.log(result);
      navigate(location?.state || "/");
      toast.success("You've been Logged In Successfully");
    } catch (err) {
      console.log(err);
      toast.error("Invalid credentials !");
      setLoading(false)
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);
  if (user) return;
  return (
    <div
      className="w-full bg-center bg-cover md:h-[100vh]  flex flex-col md:flex-row gap-12 md:gap-0 "
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)),url(${image})`,
      }}
    >
      <div className="md:w-1/2 mt-16 md:mt-0 flex items-center justify-center  h-full">
        <div>
          <div className="cursor-pointer flex items-center">
            <img className="size-24 md:size-40" src={logo} alt="" />
            <div className="text-2xl md:text-4xl lg:text-5xl font-lora font-semibold text-white">
              <h2 className="">Elite Estate</h2>
              <h2 className=" "> Solutions</h2>
            </div>
          </div>
          <div className="font-lora text-white opacity-90 ml-6">
            <h2 className="md:text-2xl flex">
              <FaQuoteLeft className="-mt-2" />
              Your Success, Our Commitment
              <FaQuoteRight className="-mt-2" />
            </h2>
          </div>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center mx-4">
        <div className="bg-white md:px-10 md:py-16 rounded-lg px-6 py-4">
          {/* Title */}

          <div className="flex flex-col gap-4 font-roboto py-8">
            <h2 className="font-bold text-2xl md:text-4xl ">Login</h2>
            <h2 className="font-roboto text-gray-700">
              Enter your credentials and get ready to explore !
            </h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-5">
                <FaEnvelope className="size-5 text-[#6B6C6C]" />
                <input
                  {...register("email", { required: true })}
                  className="outline-none font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  id=""
                />
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>
            <div className="space-y-4">
              <div className="relative flex items-center gap-5">
                <FaLock className="size-5 text-[#6B6C6C]" />
                <input
                  {...register("password", { required: true })}
                  placeholder="Your Password"
                  className=" outline-none font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
                  type={showPassword ? "text" : "password"}
                  name="password"
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <FaEye className="absolute top-1/3 right-2 cursor-pointer text-[#6B6C6C]" />
                  ) : (
                    <FaEyeSlash className="absolute top-1/3 right-2 cursor-pointer text-[#6B6C6C]" />
                  )}
                </span>
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>
            <div>
              <h2 className="font-roboto font-semibold text-[#5571EFCC]">
                Forgot Password ?
              </h2>
            </div>
            <div>
              <div className="pb-4">
                <button className="cursor-pointer  text-center font-roboto transition duration-150 font-medium text-lg btn-grad px-8 py-3 w-full">
                  {loading ? (
                    <ImSpinner4 className="animate-spin m-auto size-5" />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <div>
                <button
                  disabled={loading}
                  onClick={handleGoogle}
                  className=" disabled:cursor-not-allowed  flex items-center gap-4 w-full justify-center border-2 border-[#5571EF50] py-2 rounded-lg"
                >
                  <img className="size-7" src={google} alt="" />{" "}
                  <h2 className="font-roboto font-semibold text-[#5571EFE6]">
                    Login with Google
                  </h2>
                </button>
              </div>
            </div>
            <div className="w-full pt-6 text-[#6B6C6C] text-center font-medium font-roboto">
              <h2>
                Doesn't have an account ?{" "}
                <Link to="/register-page" className="text-[#3852c2] font-bold">
                  Register Now
                </Link>{" "}
              </h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
