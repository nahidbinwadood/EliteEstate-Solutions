import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import { imageUpload } from "../../../../Utils/imageApi";
import { FaHome } from "react-icons/fa";
import { FaEnvelope, FaLocationDot, FaRegImage } from "react-icons/fa6";
import { BiDollar } from "react-icons/bi";
import { BsPersonSquare } from "react-icons/bs";
import { MdDescription } from "react-icons/md";
import { ImSpinner4 } from "react-icons/im";
import toast from "react-hot-toast";
import image from "../../../../assets/dashboard/agent/update.jpg";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

const Update_Property = () => {
  const { id } = useParams();
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState();
  const { register } = useForm();

  //getting all data of specific property:
  const { data: property = {} } = useQuery({
    queryKey: ["updateProperty", id],
    enabled: !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/properties/${id}`);
      return data;
    },
  });

  //Updating function:
  const { mutateAsync } = useMutation({
    mutationFn: async (propertyInfo) => {
      const { data } = await axiosSecure.patch(
        `/properties/${id}`,
        propertyInfo
      );
      return data;
    },
    onSuccess: () => {
      console.log("successfully");
      toast.success("Property Updated successfully");
      setLoading(false);
      navigate("/dashboard/my-added-properties");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update Property ");
    },
  });
  const handleImage = (image) => {
    setImagePreview(URL.createObjectURL(image));
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const propertyTitle = form.propertyTitle.value;
    const propertyLocation = form.propertyLocation.value;
    const description = form.description.value;
    const minPrice = form.minPrice.value;
    const maxPrice = form.maxPrice.value;
    const image = form.image.files[0];
    let property_image = property.property_image;
    if (image) {
      property_image = await imageUpload(image);
    }
    const propertyInfo = {
      propertyTitle,
      propertyLocation,
      minPrice,
      property_image,
      maxPrice,
      description,
      agentInfo: {
        agent_name: user?.displayName,
        agent_email: user?.email,
        agent_photo: user?.photoURL,
      },
    };
    console.log(propertyInfo);
    if (parseInt(minPrice) < parseInt(maxPrice)) {
      try {
        await mutateAsync(propertyInfo);
      } catch (err) {
        setLoading(false);
        toast.error(err.message);
      }
    } else {
      toast.error("Maximum price should be more than Minimum price !");
      setLoading(false);
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
          <h2 className="text-2xl md:text-4xl font-bold font-lora text-center">
            Update Your Property
          </h2>
        </div>
        <div className="mt-12 bg-white   bg-opacity-20 backdrop-blur-md mx-4 px-4 py-6 md:p-16 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 ">
              <div className="flex  flex-col md:flex-row items-center gap-12">
                <div className="flex items-center gap-5">
                  <FaHome className="size-8 text-[#Fff]" />
                  <input
                    {...register("propertyTitle")}
                    className="outline-none md:w-72 font-roboto    text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    defaultValue={property.propertyTitle}
                    type="text"
                    name="propertyTitle"
                    placeholder="Enter Your Property Title"
                    id=""
                  />
                </div>
                <div className="flex items-center gap-5">
                  <FaLocationDot className="size-7 text-[#Fff]" />
                  <input
                    defaultValue={property.propertyLocation}
                    {...register("propertyLocation")}
                    className="outline-none md:w-72 font-roboto  text-slate-700 p-2 rounded-md placeholder:text-slate-600
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
              <div className="flex  flex-col md:flex-row items-center gap-12">
                <div className="flex items-center gap-5">
                  <FaRegImage className="size-6 text-[#fff]" />
                  <input
                    {...register("image")}
                    type="file"
                    onChange={(e) => handleImage(e.target.files[0])}
                    id="image"
                    name="image"
                    accept="image/*"
                    className="outline-none font-roboto w-full placeholder:text-[#666868] placeholder:font-medium"
                    placeholder="Your Name"
                  />
                </div>
                <div className="flex  flex-col md:flex-row items-center justify-center gap-5">
                  <h2 className=" font-lora px-4 py-2 bg-[#458B9A] rounded-md font-medium md:text-lg">
                    Preview{" "}
                  </h2>
                  {imagePreview ? (
                    <img className="h-28 w-full" src={imagePreview} alt="" />
                  ) : (
                    <img
                      className="h-28 w-full"
                      src={property.property_image}
                      alt=""
                    />
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
                    defaultValue={property.minPrice}
                    {...register("minPrice")}
                    className="outline-none font-roboto md:w-72   text-slate-700 p-2 rounded-md placeholder:text-slate-600
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
                    defaultValue={property.maxPrice}
                    {...register("maxPrice")}
                    className="outline-none font-roboto md:w-72   text-slate-700 p-2 rounded-md placeholder:text-slate-600
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
              <div className="flex  flex-col md:flex-row items-center gap-12">
                <div className="flex items-center gap-5">
                  <BsPersonSquare className="size-7 text-[#fff]" />
                  <input
                    {...register("agentName")}
                    className="outline-none font-roboto md:w-72 text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    readOnly
                    type="text"
                    name="agentName"
                    defaultValue={user?.displayName}
                    id=""
                  />
                </div>
                <div className="flex items-center gap-5">
                  <FaEnvelope className="size-7 text-[#fff]" />
                  <input
                    {...register("agentEmail")}
                    className="outline-none  font-roboto md:w-72   text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    readOnly
                    type="email"
                    defaultValue={user?.email}
                    name="agentEmail"
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
                    {...register("description")}
                    rows={5}
                    defaultValue={property.description}
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
                <button className="cursor-pointer text-center font-roboto transition duration-150 font-medium md:text-lg btn-reg px-8 py-3 w-full">
                  {loading ? (
                    <ImSpinner4 className="animate-spin m-auto size-5" />
                  ) : (
                    "Update Property"
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

export default Update_Property;
