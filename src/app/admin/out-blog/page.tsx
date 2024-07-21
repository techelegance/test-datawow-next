"use client";

import React, { useEffect, useState } from "react";
import LayoutAdminComponent from "@/components/admin/layout";
import BlogComponent from "@/components/admin/blog";
import { useQuery } from "@tanstack/react-query";
import DialogCreatePostComponent from "@/components/admin/dialog/dialogCreatePost";
import DialogDeletePostComponent from "@/components/admin/dialog/dialogDeletePost";
import DialogUpdatePostComponent from "@/components/admin/dialog/dialogUpdatePost";
import axios from "axios";
import { useProfileStore } from "@/store/auth/profile";

const OutBlogPage = () => {
  const profile = useProfileStore((state) => state.data);

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["authorDatabyUserID", profile?.id],
    queryFn: () =>
      axios
        .get(`http://localhost:3000/post/author/${profile?.id}`)
        .then((res) => res.data),
  });

  return (
    <LayoutAdminComponent>
      <BlogComponent editor={true} data={data} isLoading={isLoading} />
      <DialogCreatePostComponent refetch={refetch} />
      <DialogUpdatePostComponent refetch={refetch} />
      <DialogDeletePostComponent refetch={refetch} />
    </LayoutAdminComponent>
  );
};

export default OutBlogPage;
