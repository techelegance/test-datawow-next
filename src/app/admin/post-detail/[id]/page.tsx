"use client";

import React, { useEffect, useState } from "react";
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
import { ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import { formatDistance } from "date-fns";

const BoardPage = () => {
  const token = useTokenStore((state) => state.data);
  const profile = useProfileStore((state) => state.data);
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const onBack = () => router.back();
  const [dialogComment, setDialogComment] = useState(false);
  const [openComment, setOpenComment] = useState(false);
  const [date, setDate] = useState<any>(null);

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

  useEffect(() => {
    if (data) {
      const dateAgo = new Date(data?.createdAt);
      const formateDateAgo = formatDistance(dateAgo, new Date(), {
        addSuffix: true,
      });
      setDate(formateDateAgo);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    const { message } = data;
    data = {
      message,
      postId: Number(params?.id),
      userId: Number(profile?.id),
    };
    await axios
      .post("http://localhost:3000/comment", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Create Post Success");
        refetch();
        reset();
        closeDialogComment();
        setOpenComment(false);
      })
      .catch((err) => {
        toast.error(err?.response?.statusText);
      });
  };

  return (
    <LayoutAdminComponent>
      <main className="md:w-full w-full bg-white h-screen overflow-y-auto">
        <section className="pt-12 md:pl-32 md:pr-52">
          <div className="px-5">
            <span>
              <button
                onClick={onBack}
                className="h-8 w-8 bg-[#D8E9E4] px-0 rounded-full p-2 text-[#243831] flex justify-center items-center"
              >
                <ArrowLeftIcon className="size-5 " />
              </button>
            </span>
            <div className="mt-3">
              <div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-x-2">
                    <img
                      src="https://s3-alpha-sig.figma.com/img/67da/9fdd/d372b1b5b44ffef41eed6ceb810ddf8a?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i9QMaml8Q5mejqhHhJkMco0Z9YZHSc4M4Po8IgTl5U1ykThCoFe3vgHjR7WdCTOfdz2bRpXLf9YHrjqOipA4OqaVqZuqM6798fu67WyecYJcEcLfd8OrZknoOdjlxBUTHUXyzikR5NcWpwUaT~WT7RMU0kf3O5N-jsM3AIFUSt6m0Ho2GgSz07wfc1ngQUb~sZ2p1rasFZde8gb7vHHFXbE65EsGBuNHzsIL-YpvkPpA682-vcwOjSYsnseJU3~VK9IE6ArMKXihQx54zT9ltMOM5in9WHCmKdui~UTSSq85hZ1IgFJyyu5VZm8YXInsVqliHyyTvfWMTB7iV6BIdw__"
                      className="w-7 h-7 rounded-full"
                    />
                    <span className="text-xs text-[#939494]">
                      {data?.author?.name}
                    </span>
                    <span className="text-xs text-[#939494]">{date}</span>
                  </div>
                </div>
                <div className="mt-3">
                  <span className="bg-slate-100 rounded-full text-xs py-1 px-2">
                    {data?.group?.title}
                  </span>
                </div>
                <div className="mt-3">
                  <h3 className="font-medium text-gray-800">{data?.title}</h3>
                  <p className="text-xs text-gray-800">{data?.content}</p>

                  <div className="mt-5 text-[#939494] text-xs flex gap-x-2 items-center">
                    <ChatBubbleOvalLeftIcon className="size-4" />
                    <span>{data?.comments?.length}</span>
                    <span>Comments</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <div className="hidden md:block">
                <button
                  onClick={() => {
                    profile ? setOpenComment(!openComment) : router.push("/");
                  }}
                  className="text-[#49A569] py-2 px-4 border border-[#49A569] text-sm rounded-lg"
                >
                  Add Comments
                </button>
              </div>
              <div className="block md:hidden">
                <button
                  onClick={() => {
                    profile ? openDialogComment() : router.push("/");
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
                        required: {
                          value: true,
                          message: "Message is required",
                        },
                      })}
                      placeholder="What’s on your mind..."
                      className={clsx({
                        "w-full h-24 border border-gray-300 rounded-lg p-4 mt-3 placeholder:text-xs focus:outline-none":
                          true,
                        "border-red-500": errors.message,
                      })}
                    ></textarea>
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <textarea
                            {...register("message", {
                              required: {
                                value: true,
                                message: "Message is required",
                              },
                            })}
                            placeholder="What’s on your mind..."
                            className={clsx({
                              "w-full h-24 border border-gray-300 rounded-lg p-4 mt-3 placeholder:text-xs focus:outline-none":
                                true,
                              "border-red-500": errors.message,
                            })}
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
                        </form>
                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </Dialog>
            </div>
            <div className="mt-5 overflow-y-auto grid gap-y-3">
              {data?.comments?.map((data: any, index: number) => (
                <CommentComponent
                  key={index}
                  name={data?.user?.name}
                  comment={data?.message}
                  date={data?.createdAt}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </LayoutAdminComponent>
  );
};

export default BoardPage;
