"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTokenStore } from "@/store/auth/token";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const setToken = useTokenStore((state) => state.update);
  type Inputs = {
    email: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await axios
      .post("http://localhost:3000/auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res?.data?.access_token);
        setToken(res?.data?.access_token);
        toast.success('Login Success');
        return router.push("/admin/home", { scroll: false });
      })
      .catch((err) => {
        toast.error(err?.response?.statusText);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="md:flex md:flex-row-reverse grid h-screen bg-[#243831]">
        <div className="bg-[#2B5F44] md:w-1/2 h-full md:h-full md:rounded-l-3xl rounded-b-3xl flex justify-center items-center">
          <div className="text-center">
            <img
              className="w-[150px] md:w-[300px]"
              src="https://s3-alpha-sig.figma.com/img/0fbc/43f4/9761bea793b24e9f6af1620580a39d2f?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QIPpaKhki0fKA69vj2Rpmsu5wYFzg~4QzPM7vxmTq7JZbKTmwFhctglNVEQCSnYu-2xyUas7BFmvEMgiL55qV0jFV50XIQCmx1neweMKGjw-UjeQrIU3qC35-MTxshoAMg02WN0ceLWsbo1yjLW0raa0gg6ZhW-Swh3rvwyThtxRAkKRSMsJlPXZH2hAJUCDjFd54hRMZ4IBTvgG0-vI7qjkpfKe8fgZ5nJQ0jnvENSbvPLhodonNxzd24NQzJGmMxFFVcQSNLIMaTA4QVoQkCG875K2v160SEazvmwZRfbu~N3jsiiaUfNCMpnSc3nZnXMeNh41OxH3uQMjBGwiTw__"
            />
            <h2 className="text-white mt-3">a Board</h2>
          </div>
        </div>
        <div className="md:w-1/2 text-white flex justify-center items-center">
          <div className="flex flex-col w-full px-7 md:px-3 md:w-[400px]">
            <h1 className="text-lg font-semibold">Sign in</h1>
            <input
              {...register("email", { required: true })}
              className="px-3 py-2 rounded-lg bg-white mt-5 text-gray-700"
              placeholder="Username"
            />
            <button
              type="submit"
              className="bg-[#49A569] hover:bg-green-600 mt-5 py-2 rounded-lg"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
