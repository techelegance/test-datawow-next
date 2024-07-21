import React from "react";
import clsx from "clsx";

const ButtonComponent = ({
  children,
  onClick,
  type,
  style = "solid",
  id,
}: {
  children: React.ReactNode;
  onClick?: any;
  type?: "button" | "submit" | "reset" | undefined;
  style?: "outline" | "solid";
  id?: string;
}) => {
  return (
    <button
      id={id}
      onClick={onClick}
      type={type}
      className={clsx({
        "py-1 px-4 rounded-lg md:w-[100px] w-full": true,
        "border border-[#49A569] text-[#49A569] hover:bg-green-700 hover:text-white":
          style === "outline",
        "bg-[#49A569] text-white hover:bg-green-700 hover:text-white":
          style === "solid",
      })}
    >
      <span className="text-sm">{children}</span>
    </button>
  );
};

export default ButtonComponent;
