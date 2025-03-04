import React, { useEffect } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useTokenStore } from "@/store/auth/token";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useProfileStore } from "@/store/auth/profile";
import { useRouter } from "next/navigation";
import { useNavbarMoblieStore } from "@/store/navbar/moblie";

const HeaderComponent = () => {
  const router = useRouter();
  const token = useTokenStore((state) => state.data);
  const setProfile = useProfileStore((state) => state.update);
  const profileData = useProfileStore((state) => state.data);
  const setNavbar = useNavbarMoblieStore((state) => state.update);

  const {
    isLoading,
    error,
    data: profile,
  } = useQuery({
    queryKey: ["ProfileData"],
    queryFn: () =>
      axios.get("http://localhost:3000/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
  });

  useEffect(() => {
    setProfile(profile?.data);
  }, [profile]);

  return (
    <header className="bg-[#243831] grid grid-cols-2 px-5 py-2">
      <div>
        <h1 className="text-lg text-white">a Board</h1>
      </div>
      <div className="flex flex-row-reverse items-center gap-x-2">
        {profileData ? (
          <div className="hidden md:flex flex-row-reverse items-center gap-x-2">
            <img
              src="https://s3-alpha-sig.figma.com/img/67da/9fdd/d372b1b5b44ffef41eed6ceb810ddf8a?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i9QMaml8Q5mejqhHhJkMco0Z9YZHSc4M4Po8IgTl5U1ykThCoFe3vgHjR7WdCTOfdz2bRpXLf9YHrjqOipA4OqaVqZuqM6798fu67WyecYJcEcLfd8OrZknoOdjlxBUTHUXyzikR5NcWpwUaT~WT7RMU0kf3O5N-jsM3AIFUSt6m0Ho2GgSz07wfc1ngQUb~sZ2p1rasFZde8gb7vHHFXbE65EsGBuNHzsIL-YpvkPpA682-vcwOjSYsnseJU3~VK9IE6ArMKXihQx54zT9ltMOM5in9WHCmKdui~UTSSq85hZ1IgFJyyu5VZm8YXInsVqliHyyTvfWMTB7iV6BIdw__"
              className="w-7 h-7 rounded-full"
            />
            <span className="text-white text-xs">{profileData?.name}</span>
          </div>
        ) : (
          <button
            onClick={() => router.push("/")}
            className="bg-[#49A569] hover:bg-green-600 py-1 px-3 rounded-lg text-white text-xs md:block hidden"
          >
            Sign In
          </button>
        )}
        <button onClick={() => setNavbar(true)}>
          <Bars3Icon className="size-7 text-white md:hidden block" />
        </button>
      </div>
    </header>
  );
};

export default HeaderComponent;
