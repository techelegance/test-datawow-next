import React, { Fragment } from "react";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import ButtonComponent from "../../common/button";
import { useDialogCreatePostStore } from "@/store/dialog/create-post";
import { useQuery } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useTokenStore } from "@/store/auth/token";
import { useProfileStore } from "@/store/auth/profile";
import clsx from "clsx";

const DialogCreatePostComponent = ({ refetch }: any) => {
  const dialogCreate = useDialogCreatePostStore((state) => state.data);
  const closeDialogCreate = useDialogCreatePostStore((state) => state.remove);
  const token = useTokenStore((state) => state.data);
  const profile = useProfileStore((state) => state.data);

  const {
    isLoading,
    error,
    data: group,
  } = useQuery({
    queryKey: ["GroupData"],
    queryFn: () =>
      fetch(`http://localhost:3000/group`).then((res) => res.json()),
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const { title, content, group } = data;
    data = { title, content, groupId: group.id, authorId: profile?.id };
    await axios
      .post("http://localhost:3000/post", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Create Post Success");
        refetch();
        reset();
        return closeDialogCreate();
      })
      .catch((err) => {
        toast.error(err?.response?.statusText);
      });
  };

  return (
    <Dialog
      open={dialogCreate}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeDialogCreate}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white border shadow-sm p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-xl/7 font-semibold text-gray-900"
              >
                Create Post
              </DialogTitle>
              <div className="mt-5">
                <Controller
                  name="group"
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: "Please select a group",
                    },
                  }}
                  render={({ field }) => (
                    <Listbox {...field}>
                      <div className="relative mt-1">
                        <Listbox.Button
                          className={clsx({
                            "relative w-full md:w-auto cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none border border-[#49A569] sm:text-sm":
                              true,
                            "border-red-500": errors?.group,
                          })}
                        >
                          <span
                            className={clsx({
                              "block truncate text-[#49A569] md:text-left text-center":
                                true,
                              "text-red-500": errors?.group,
                            })}
                          >
                            {watch("group")?.title
                              ? watch("group")?.title
                              : "Choose a community"}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronDownIcon
                              className={clsx({"h-5 w-5 text-[#49A569]":true,"text-red-500":errors?.group})}
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
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
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
                  )}
                />
              </div>
              <div className="mt-3">
                <div>
                  <input
                    {...register("title", {
                      required: { value: true, message: "Please enter title" },
                    })}
                    placeholder="Title"
                    className={clsx({
                      "relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm sm:text-sm focus:outline-none":
                        true,
                      "border-red-500": errors?.title,
                    })}
                  />
                </div>
                <div className="mt-3">
                  <textarea
                    {...register("content", {
                      required: {
                        value: true,
                        message: "Please enter content",
                      },
                    })}
                    placeholder="What’s on your mind..."
                    rows={8}
                    className={clsx({
                      "relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm sm:text-sm focus:outline-none":
                        true,
                      "border-red-500": errors?.content,
                    })}
                  />
                </div>
                <div className="mt-3 md:flex md:flex-row-reverse grid gap-3">
                  <ButtonComponent type="submit" style="solid">
                    Post
                  </ButtonComponent>
                  <ButtonComponent
                    type="button"
                    onClick={closeDialogCreate}
                    style="outline"
                  >
                    Cancel
                  </ButtonComponent>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default DialogCreatePostComponent;
