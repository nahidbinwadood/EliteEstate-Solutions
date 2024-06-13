import PropTypes from "prop-types";
import { Fragment } from "react";
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogTitle,
  DialogPanel,
} from "@headlessui/react";

// eslint-disable-next-line react/prop-types
const FraudModal = ({ setIsOpenFraud, isOpenFraud, modalHandlerFraud, user,role}) => {
  return (
    <Transition appear show={isOpenFraud} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpenFraud(false)}
      >
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
              <DialogPanel className="w-full h-56 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-lora font-semibold  text-center leading-6 text-gray-900"
                >
                  Update User Role
                </DialogTitle>
                <div className="py-8 w-full">
                  <h2 className=" text-center">Are you sure to make <span className="font-semibold">{user.name}</span> Fraud ?</h2>
                </div>
                <hr className="mt-2 " />

                <div className="flex mt-4 justify-center  gap-5">
                  <button
                    type="button"
                    className="inline-flex font-lora text-white cursor-pointer justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 transition  font-semibold hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={() => modalHandlerFraud(role)}
                  >
                    Yes,Make him 
                  </button>
                  <button
                    type="button"
                    className="inline-flex font-lora text-white justify-center  rounded-md border border-transparent bg-red-500 px-4 py-2 transition  font-semibold hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    onClick={() => setIsOpenFraud(false)}
                  >
                    Cancel
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

FraudModal.propTypes = {
  user: PropTypes.object,
  modalHandlerFraud: PropTypes.func,
  setIsOpenFraud: PropTypes.func,
  isOpenFraud: PropTypes.bool,
};

export default FraudModal;
