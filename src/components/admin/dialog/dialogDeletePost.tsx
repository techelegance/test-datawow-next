import React, { Fragment } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import ButtonComponent from "../../common/button";
import { useDialogDeletePostStore } from "@/store/dialog/delete-post";
import clsx from "clsx";

const DialogDeletePostComponent = ({}: any) => {
  const dialogDelete = useDialogDeletePostStore((state) => state.data);
  const closeDialogDelete = useDialogDeletePostStore((state) => state.remove);
  const [selected, setSelected] = useState<any>();

  return (
    <Dialog
      open={dialogDelete}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeDialogDelete}
    >
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
              Are you sure you want to delete the post? Once deleted, it cannot
              be recovered.
            </p>

            <div className="mt-3">
              <div className="mt-3 md:flex md:flex-row-reverse grid gap-3">
                <button
                  type="button"
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
  );
};

export default DialogDeletePostComponent;
