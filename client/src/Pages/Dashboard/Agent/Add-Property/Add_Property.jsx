import { useForm } from "react-hook-form";
import image from "../../../../assets/dashboard/agent/add_property.jpg";
import { FaEnvelope, FaLocationDot, FaRegImage } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import useAuth from "../../../../Hooks/useAuth";
import { BsPersonSquare } from "react-icons/bs";
import { BiDollar } from "react-icons/bi";
import { MdDescription } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { imageUpload } from "../../../../Utils/imageApi";
import { ImSpinner4 } from "react-icons/im";
import { useState } from "react";
import useRole from "../../../../Hooks/useRole";
const Add_Property = () => {
  const [role] = useRole();
  console.log(role);
  const axiosSecure = useAxiosSecure();
  const { user, loading, setLoading } = useAuth();
  const { register, handleSubmit } = useForm();
  const [imagePreview, setImagePreview] = useState();
  const navigate = useNavigate();

  const { mutateAsync } = useMutation({
    mutationFn: async (propertyData) => {
      const { data } = await axiosSecure.post("/properties", propertyData);
      return data;
    },
    onSuccess: () => {
      console.log("successfully");
      toast.success("Property added successfully");
      setLoading(false);
      navigate("/dashboard/my-added-properties");
    },
  });
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
  };
  const onSubmit = async (data) => {
    setLoading(true);
    if (role === "fraud") {
      toast.error("Action not permitted !");
      setLoading(false);
    } else {
      const image = data.image[0];
      const {
        propertyTitle,
        propertyLocation,
        minPrice,
        maxPrice,
        description,
        agentName,
        agentEmail,
      } = data;
      let min = parseFloat(minPrice);
      let max = parseFloat(maxPrice);
      try {
        const image_url = await imageUpload(image);
        const propertyInfo = {
          propertyTitle,
          propertyLocation,
          minPrice: min,
          maxPrice: max,
          property_image: image_url,
          description,
          verification_status: "pending",
          advertisement: "no",
          agentInfo: {
            agent_name: agentName,
            agent_email: agentEmail,
            agent_photo: user?.photoURL,
          },
        };
        if (parseInt(maxPrice) < 1000000) {
          if (parseInt(minPrice) < parseInt(maxPrice)) {
            console.log(image_url);
            await mutateAsync(propertyInfo);
          } else {
            toast.error("Maximum price should be more than Minimum price !");
            setLoading(false);
          }
        } else {
          toast.error("Maximum price should be less than 1M !");
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };
  return (
    <div
      className="w-full flex space-y-5
        text-white items-center justify-center font-qs bg-center bg-cover lg:h-[100vh]"
      style={{
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),url(${image})`,
      }}
    >
      <div>
        <div className="mt-12 ">
          <h2 className=" text-2xl md:text-4xl font-bold font-lora text-center">
            Add Your Property
          </h2>
        </div>
        <div className="mt-12 bg-white   bg-opacity-20 backdrop-blur-md  mx-4 px-4 py-6 md:p-16 rounded-xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4 ">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex items-center gap-5">
                  <FaHome className="size-8 text-[#Fff]" />
                  <input
                    {...register("propertyTitle", { required: true })}
                    className="outline-none font-roboto lg:w-72   text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    type="text"
                    name="propertyTitle"
                    placeholder="Enter Your Property Title"
                    id=""
                  />
                </div>
                <div className="flex  items-center gap-5">
                  <FaLocationDot className="size-7 text-[#Fff]" />
                  <input
                    {...register("propertyLocation", { required: true })}
                    className="outline-none font-roboto lg:w-72    text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    type="text"
                    name="propertyLocation"
                    placeholder="Enter Property Location"
                    id=""
                  />
                </div>
              </div>
              <div className="border border-[#747575]"></div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row  items-center gap-12">
                <div className="flex items-center gap-5">
                  <FaRegImage className="size-6 text-[#fff]" />
                  <input
                    {...register("image", { required: true })}
                    type="file"
                    onChange={(e) => handleImage(e.target.files[0])}
                    id="image"
                    name="image"
                    accept="image/*"
                    className="outline-none  font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
                    placeholder="Your Name"
                  />
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-5">
                  <h2 className=" font-lora px-4 py-2 bg-[#458B9A] rounded-md font-medium text-lg">
                    Preview{" "}
                  </h2>
                  {imagePreview ? (
                    <img className="h-28 w-full" src={imagePreview} alt="" />
                  ) : (
                    "Not Available"
                  )}
                </div>
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>
            <div className="space-y-4 ">
              <div className="flex  flex-col md:flex-row items-center gap-12">
                <div className="flex items-center gap-5">
                  <BiDollar className="size-8 text-[#Fff]" />
                  <input
                    {...register("minPrice", { required: true })}
                    className="outline-none font-roboto lg:w-72   text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    type="number"
                    name="minPrice"
                    placeholder="Enter minimum price"
                    id=""
                  />
                </div>
                <div className="flex items-center gap-5">
                  <BiDollar className="size-7 text-[#Fff]" />
                  <input
                    {...register("maxPrice", { required: true })}
                    className="outline-none font-roboto lg:w-72    text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    type="number"
                    name="maxPrice"
                    placeholder="Enter maximum price"
                    id=""
                  />
                </div>
              </div>
              <div className="border border-[#747575]"></div>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="flex items-center gap-5">
                  <BsPersonSquare className="size-7 text-[#fff]" />
                  <input
                    {...register("agentName", { required: true })}
                    className="outline-none font-roboto lg:w-72    text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    readOnly
                    type="text"
                    name="agentName"
                    defaultValue={user?.displayName}
                    placeholder={user?.displayName}
                    id=""
                  />
                </div>
                <div className="flex items-center gap-5">
                  <FaEnvelope className="size-7 text-[#fff]" />
                  <input
                    {...register("agentEmail", { required: true })}
                    className="outline-none  font-roboto lg:w-72    text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    readOnly
                    type="email"
                    defaultValue={user?.email}
                    name="agentEmail"
                    placeholder={user?.email}
                    id=""
                  />
                </div>
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>
            <div className="space-y-4">
              <div className=" ">
                <div className="flex items-start  gap-5">
                  <MdDescription className="size-7 text-[#fff]" />
                  <textarea
                    {...register("description", { required: true })}
                    rows={5}
                    placeholder="Enter the description"
                    className="outline-none  font-roboto w-full   text-slate-700 p-2 rounded-md placeholder:text-slate-600"
                    name="description"
                    id="description"
                  ></textarea>
                </div>
              </div>
              <div className="border border-[#6B6C6C]"></div>
            </div>
            <div className="pt-5">
              <div className="pb-4">
                <button className="cursor-pointer   text-center font-roboto transition duration-150 font-medium md:text-lg btn-reg md:px-8  py-3 w-full">
                  {loading ? (
                    <ImSpinner4 className="animate-spin m-auto size-5" />
                  ) : (
                    "Add Property"
                  )}
                </button>
              </div>
              <div></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Add_Property;
