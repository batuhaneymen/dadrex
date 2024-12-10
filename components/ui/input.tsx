"use client";

import React from "react";
import { InputProps } from "@/types"; // index.d.ts dosyasından import ediyoruz

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => (
  <input
    ref={ref}
    className="border rounded-md p-2 text-sm w-full focus:ring focus:ring-primary"
    {...props}
  />
));

Input.displayName = "Input";
