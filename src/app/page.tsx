import React from "react";

const Login = () => {
  return (
    <div className="flex md:flex-wrap  h-screen bg-[#243831]">
      <div className="w-1/2 text-white flex justify-center items-center">
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">Sign in</h1>
          <input
            className="px-3 py-2 rounded-lg bg-white w-[400px] mt-5 text-gray-700"
            placeholder="Username"
          />
          <button className="bg-[#49A569] mt-5 py-2 rounded-lg">Sign In</button>
        </div>
      </div>
      <div className="bg-[#2B5F44] w-1/2 rounded-3xl flex justify-center items-center">
        <div className="text-center">
          <img
            className="w-[300px]"
            src="https://s3-alpha-sig.figma.com/img/0fbc/43f4/9761bea793b24e9f6af1620580a39d2f?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=QIPpaKhki0fKA69vj2Rpmsu5wYFzg~4QzPM7vxmTq7JZbKTmwFhctglNVEQCSnYu-2xyUas7BFmvEMgiL55qV0jFV50XIQCmx1neweMKGjw-UjeQrIU3qC35-MTxshoAMg02WN0ceLWsbo1yjLW0raa0gg6ZhW-Swh3rvwyThtxRAkKRSMsJlPXZH2hAJUCDjFd54hRMZ4IBTvgG0-vI7qjkpfKe8fgZ5nJQ0jnvENSbvPLhodonNxzd24NQzJGmMxFFVcQSNLIMaTA4QVoQkCG875K2v160SEazvmwZRfbu~N3jsiiaUfNCMpnSc3nZnXMeNh41OxH3uQMjBGwiTw__"
          />
          <h2 className="text-white mt-3">a Board</h2>
        </div>
      </div>
    </div>
  );
};

export default Login;
