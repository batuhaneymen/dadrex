"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface InteractiveButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
}

export function InteractiveButton({
  onClick,
  children,
  variant = "primary",
}: InteractiveButtonProps) {
  return (
    <Button onClick={onClick} variant={variant}>
      {children}
    </Button>
  );
}
