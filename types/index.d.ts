import { Icons } from "@/components/icons";

export type NavItem = {
  title: string;
  href: string;
  disabled?: boolean;
};
export type MainNavItem = NavItem;
export type SidebarNavItem = {
  title: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavItem[];
    }
);
export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
    mail: string;
  };
};
export type DocsConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
};
export type MarketingConfig = {
  mainNav: MainNavItem[];
};
export type DashboardConfig = {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
  sidebarAdminNav: SidebarNavItem[];
};
export type ButtonVariant = "default" | "primary" | "secondary" | "danger" | "send" | "close";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: "small" | "medium" | "large";
  imageSrc?: string;
  imageAlt?: string;
}
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;