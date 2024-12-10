"use client";

import React, { ReactNode } from "react";

export function Form({ children }: { children: ReactNode }) {
  return <form>{children}</form>;
}

export function FormField({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function FormItem({ children }: { children: ReactNode }) {
  return <div className="mb-2">{children}</div>;
}

export function FormLabel({ children }: { children: ReactNode }) {
  return <label className="block text-sm font-medium mb-1">{children}</label>;
}

export function FormControl({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

export function FormMessage({ children }: { children: ReactNode }) {
  return <p className="text-red-500 text-sm mt-1">{children}</p>;
}
