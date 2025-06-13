"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Monitor } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
      >
        {theme === "light" ? (
          <Sun className="h-5 w-5" />
        ) : theme === "dark" ? (
          <Moon className="h-5 w-5" />
        ) : (
          <Monitor className="h-5 w-5" />
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-2 w-40"
          >
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                className="flex justify-start items-center gap-2 w-full"
                onClick={() => {
                  setTheme("light")
                  setIsOpen(false)
                }}
              >
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </Button>
              <Button
                variant="ghost"
                className="flex justify-start items-center gap-2 w-full"
                onClick={() => {
                  setTheme("dark")
                  setIsOpen(false)
                }}
              >
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </Button>
              <Button
                variant="ghost"
                className="flex justify-start items-center gap-2 w-full"
                onClick={() => {
                  setTheme("system")
                  setIsOpen(false)
                }}
              >
                <Monitor className="h-4 w-4" />
                <span>System</span>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
