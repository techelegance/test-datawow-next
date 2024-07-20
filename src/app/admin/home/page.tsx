"use client";

import React, { useState } from "react";
import LayoutAdminComponent from "@/components/admin/layout";
import BlogComponent from "@/components/admin/blog";
import { useQuery } from "@tanstack/react-query";
import DialogCreatePostComponent from "@/components/admin/dialog/dialogCreatePost";

const BoardPage = () => {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["PostData"],
    queryFn: () =>
      fetch("http://localhost:3000/post").then((res) => res.json()),
  });

  return (
    <LayoutAdminComponent>
      <BlogComponent navigate data={data} />
      <DialogCreatePostComponent refetch={refetch} isLoading={isLoading} />
    </LayoutAdminComponent>
  );
};

export default BoardPage;
