"use client";

import React from "react";
import {
  ChatBubbleOvalLeftIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const BlogCardComponent = ({
  title,
  detail,
  commentsNo,
  editor = false,
  path,
  group,
  name,
  date
}: any) => {
  const router = useRouter();

  return (
    <div
      className={path && "cursor-pointer"}
      onClick={() => path && router.push(path, { scroll: false })}
    >
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <img
            src="https://s3-alpha-sig.figma.com/img/67da/9fdd/d372b1b5b44ffef41eed6ceb810ddf8a?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i9QMaml8Q5mejqhHhJkMco0Z9YZHSc4M4Po8IgTl5U1ykThCoFe3vgHjR7WdCTOfdz2bRpXLf9YHrjqOipA4OqaVqZuqM6798fu67WyecYJcEcLfd8OrZknoOdjlxBUTHUXyzikR5NcWpwUaT~WT7RMU0kf3O5N-jsM3AIFUSt6m0Ho2GgSz07wfc1ngQUb~sZ2p1rasFZde8gb7vHHFXbE65EsGBuNHzsIL-YpvkPpA682-vcwOjSYsnseJU3~VK9IE6ArMKXihQx54zT9ltMOM5in9WHCmKdui~UTSSq85hZ1IgFJyyu5VZm8YXInsVqliHyyTvfWMTB7iV6BIdw__"
            className="w-7 h-7 rounded-full"
          />
          <span className="text-xs text-[#939494]">{name}</span>
          <span className="text-xs text-[#939494]">{date}</span>
        </div>
        {editor && (
          <div className="text-right text-[#2B5F44] flex">
            <button className="hover:text-white hover:bg-[#2B5F44] py-1 px-2 rounded-full">
              <PencilIcon className="size-3" />
            </button>
            <button className="hover:text-white hover:bg-[#2B5F44] py-1 px-2 rounded-full">
              <TrashIcon className="size-3" />
            </button>
          </div>
        )}
      </div>
      <div className="mt-3">
        <span className="bg-slate-100 rounded-full text-xs py-1 px-2 text-[#4A4A4A]">
          {group}
        </span>
      </div>
      <div className="mt-3">
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-xs line-clamp-2 text-gray-800">{detail}</p>

        <div className="mt-5 text-[#939494] text-xs flex gap-x-2 items-center">
          <ChatBubbleOvalLeftIcon className="size-4" />
          <span>{commentsNo}</span>
          <span>Comments</span>
        </div>
      </div>
    </div>
  );
};

export default BlogCardComponent;
