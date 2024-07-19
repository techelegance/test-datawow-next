"use client";

import React, { useState } from "react";
import LayoutAdminComponent from "@/components/admin/layout";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import BlogCardComponent from "@/components/common/blogcard";
import CommentComponent from "@/components/common/comment";
import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

const BoardPage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const onBack = () => router.back();

  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch(`http://localhost:3000/post/${params?.id}`).then((res) =>
        res.json()
      ),
  });

  console.log({ data });

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
            <button className="text-[#49A569] py-2 px-4 border border-[#49A569] text-sm rounded-lg">
              Add Comments
            </button>
          </div>
          <div className="mt-5 overflow-y-auto grid gap-y-3">
            {data?.comments?.map((data: any) => (
              <CommentComponent key={data.id} />
            ))}
          </div>
        </section>
      </main>
    </LayoutAdminComponent>
  );
};

export default BoardPage;
