import PropTypes from "prop-types";
import { FaUserShield } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { HiShieldExclamation } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import UpdateUserModal from "../../Modals/updateUserModal";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import AgentUserModal from "../../Modals/AgentUserModal";
import DeleteModal from "../../Modals/DeleteModal";
import axios from "axios";
import FraudModal from "../../Modals/FraudModal";
import { IoWarningSharp } from "react-icons/io5";
const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAgent, setIsOpenAgent] = useState(false);
  const [isOpenFraud, setIsOpenFraud] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const closeModal = () => {
    setIsDelete(!isDelete);
  };
  const { mutateAsync } = useMutation({
    mutationFn: async (update) => {
      const { data } = await axiosSecure.patch(
        `/users/update/${user?.email}`,
        update
      );
      return data;
    },
    onSuccess: (data) => {
      refetch();
      console.log(data);
      toast.success("User role updated successfully!");
    },
  });

  //admin
  const modalHandler = async (name) => {
    const userData = {
      role: name,
      status: "verified",
    };

    try {
      await mutateAsync(userData);
      setIsOpen(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  //agent:
  const modalHandlerAgent = async (name) => {
    const userData = {
      role: name,
      status: "verified",
    };

    try {
      await mutateAsync(userData);
      setIsOpenAgent(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  //fraud
  const modalHandlerFraud = async (name) => {
    const userData = {
      role: name,
      status: "verified",
    };

    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/properties/fraud/${user?.email}`
      );
      console.log(data);
      toast.success(`${user.name} is fraud !!!`);
      await mutateAsync(userData);
      setIsOpenFraud(false);
    } catch (err) {
      toast.error(err.message);
    }
  };

  //Delete User:
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/users/delete/${id}`
      );
      refetch();
      toast.success(`${user.name} has been deleted !`);
      console.log(data);
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <tr className="font-roboto">
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white  ">
        <p className="text-gray-900 whitespace-no-wrap">{user?.name}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200  bg-white text-center ">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b-2 border-gray-200 text-center bg-white">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>

      {/* make admin */}
      <td className="border-b-2 text-center border-gray-200 bg-white  ">
        {user.role === "fraud" ? (
          <button className="relative cursor-pointer inline-block px-7 py-3 font-semibold  font-roboto leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-yellow-300 rounded-md"
            ></span>
            <span className="relative flex items-center gap-1 justify-center">
              {" "}
              <IoWarningSharp className="text-red-500 size-5" /> Fraud
            </span>
          </button>
        ) : (
          <button
            disabled={user.role == "admin"}
            onClick={() => setIsOpen(true)}
            className="relative cursor-pointer inline-block p-4  disabled:cursor-not-allowed rounded-xl bg-green-300  leading-tight"
          >
            <span aria-hidden="true" className="absolute inset-0 "></span>
            <FaUserShield className="size-6 relative" />
          </button>
        )}

        <UpdateUserModal
          role={"admin"}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          modalHandler={modalHandler}
          user={user}
        />
      </td>

      {/* make agent */}
      <td className="border-b-2  text-center border-gray-200 bg-white  ">
        {user.role ==="fraud" ? (<button className="relative cursor-pointer inline-block px-7 py-3 font-semibold  font-roboto leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-yellow-300 rounded-md"
          ></span>
          <span className="relative flex items-center gap-1 justify-center">
            {" "}
            <IoWarningSharp className="text-red-500 size-5" /> Fraud
          </span>
        </button>):(<button
          onClick={() => setIsOpenAgent(true)}
          className="relative cursor-pointer inline-block p-4  disabled:cursor-not-allowed rounded-xl bg-blue-500  leading-tight"
        >
          <span aria-hidden="true" className="absolute inset-0 "></span>
          <MdSupportAgent className="size-6 relative text-white" />
        </button>)}
        
        
        <AgentUserModal
          role={"agent"}
          isOpenAgent={isOpenAgent}
          setIsOpenAgent={setIsOpenAgent}
          modalHandlerAgent={modalHandlerAgent}
          user={user}
        ></AgentUserModal>
      </td>
      {/* Fraud */}
      <td className="border-b-2 cursor-pointer text-center border-gray-200 bg-white  ">
        {user.role == "agent" ? (
          <button
            onClick={() => setIsOpenFraud(true)}
            className="relative cursor-pointer inline-block p-4  disabled:cursor-not-allowed rounded-xl bg-yellow-300 leading-tight"
          >
            <span aria-hidden="true" className="absolute inset-0 "></span>
            <HiShieldExclamation className="size-6 relative" />
          </button>
        ) : (
          ""
        )}
        <FraudModal
          role={"fraud"}
          isOpenFraud={isOpenFraud}
          setIsOpenFraud={setIsOpenFraud}
          modalHandlerFraud={modalHandlerFraud}
          user={user}
        ></FraudModal>
      </td>

      {/* Delete */}
      <td className="border-b-2 cursor-pointer text-center border-gray-200 bg-white  ">
        <button
          onClick={closeModal}
          className="relative cursor-pointer inline-block p-4  disabled:cursor-not-allowed rounded-xl bg-red-500 leading-tight"
        >
          <span aria-hidden="true" className="absolute inset-0 "></span>
          <RiDeleteBin6Line className="size-6 relative text-white" />
        </button>
      </td>
      <DeleteModal
        isDelete={isDelete}
        closeModal={closeModal}
        handleDelete={handleDelete}
        id={user?._id}
      ></DeleteModal>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;
