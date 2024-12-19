import React from "react";
import classNames from "classnames";
import Image from "next/image";
import { ButtonProps } from "@/types";

export function Button({
  children,
  onClick,
  variant = "default",
  className,
  imageSrc,
  imageAlt,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "p-0 border-none bg-transparent",
        {
          "bg-white text-black hover:bg-orange-500": variant === "send",
          "bg-white text-black hover:bg-red-500": variant === "close",
        },
        className
      )}
      {...props}
    >
      {imageSrc && <Image src={imageSrc} alt={imageAlt || "Button Image"} width={50} height={50} />}
      {children}
    </button>
  );
}