import React, { Fragment } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import ButtonComponent from "../../common/button";
import { useDialogUpdatePostStore } from "@/store/dialog/update-post";
import { useQuery } from "@tanstack/react-query";

const DialogUpdatePostComponent = ({}: any) => {
  const dialogUpdate = useDialogUpdatePostStore((state) => state.data);
  const closeDialogUpdate = useDialogUpdatePostStore((state) => state.remove);
  const [selected, setSelected] = useState<any>();

  const {
    isLoading,
    error,
    data: group,
  } = useQuery({
    queryKey: ["GroupData"],
    queryFn: () =>
      fetch(`http://localhost:3000/group`).then((res) => res.json()),
  });

  return (
    <Dialog
      open={dialogUpdate}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeDialogUpdate}
    >
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-sm rounded-xl bg-white border shadow-sm p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-xl/7 font-semibold text-gray-900"
            >
              Please confirm if you wish to delete the post
            </DialogTitle>
            <div className="mt-5">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                  <Listbox.Button className="relative w-full md:w-1/2 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none border border-[#49A569] sm:text-sm">
                    <span className="block truncate text-[#49A569] md:text-left text-center">
                      {selected?.title ? selected?.title : "Select a person"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronDownIcon
                        className="h-5 w-5 text-[#49A569]"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                      {group &&
                        group?.map((item: any, index: number) => (
                          <Listbox.Option
                            key={index}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active ? "bg-[#D8E9E4]" : "text-gray-900"
                              }`
                            }
                            value={item}
                          >
                            {({ selected }) => (
                              <>
                                {selected ? (
                                  <span className="absolute inset-y-0 right-3 flex items-center pl-3 text-gray-800">
                                    <CheckIcon
                                      className="size-4"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {item.title}
                                </span>
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </Listbox>
            </div>
            <div className="mt-3">
              <div>
                <input
                  placeholder="Title"
                  className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-3">
                <textarea
                  placeholder="What’s on your mind..."
                  rows={8}
                  className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mt-3 md:flex md:flex-row-reverse grid gap-3">
                <ButtonComponent
                  type="submit"
                  onClick={closeDialogUpdate}
                  style="solid"
                >
                  Post
                </ButtonComponent>
                <ButtonComponent
                  type="button"
                  onClick={closeDialogUpdate}
                  style="outline"
                >
                  Cancel
                </ButtonComponent>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default DialogUpdatePostComponent;