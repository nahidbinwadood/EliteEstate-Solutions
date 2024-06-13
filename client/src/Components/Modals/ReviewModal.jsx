/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { ImSpinner4 } from "react-icons/im";

const ReviewModal = ({
  closeModal,
  isOpen,
  property,
  user,
  loading,
  setLoading,
}) => {
  const axiosSecure = useAxiosSecure();

  const { mutateAsync } = useMutation({
    mutationFn: async (reviewData) => {
      const { data } = await axiosSecure.post("/reviews", reviewData);
      console.log(data);
      return data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        console.log("successfully");
        toast.success("Your review added successfully");
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("You already added a review for this property !");
      }
    },
  });
  // current date and time

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  const formatDateTime = (dateTime) => {
    const [date, time] = dateTime.split(" ");
    let [hours, minutes] = time.split(":");
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
    return `${date} , ${hours}:${minutes}${suffix}`;
  };
  const currentDateTime = getCurrentDateTime();
  const formattedDateTime = formatDateTime(currentDateTime);
  const reviewWithTime = `${formattedDateTime}`;
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const form = e.target;
    const review = form.review.value;
    if (review == "") {
      toast.error("You need to write something for review !!");
      setLoading(false);
      return;
    }

    const reviewItem = {
      property_title: property.propertyTitle,
      agent_name: property.agentInfo.agent_name,
      review_time: reviewWithTime,
      review_description: review,
      reviewer_image: user?.photoURL,
      reviewer_email: user?.email,
      reviewer_name: user?.displayName,
    };
    console.log(reviewItem);

    try {
      await mutateAsync(reviewItem);
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Add a Review
                </DialogTitle>

                {/* form */}
                <form onSubmit={handleSubmit} className="mt-5">
                  <div className="mt-2">
                    <div className="border-2 rounded-md">
                      <textarea
                        rows={5}
                        placeholder="Enter your review"
                        className="outline-none  font-roboto w-full  text-slate-700 p-2 rounded-md placeholder:text-slate-600"
                        name="review"
                        id="review"
                      ></textarea>
                    </div>
                  </div>

                  <hr className="my-6 " />
                  {/* checkout form */}
                  <div className="flex mt-2 justify-around">
                    <button
                      onClick={() => {
                        closeModal();
                      }}
                      type="submit"
                      className="inline-flex font-lora text-white cursor-pointer justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 transition  font-semibold hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      {loading ? (
                        <ImSpinner4 className="animate-spin m-auto size-5" />
                      ) : (
                        "Submit"
                      )}
                    </button>
                    <button
                      type="button"
                      className="inline-flex font-lora text-white justify-center  rounded-md border border-transparent bg-red-500 px-4 py-2 transition  font-semibold hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

ReviewModal.propTypes = {
  bookingInfo: PropTypes.object,
  closeModal: PropTypes.func,
  isOpen: PropTypes.bool,
};

export default ReviewModal;
