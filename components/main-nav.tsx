"use client"
import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"
import { MainNavItem } from "@/types"
import { cn } from "@/lib/utils"
import { X } from 'lucide-react'
import { Separator } from "./ui/separator"
import { MobileNav } from "./mobile-nav"
import { Icons } from "./icons"
interface MainNavProps {
  items?: MainNavItem[]
  children?: React.ReactNode
}
export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="hidden items-center space-x-2 md:flex">
      </Link>
      {items?.length ? (
        <nav className={cn("hidden gap-6 md:flex",
        )}>
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-xl font-medium transition-colors hover:text-foreground/80 font-heading",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu
          ?
          <X />
          :
          <Icons.menu />
        }
        <Separator orientation="vertical" />
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  )
}