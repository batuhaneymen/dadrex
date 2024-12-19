"use client";

import React, { ReactNode } from "react";

interface DialogProps {
  open: boolean;
  children: ReactNode;
}

export function Dialog({ open, children }: DialogProps) {
  if (!open) return null;
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">{children}</div>;
}

export function DialogContent({ children }: { children: ReactNode }) {
  return <div className="bg-white rounded-lg shadow-md p-6">{children}</div>;
}

export function DialogHeader({ children }: { children: ReactNode }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

export function DialogDescription({ children }: { children: ReactNode }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}