/* eslint-disable react/prop-types */
import { MdDelete } from "react-icons/md";
import DeleteModal from "../../Modals/DeleteModal";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Admin_Review_Card = ({ review, refetch }) => {
  const [isDelete, setIsDelete] = useState(false);
  const axiosSecure = useAxiosSecure();
  const closeModal = () => {
    setIsDelete(!isDelete);
  };
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/reviews/${id}`);
      return data;
    },
  });
  const handleDelete = async (id) => {
    try {
      await mutateAsync(id);
      refetch();
      toast.success("Your review deleted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div className="font-roboto border">
      <div className="space-y-5 px-6 mt-6">
        <div className="mx-auto flex flex-col gap-2">
          <h2 className="text-xl font-medium">Review: </h2>
          <h2 className="md:text-lg">{review.review_description} </h2>
        </div>

        <div className="border"></div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-xl">Reviewer Information :</h2>
          <div className="flex items-center justify-evenly gap-6">
            <img
              className="size-8 md:size-16 rounded-full"
              src={review.reviewer_image}
              alt=""
            />
            <h2 className=" md:text-xl font-medium"> {review.reviewer_name}</h2>
          </div>
          <div>
            <h2 className=" md:text-xl font-medium"> {review.reviewer_email}</h2>
          </div>
        </div>
        <div className="border"></div>
        <div className="flex items-center justify-center pb-6">
          <button
            onClick={() => setIsDelete(true)}
            className="flex gap-2 items-center md:text-lg justify-center btn-delete font-medium px-4 py-2 md:px-8  md:py-3 md:font-bold font-roboto"
          >
            <MdDelete className="size-4 md:size-6" />
            Delete
          </button>
          <DeleteModal
            closeModal={closeModal}
            isDelete={isDelete}
            handleDelete={handleDelete}
            id={review._id}
          ></DeleteModal>
        </div>
      </div>
    </div>
  );
};

export default Admin_Review_Card;
