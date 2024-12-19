"use client";

import * as React from "react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { Icons } from "./icons";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const handleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 px-0"
      onClick={handleTheme}
    >
      <Icons.sun
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        size={20}
      />
      <Icons.moon
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        size={20}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}