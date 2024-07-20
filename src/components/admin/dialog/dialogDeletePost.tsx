import React, { Fragment } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { useDialogDeletePostStore } from "@/store/dialog/delete-post";
import clsx from "clsx";
import axios from "axios";
import { useTokenStore } from "@/store/auth/token";
import toast from "react-hot-toast";

const DialogDeletePostComponent = ({ refetch }: any) => {
  const dialogDelete = useDialogDeletePostStore((state) => state.data);
  const closeDialogDelete = useDialogDeletePostStore((state) => state.remove);
  const token = useTokenStore((state) => state.data);

  const onSubmit = async () => {
    await axios
      .delete(`http://localhost:3000/post/${dialogDelete?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Delete Post Success");
        refetch();
        return closeDialogDelete();
      })
      .catch((err) => {
        toast.error(err?.response?.statusText);
      });
  };

  return (
    <Transition appear show={dialogDelete?.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={closeDialogDelete}
      >
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-sm rounded-xl bg-white border shadow-sm p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 grid justify-center items-center text-center"
            >
              <DialogTitle as="h3" className="text-lg text-gray-900 w-[300px]">
                Please confirm if you wish to delete the post
              </DialogTitle>
              <p className="text-[#475467] text-sm mt-3">
                Are you sure you want to delete the post? Once deleted, it
                cannot be recovered.
              </p>

              <div className="mt-3">
                <div className="mt-3 md:flex md:flex-row-reverse grid gap-3">
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className={clsx({
                      "py-1 px-4 rounded-lg w-full": true,

                      "bg-[#F23536] text-white hover:bg-red-700 hover:text-white":
                        true,
                    })}
                  >
                    <span className="text-sm">Delete</span>
                  </button>
                  <button
                    type="button"
                    onClick={closeDialogDelete}
                    className="py-1 px-4 rounded-lg w-full border text-[#5B5B5B]"
                  >
                    <span className="text-sm">Cancel</span>
                  </button>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogDeletePostComponent;
