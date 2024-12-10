"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // This ensures that the component only renders on the client side
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Sunucu/istemci uyuşmazlığı yaşamamak için, tema butonunu sadece istemcide göster
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 bg-gray-200 dark:bg-gray-800 dark:text-white rounded"
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </button>
  )
}
