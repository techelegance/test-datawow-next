"use client";

import React, { useState } from "react";
import LayoutAdminComponent from "@/components/admin/layout";
import BlogComponent from "@/components/admin/blog";
import { useQuery } from "@tanstack/react-query";

const BoardPage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('http://localhost:3000/post/author/1').then((res) =>
        res.json(),
      ),
  })

  // console.log(data)

  return (
    <LayoutAdminComponent>
      <BlogComponent editor={true} data={data}/>
    </LayoutAdminComponent>
  );
};

export default BoardPage;
