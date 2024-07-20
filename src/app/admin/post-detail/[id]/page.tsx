"use client";

import React, { useState } from "react";
import LayoutAdminComponent from "@/components/admin/layout";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import BlogCardComponent from "@/components/common/blogcard";
import CommentComponent from "@/components/common/comment";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import ButtonComponent from "@/components/common/button";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useTokenStore } from "@/store/auth/token";
import { useProfileStore } from "@/store/auth/profile";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const BoardPage = () => {
  const token = useTokenStore((state) => state.data);
  const profile = useProfileStore((state) => state.data);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const onBack = () => router.back();
  const [dialogComment, setDialogComment] = useState(false);
  const [openComment, setOpenComment] = useState(false);

  const openDialogComment = () => {
    setDialogComment(true);
  };
  const closeDialogComment = () => {
    setDialogComment(false);
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["PostDataByUserID", params?.id],
    queryFn: () =>
      fetch(`http://localhost:3000/post/${params?.id}`).then((res) =>
        res.json()
      ),
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const { message } = data;
    data = {
      message,
      postId: Number(params?.id),
      userId: Number(profile?.id),
    };
    console.log({ data });
    await axios
      .post("http://localhost:3000/comment", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Create Post Success");
        refetch();
        closeDialogComment();
        setOpenComment(false);
      })
      .catch((err) => {
        toast.error(err?.response?.statusText);
      });
  };

  return (
    <LayoutAdminComponent>
      <main className="md:w-full w-full h-full">
        <section className="bg-white pt-12 pl-32 pr-52 h-full">
          <span>
            <button
              onClick={onBack}
              className="h-8 w-8 bg-[#D8E9E4] rounded-full p-2 text-[#243831] flex justify-center items-center"
            >
              <ArrowLeftIcon className="size-5 " />
            </button>
          </span>
          <div className="mt-3">
            <BlogCardComponent
              title={data?.title}
              detail={data?.content}
              commentsNo={data?.comments?.length}
              group={data?.group?.title}
              name={data?.author?.name}
              date={data?.createdAt}
            />
          </div>
          <div className="mt-12">
            <div className="hidden md:block">
              <button
                onClick={() => {
                  setOpenComment(!openComment);
                }}
                className="text-[#49A569] py-2 px-4 border border-[#49A569] text-sm rounded-lg"
              >
                Add Comments
              </button>
            </div>
            <div className="block md:hidden">
              <button
                onClick={() => {
                  openDialogComment();
                }}
                className="text-[#49A569] py-2 px-4 border border-[#49A569] text-sm rounded-lg"
              >
                Add Comments
              </button>
            </div>

            <div className="hidden md:block">
              {openComment && (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    {...register("message", {
                      required: { value: true, message: "Message is required" },
                    })}
                    placeholder="What’s on your mind..."
                    className="w-full h-24 border border-gray-300 rounded-lg p-4 mt-3 placeholder:text-xs focus:outline-none"
                  ></textarea>
                  {errors.message && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.message.message}
                    </p>
                  )}
                  <div className="mt-3 md:flex md:justify-end grid gap-3">
                    <ButtonComponent
                      onClick={() => setOpenComment(false)}
                      type="button"
                      style="outline"
                    >
                      Cancel
                    </ButtonComponent>
                    <ButtonComponent type="submit" style="solid">
                      Post
                    </ButtonComponent>
                  </div>
                </form>
              )}
            </div>

            <Dialog
              open={dialogComment}
              as="div"
              className="relative z-10 focus:outline-none md:hidden block"
              onClose={closeDialogComment}
            >
              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center">
                  <DialogPanel
                    transition
                    className="w-full max-w-sm rounded-xl bg-white border shadow-sm px-2 py-4 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 grid justify-center items-center text-left"
                  >
                    <div className="w-[350px]">
                      <DialogTitle as="h3" className="text-lg text-gray-900">
                        Add Comments
                      </DialogTitle>
                      <div>
                        <textarea
                          placeholder="What’s on your mind..."
                          className="w-full h-24 border border-gray-300 rounded-lg p-4 mt-3 placeholder:text-xs focus:outline-none"
                        ></textarea>
                        <div className="mt-3 md:flex md:justify-end grid gap-3">
                          <ButtonComponent
                            onClick={closeDialogComment}
                            type="button"
                            style="outline"
                          >
                            Cancel
                          </ButtonComponent>
                          <ButtonComponent type="submit" style="solid">
                            Post
                          </ButtonComponent>
                        </div>
                      </div>
                    </div>
                  </DialogPanel>
                </div>
              </div>
            </Dialog>
          </div>
          <div className="mt-5 overflow-y-auto grid gap-y-3">
            {data?.comments?.map((data: any) => (
              <CommentComponent
                key={data.id}
                name={data?.user?.name}
                comment={data?.message}
                date={data?.createdAt}
              />
            ))}
          </div>
        </section>
      </main>
    </LayoutAdminComponent>
  );
};

export default BoardPage;
