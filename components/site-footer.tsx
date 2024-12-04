import * as React from "react"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
    return (
        <footer className={cn(className)}>
            <div className="mx-auto px-4 sm:px-8 flex flex-col items-center justify-between gap-4 py-10 md:h-20 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0 fill-white ">
                    <p className="text-center text-sm leading-loose md:text-left">
                        Follow us{" "}
                        <a
                            href={siteConfig.links.twitter}
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            Runex
                        </a>
                        .
                    </p>
                </div>
            </div>
        </footer>
    )
}