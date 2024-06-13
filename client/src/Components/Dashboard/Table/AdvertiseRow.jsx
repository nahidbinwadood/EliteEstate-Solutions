/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "./../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { SiHomeadvisor } from "react-icons/si";
import AdvertisementModal from "../../Modals/AdvertisementModal";

const AdvertiseRow = ({ property, refetch }) => {
  console.log(property.verification_status);
  const axiosSecure = useAxiosSecure();
  const { propertyTitle, maxPrice, minPrice } = property;
  const min = minPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const max = maxPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const [isOpenVerify, setIsOpenVerify] = useState(false);
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
      advertisement: verify,
    };

    try {
      await mutateAsync(userData);
      toast.success("Property updated successfully!");
      setIsOpenVerify(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <tr className="font-roboto">
      <td className="px-5 py-5 border-b-2   border-gray-200 text-center bg-white  ">
        <img
          className="size-20 rounded-full mx-auto"
          src={property.property_image}
          alt=""
        />
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200  bg-white text-center ">
        <p className="text-gray-900 whitespace-no-wrap">{propertyTitle}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <div className="flex items-center justify-center gap-2">
          <p className="text-gray-900 whitespace-no-wrap">${min}</p>
          <span>-</span>

          <div className="text-gray-900 whitespace-no-wrap">{max}</div>
        </div>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <p className="text-gray-900 whitespace-no-wrap">
          {property.agentInfo.agent_name}
        </p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <button
        disabled={property.advertisement=="yes"}
          onClick={() => setIsOpenVerify(true)}
          className="relative cursor-pointer inline-block p-3  disabled:cursor-not-allowed rounded-md bg-green-500 leading-tight"
        >
          <span aria-hidden="true" className="absolute inset-0 "></span>
          <SiHomeadvisor className="size-6 relative text-white" />
        </button>
        <AdvertisementModal
          status={"yes"}
          setIsOpenVerify={setIsOpenVerify}
          modalHandlerVerify={modalHandlerVerify}
          isOpenVerify={isOpenVerify}
          property={property}
        ></AdvertisementModal>
      </td>
    </tr>
  );
};

AdvertiseRow.propTypes = {
  property: PropTypes.object,
  refetch: PropTypes.func,
};

export default AdvertiseRow;
