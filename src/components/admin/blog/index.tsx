"use client";

import React, { useEffect, useState } from "react";
import BlogCardComponent from "@/components/common/blogcard";
import SearchComponent from "@/components/common/search";
import { DateTime } from "luxon";

const BlogComponent = ({
  editor = false,
  navigate = false,
  isLoading = false,
  data = [],
}) => {
  const [search, setSearch] = useState<string>("");
  const [group, setGroup] = useState<any>();
  // console.log({ group });
  return (
    <main className="md:w-3/4 w-full h-full py-10 md:pr-52 px-2">
      <SearchComponent
        search={search}
        setSearch={setSearch}
        setGroup={setGroup}
      />
      <section className="bg-white rounded-lg mt-5 py-5 grid gap-y-3">
        {data.length > 0 &&
          data
            ?.filter((item: any) =>
              group ? item?.group?.title === group?.title : true
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
                    id={item?.id}
                    search={search}
                    // date={item?.createdAt}
                  />
                </div>
                {index + 1 !==
                  data?.filter((item: any) =>
                    group ? item?.group?.title === group?.title : true
                  )?.length && <hr className="mt-5" />}
              </div>
            ))}
      </section>
    </main>
  );
};

export default BlogComponent;
