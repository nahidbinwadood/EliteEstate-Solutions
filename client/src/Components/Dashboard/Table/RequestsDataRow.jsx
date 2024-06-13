/* eslint-disable react/prop-types */

import { MdVerified } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import AcceptPropertyModal from "../../Modals/AcceptPropertyModal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import RejectOfferModal from "../../Modals/RejectOfferModal";

const RequestsDataRow = ({ request, refetch }) => {
  const { offered_price } = request;
  const axiosSecure = useAxiosSecure();
  const price = offered_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const [isOpenVerify, setIsOpenVerify] = useState(false);
  const [isOpenReject, setIsOpenReject] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: async (update) => {
      const { data } = await axiosSecure.patch(
        `/offers/update/${request?._id}`,
        update
      );
      return data;
    },
    onSuccess: (data) => {
      refetch();
      console.log(data);
    },
  });

  const modalHandlerVerify = async (verify) => {
    const userData = {
      status: verify,
    };

    try {
      await mutateAsync(userData);
      toast.success("Offer accepted successfully!");
      setIsOpenVerify(false);
    } catch (err) {
      setIsOpenVerify(false);
      toast.error(err.message);
    }
  };
  const modalHandleReject = async (reject) => {
    const userData = {
      status: reject,
    };

    try {
      const { data } = await axiosSecure.patch(
        `/offers/update/reject/${request?._id}`,
        userData
      );
      console.log(data);
      refetch();
      setIsOpenVerify(false);
      toast.success("Property rejected successfully!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  console.log(request);
  return (
    <tr className="font-roboto">
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white  ">
        <p className="text-gray-900 whitespace-no-wrap">
          {request.propertyTitle}
        </p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200  bg-white text-center ">
        <p className="text-gray-900 whitespace-no-wrap">
          {request.propertyLocation}
        </p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <p className="text-gray-900 whitespace-no-wrap">{request.buyerEmail}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <p className="text-gray-900 whitespace-no-wrap">{request.buyerName}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <div className="flex items-center justify-center gap-2">
          <p className="text-gray-900 whitespace-no-wrap">${price}</p>
        </div>
      </td>

      {/* Verify */}
      <td className="border-b-2 cursor-pointer text-center border-gray-200 bg-white  ">
        {request.status === "pending" ? (
          <div className="flex items-center gap-4 justify-center">
            <button
              onClick={() => setIsOpenVerify(true)}
              className="relative cursor-pointer inline-block p-3  disabled:cursor-not-allowed rounded-md bg-green-500 leading-tight"
            >
              <span aria-hidden="true" className="absolute inset-0 "></span>
              <MdVerified className="size-6 relative text-white" />
            </button>
            <AcceptPropertyModal
              status={"accepted"}
              setIsOpenVerify={setIsOpenVerify}
              modalHandlerVerify={modalHandlerVerify}
              isOpenVerify={isOpenVerify}
            ></AcceptPropertyModal>

            {/* Reject */}
            <button
              onClick={() => setIsOpenReject(true)}
              className="relative cursor-pointer inline-block p-3  disabled:cursor-not-allowed rounded-md bg-red-500 leading-tight"
            >
              <span aria-hidden="true" className="absolute inset-0 "></span>
              <TiCancel className="size-6 relative text-white" />
            </button>
            <RejectOfferModal
              status={"rejected"}
              isOpenReject={isOpenReject}
              setIsOpenReject={setIsOpenReject}
              modalHandleReject={modalHandleReject}
            ></RejectOfferModal>
          </div>
        ) : request.status === "accepted" ? (
          <button className="relative cursor-pointer inline-block px-4 py-2 font-semibold  leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-600   rounded-md"
            ></span>
            <span className="relative">
              <h2>
                <span className="font-lora text-white">Accepted</span>
              </h2>
            </span>
          </button>
        ) : request.status === "rejected" ? (
          <button className="relative cursor-pointer inline-block px-4 py-2 font-semibold  leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-600 rounded-md"
            ></span>
            <span className="relative">
              <h2>
                <span className="font-lora text-white ">Rejected</span>
              </h2>
            </span>
          </button>
        ) : (
          <button className="relative cursor-pointer inline-block px-8 py-2 font-semibold  leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-700 rounded-md"
            ></span>
            <span className="relative">
              <h2>
                <span className="font-lora text-white ">Sold</span>
              </h2>
            </span>
          </button>
        )}
      </td>
    </tr>
  );
};

export default RequestsDataRow;
