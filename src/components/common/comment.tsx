"use client";

import React from "react";

const CommentComponent = ({
  name,
  date,
  comment,
}: {
  name: string;
  date: string;
  comment: string;
}) => {
  return (
    <div>
      <div className="flex items-center gap-x-2">
        <img
          src="https://s3-alpha-sig.figma.com/img/67da/9fdd/d372b1b5b44ffef41eed6ceb810ddf8a?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=i9QMaml8Q5mejqhHhJkMco0Z9YZHSc4M4Po8IgTl5U1ykThCoFe3vgHjR7WdCTOfdz2bRpXLf9YHrjqOipA4OqaVqZuqM6798fu67WyecYJcEcLfd8OrZknoOdjlxBUTHUXyzikR5NcWpwUaT~WT7RMU0kf3O5N-jsM3AIFUSt6m0Ho2GgSz07wfc1ngQUb~sZ2p1rasFZde8gb7vHHFXbE65EsGBuNHzsIL-YpvkPpA682-vcwOjSYsnseJU3~VK9IE6ArMKXihQx54zT9ltMOM5in9WHCmKdui~UTSSq85hZ1IgFJyyu5VZm8YXInsVqliHyyTvfWMTB7iV6BIdw__"
          className="w-7 h-7 rounded-full"
        />
        <span className="text-xs">{name}</span>
        <span className="text-xs text-[#939494]">{date}</span>
      </div>
      <div>
        <div className="text-xs ml-9 mt-2 text-[#191919]">{comment}</div>
      </div>
    </div>
  );
};

export default CommentComponent;
