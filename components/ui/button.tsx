"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types";

export function Button({
  className,
  variant = "default",
  size = "medium",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
        // Variant colors
        variant === "default" && "bg-gray-200 text-black hover:bg-gray-300",
        variant === "primary" && "bg-blue-500 text-white hover:bg-blue-600",
        variant === "secondary" && "bg-gray-500 text-white hover:bg-gray-600",
        variant === "danger" && "bg-red-500 text-white hover:bg-red-600",
        // Sizes
        size === "small" && "px-3 py-1 text-sm",
        size === "medium" && "px-4 py-2 text-base",
        size === "large" && "px-6 py-3 text-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
