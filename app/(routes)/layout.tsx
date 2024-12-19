import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { marketingConfig } from "@/config/marketing";
// import { ModeToggle } from "@/components/mode-toggle";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="z-40 border-b border-border">
        <div className="mx-auto flex h-20 items-center justify-between py-6 sm:px-8 px-2">
          <MainNav items={marketingConfig.mainNav} />
          <div className="flex flex-row items-center space-x-4">
            {/* <ModeToggle /> */}
          </div>
        </div>
      </header>
      <main className="flex-1 overflow-y-auto">{children}</main>
      <footer className="">
        <SiteFooter />
      </footer>
    </div>
  );
}