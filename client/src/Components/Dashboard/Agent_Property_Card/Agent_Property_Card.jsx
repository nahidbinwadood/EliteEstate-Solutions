/* eslint-disable react/prop-types */
import { FaLocationDot } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AiFillDollarCircle } from "react-icons/ai";
import "./buttons.css";
import { MdDelete, MdOutlinePending, MdVerified } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { TiCancel } from "react-icons/ti";
// eslint-disable-next-line react/prop-types

const Agent_Property_Card = ({ property, refetch }) => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/properties/${id}`);
      const count = data.deletedCount;
      return data, count;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(id);
          Swal.fire({
            title: "Deleted!",
            text: "Your post has been deleted.",
            icon: "success",
          });
          refetch();
          navigate(`/dashboard/my-added-properties`);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  const { minPrice, maxPrice } = property;
  const min = minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const max = maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <div className="font-roboto border">
      <div>
        <img className="w-full md:h-72" src={property.property_image} alt="" />
      </div>
      <div className="space-y-5 px-6 mt-6">
        <div className="text-center pb-2">
          <h2 className="font-roboto text-xl md:text-2xl font-bold">
            {property.propertyTitle}
          </h2>
        </div>
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2">
            <FaLocationDot className="size-7" />
            <h2 className="font-medium md:text-xl">
              {property.propertyLocation}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {property.verification_status === "pending" ? (
              <MdOutlinePending className="size-7 text-yellow-600" />
            ) : property.verification_status === "verified" ? (
              <MdVerified className="size-7 text-green-500" />
            ) : property.verification_status === "rejected" ? (
              <TiCancel className="size-8 relative text-red-500" />
            ) : null}

            <h2 className="font-medium md:text-xl">
              {property.verification_status}
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AiFillDollarCircle className="size-8" />
          <h2 className="font-medium md:text-xl">
            ${min}-${max}
          </h2>
        </div>
        <div className="border"></div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-semibold  md:text-xl">Agent Information :</h2>
          <div className="flex items-center justify-evenly gap-6">
            <img
              className="size-16 rounded-full"
              src={property.agentInfo.agent_photo}
              alt=""
            />
            <h2 className="font-medium md:text-xl">
              {" "}
              {property.agentInfo.agent_name}
            </h2>
          </div>
        </div>
        <div className="border"></div>
        <div className="flex justify-between gap-2 py-4">
          {property.verification_status !== "rejected" && (
            <Link
              // eslint-disable-next-line react/prop-types
              to={`/dashboard/update-property/${property._id}`}
              className="flex gap-2 items-center md:text-lg justify-center btn-update px-4 md:px-8 py-2  md:py-3 font-medium font-roboto"
            >
              <RiEdit2Fill className="size-6" />
              Update
            </Link>
          )}
          <button
            onClick={() => handleDelete(property._id)}
            className="flex gap-2 items-center md:text-lg justify-center btn-delete px-4 md:px-8  md:py-3 font-medium font-roboto"
          >
            <MdDelete className="size-6" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Agent_Property_Card;
