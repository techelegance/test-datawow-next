"use client";

import React, { useState } from "react";
import BlogCardComponent from "@/components/common/blogcard";
import SearchComponent from "@/components/common/search";
import dayjs from "dayjs";

const BlogComponent = ({ editor = false, navigate = false, data = [] }) => {
  return (
    <main className="md:w-3/4 w-full h-full py-10 pr-52">
      <SearchComponent />
      <section className="bg-white rounded-lg mt-5 py-5 grid gap-y-3">
        {data.length > 0 &&
          data
            ?.sort(
              (a: any, b: any) =>
                dayjs(b?.createdAt) - dayjs(a?.createdAt)
            )
            .map((item: any, index: number) => (
              <div key={index}>
                <div className="px-4">
                  <BlogCardComponent
                    path={navigate ? `/admin/post-detail/${item?.id}` : null}
                    title={item?.title}
                    detail={item?.content}
                    commentsNo={item?.comments?.length}
                    editor={editor}
                    group={item?.group?.title}
                    name={item?.author?.name}
                    // date={item?.createdAt}
                  />
                </div>
                {index + 1 !== data?.length && <hr className="mt-5" />}
              </div>
            ))}
      </section>
    </main>
  );
};

export default BlogComponent;
