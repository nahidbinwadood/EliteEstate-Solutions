import {
    Dialog,
    Transition,
    TransitionChild,
    DialogPanel,
    DialogTitle,
  } from '@headlessui/react'
  import { Fragment } from 'react'
  import PropTypes from 'prop-types'
  const DeleteModal = ({ closeModal, isDelete, handleDelete, id }) => {
    return (
      <Transition appear show={isDelete} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </TransitionChild>
  
          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <TransitionChild
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <DialogPanel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <DialogTitle
                    as='h3'
                    className='text-2xl font-lora font-bold text-center    leading-6 text-gray-900'
                  >
                    Are you sure?
                  </DialogTitle>
                  <div className='my-4'>
                    <p className='text text-center font-roboto text-gray-800'>
                      You cannot revert it once it&apos;s done!
                    </p>
                  </div>
                  <hr className='mt-8 py-1 ' />
                  <div className='flex mt-2 justify-around'>
                    <button
                      onClick={() => {
                        handleDelete(id)
                        closeModal()
                      }}
                      type='button'
                         className="inline-flex font-lora text-white cursor-pointer justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 transition  font-semibold hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      Yes
                    </button>
                    <button
                      type='button'
                      className="inline-flex font-lora text-white justify-center  rounded-md border border-transparent bg-red-500 px-4 py-2 transition  font-semibold hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  }
  
  DeleteModal.propTypes = {
    closeModal: PropTypes.func,
    isDelete: PropTypes.bool,
    handleDelete: PropTypes.func,
    id: PropTypes.string,
  }
  
  export default DeleteModal
  