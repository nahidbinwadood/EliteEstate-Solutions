/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { MdVerified } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import VerificationModal from "../../Modals/VerificationModal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import RejectModal from "../../Modals/RejectModal";

const PropertyDataRow = ({ property, refetch }) => {
  console.log(property.verification_status);
  const axiosSecure = useAxiosSecure();
  const { propertyTitle, propertyLocation, maxPrice, minPrice } = property;
  const min = minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const max = maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const [isOpenVerify, setIsOpenVerify] = useState(false);
  const [isOpenReject, setIsOpenReject] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: async (update) => {
      const { data } = await axiosSecure.patch(
        `/properties/update/${property?._id}`,
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
      verification_status: verify,
    };

    try {
      await mutateAsync(userData);
      toast.success("Property verified successfully!");
      setIsOpenVerify(false);
    } catch (err) {
      toast.error(err.message);
    }
  };
  const modalHandleReject = async (reject) => {
    const userData = {
      verification_status: reject,
    };

    try {
      await mutateAsync(userData);
      toast.success("Property rejected successfully!");
      setIsOpenVerify(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <tr className="font-roboto">
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white  ">
        <p className="text-gray-900 whitespace-no-wrap">{propertyTitle}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200  bg-white text-center ">
        <p className="text-gray-900 whitespace-no-wrap">{propertyLocation}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <p className="text-gray-900 whitespace-no-wrap">
          {property.agentInfo.agent_name}
        </p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <p className="text-gray-900 whitespace-no-wrap">
          {property.agentInfo.agent_email}
        </p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <div className="flex items-center justify-center gap-2">
          <p className="text-gray-900 whitespace-no-wrap">${min}</p>
          <span>-</span>

          <div className="text-gray-900 whitespace-no-wrap">{max}</div>
        </div>
      </td>

      {/* Verify */}
      <td className="border-b-2 cursor-pointer text-center border-gray-200 bg-white  ">
        {property.verification_status === "pending" ? (
          <div className="flex items-center gap-4 justify-center">
            <button
              onClick={() => setIsOpenVerify(true)}
              className="relative cursor-pointer inline-block p-3  disabled:cursor-not-allowed rounded-md bg-green-500 leading-tight"
            >
              <span aria-hidden="true" className="absolute inset-0 "></span>
              <MdVerified className="size-6 relative text-white" />
            </button>
            <VerificationModal
              status={"verified"}
              setIsOpenVerify={setIsOpenVerify}
              modalHandlerVerify={modalHandlerVerify}
              isOpenVerify={isOpenVerify}
              property={property}
            ></VerificationModal>

            {/* Reject */}
            <button onClick={() => setIsOpenReject(true)} className="relative cursor-pointer inline-block p-3  disabled:cursor-not-allowed rounded-md bg-red-500 leading-tight">
              <span aria-hidden="true" className="absolute inset-0 "></span>
              <TiCancel className="size-6 relative text-white" />
            </button>
            <RejectModal
              status={"rejected"}
              isOpenReject={isOpenReject}
              setIsOpenReject={setIsOpenReject}
              modalHandleReject={modalHandleReject}
            ></RejectModal>
          </div>
        ) : property.verification_status === "verified" ? (
          <button className="relative cursor-pointer inline-block px-4 py-2 font-semibold  leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-400 opacity-70 rounded-md"
            ></span>
            <span className="relative">
              <h2>
                <span className="font-semibold ">Verified</span>
              </h2>
            </span>
          </button>
        ) : (
          <button className="relative cursor-pointer inline-block px-4 py-2 font-semibold  leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-600 opacity-70 rounded-md"
            ></span>
            <span className="relative">
              <h2>
                <span className="font-semibold ">Rejected</span>
              </h2>
            </span>
          </button>
        )}
      </td>
    </tr>
  );
};

PropertyDataRow.propTypes = {
  property: PropTypes.object,
  refetch: PropTypes.func,
};

export default PropertyDataRow;
