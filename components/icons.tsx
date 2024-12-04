import {
    ArrowBigDown,
    Check,
    Gem,
    LucideProps,
    Menu,
    Twitter,
  } from "lucide-react";

  export const Icons = {
    gem: Gem,
    menu: Menu,
  sats: ({ ...props }: LucideProps) => (
      <svg
        width="150"
        height="230"
        viewBox="0 0 150 230"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <rect x="60" width="30" height="40" rx="7.5" fill="#D9D9D9" />
        <rect x="60" y="190" width="30" height="40" rx="7.5" fill="#D9D9D9" />
        <rect
          y="130"
          width="30"
          height="150"
          rx="7.5"
          transform="rotate(-90 0 130)"
          fill="#D9D9D9"
        />
        <rect
          y="85"
          width="30"
          height="150"
          rx="7.5"
          transform="rotate(-90 0 85)"
          fill="#D9D9D9"
        />
        <rect
          y="175"
          width="30"
          height="150"
          rx="7.5"
          transform="rotate(-90 0 175)"
          fill="#D9D9D9"
        />
      </svg>
    ),
    twitter: Twitter,
    arrowDown: ArrowBigDown,
    check: Check,
  };