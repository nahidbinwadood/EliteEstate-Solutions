import { useNavigate, useParams } from "react-router-dom";
import image from "../../../../assets/dashboard/user/request.jpg";
import { ImSpinner4 } from "react-icons/im";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const Make_Offer = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { id } = useParams();
  const [startDate, setStartDate] = useState(new Date());
  //getting all data of specific property:
  const { data: offeredProperty = {} } = useQuery({
    queryKey: ["offeredProperty", id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/wishlists/${id}`);
      return data;
    },
  });
  
  const min = offeredProperty.minPrice
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const max = offeredProperty.maxPrice
    ?.toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const { mutateAsync } = useMutation({
    mutationFn: async (propertyData) => {
      const { data } = await axiosSecure.post("/offers", propertyData);
      return data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        setLoading(false);
        toast.success("Your offer successfully placed !");
        navigate("/dashboard/wishlist");
      } else {
        setLoading(false);
        toast.error("You already offered for this property !");
      }
    },
  });

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const propertyTitle = form.propertyTitle.value;
    const propertyLocation = form.propertyLocation.value;
    const agent_name = form.agent_name.value;
    const agent_email = form.agent_email.value;
    const buyerName = form.buyerName.value;
    const buyerEmail = form.buyerEmail.value;
    const offered_price = parseInt(form.offered_price.value);
    const buying_date = startDate.toLocaleDateString();
    const offeredDetails = {
      propertyTitle,
      propertyLocation,
      property_image: offeredProperty.property_image,
      agent_name,
      agent_email,
      agent_photo: offeredProperty.agent_photo,
      buyerName,
      buyerEmail,
      offered_price,
      buying_date,
      status: "pending",
    };
    const min = parseInt(offeredProperty.minPrice);
    const max = parseInt(offeredProperty.maxPrice);

    if (offered_price < min) {
      setLoading(false);
      toast.error("Offered price should be more than agent's minimum price");
    } else if (offered_price > max) {
      setLoading(false);
      toast.error("Offered price cannot be more than agent's maximum price");
    } else {
      try {
        await mutateAsync(offeredDetails);
      } catch (err) {
        setLoading(false);
        toast.error(err.message);
      }
    }
  };

  return (
    <div
      className="w-full flex space-y-5
        text-white items-center justify-center font-qs bg-center bg-cover h-[100vh]"
      style={{
        backgroundImage: ` linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)),url(${image})`,
      }}
    >
      <div>
        <div className="mt-12 ">
          <h2 className="text-4xl font-bold font-lora text-center">
            Make an Offer
          </h2>
        </div>
        <div className="mt-12 bg-white   bg-opacity-20 backdrop-blur-md px-16 py-16 rounded-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4 ">
              <div className="flex items-center gap-12 justify-between">
                <div className="flex flex-col  gap-5">
                  <h2 className="font-lora font-semibold text-lg">
                    Property Title
                  </h2>
                  <input
                    className="outline-none md:w-72 font-roboto text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    defaultValue={offeredProperty.propertyTitle}
                    type="text"
                    readOnly
                    name="propertyTitle"
                    placeholder="Enter Your Property Title"
                    id=""
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <h2 className="font-lora font-semibold text-lg">
                    Property Location
                  </h2>
                  <input
                    className="outline-none w-72 font-roboto  text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    type="text"
                    readOnly
                    defaultValue={offeredProperty.propertyLocation}
                    name="propertyLocation"
                    placeholder="Enter Property Location"
                    id=""
                  />
                </div>
              </div>
              <div className="border border-[#999b9b]"></div>
            </div>

            <div className="space-y-4 ">
              <div className="flex items-center justify-between gap-12">
                <div className="flex flex-col gap-5">
                  <h2 className="font-lora font-semibold text-lg">
                    Agent Name
                  </h2>
                  <input
                    className="outline-none font-roboto w-72   text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    readOnly
                    type="text"
                    defaultValue={offeredProperty.agent_name}
                    name="agent_name"
                    id=""
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <h2 className="font-lora font-semibold text-lg">
                    Agent Email
                  </h2>
                  <input
                    className="outline-none font-roboto w-72   text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    defaultValue={offeredProperty.agent_email}
                    readOnly
                    type="email"
                    name="agent_email"
                    placeholder="Enter offered price"
                    id=""
                  />
                </div>
              </div>
              <div className="border border-[#999b9b]"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-12">
                <div className="flex flex-col gap-5">
                  <h2 className="font-lora font-semibold text-lg">
                    Buyer Name
                  </h2>
                  <input
                    className="outline-none font-roboto w-72 text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    defaultValue={user?.displayName}
                    readOnly
                    type="text"
                    name="buyerName"
                    id=""
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <h2 className="font-lora font-semibold text-lg">
                    Buyer Email
                  </h2>
                  <input
                    className="outline-none  font-roboto w-72   text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    defaultValue={user?.email}
                    readOnly
                    type="email"
                    name="buyerEmail"
                    id=""
                  />
                </div>
              </div>
              <div className="border border-[#999b9b]"></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-12">
                <div className="flex flex-col gap-5">
                  <h2 className="font-lora font-semibold text-lg">
                    Offered Price
                  </h2>
                  <input
                    className="outline-none font-roboto w-72 text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    placeholder={`Between ${min} - ${max}`}
                    type="number"
                    name="offered_price"
                    id=""
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <h2 className="font-lora font-semibold text-lg">
                    Buying Date
                  </h2>
                  {/* <input
                    className="outline-none  font-roboto w-72   text-slate-700 p-2 rounded-md placeholder:text-slate-600
                   "
                    defaultValue={new Date()}
                    type="date"
                    name="buying_date"
                    id=""
                  /> */}
                  <DatePicker
                    className=" outline-none  font-roboto w-72   text-slate-700 p-2 rounded-md placeholder:text-slate-600 "
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </div>
              </div>
              <div className="border border-[#999b9b]"></div>
            </div>
            <div className="pt-5">
              <div className="pb-4">
                <button className="cursor-pointer  text-center font-roboto transition duration-150 font-medium text-lg btn-reg px-8 py-3 w-full">
                  {loading ? (
                    <ImSpinner4 className="animate-spin m-auto size-5" />
                  ) : (
                    "Offer"
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

export default Make_Offer;
