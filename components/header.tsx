"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/marketing-ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/images/tribebills-logo.webp" width={40} height={40} alt="TribeBills Logo" className="w-10 h-10" />
          <span className="text-2xl font-bold text-white">TribeBills</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-8 items-center">
            <li>
              <Link href="#features" className="font-medium text-white/80 hover:text-white transition-colors">
                Features
              </Link>
            </li>
            <li>
              <Link href="#how-it-works" className="font-medium text-white/80 hover:text-white transition-colors">
                How It Works
              </Link>
            </li>
            <li>
              <a 
                href="https://apps.apple.com/us/app/tribebills/id6746392287"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="bg-purple-600 hover:bg-purple-700 active:scale-95 text-white rounded-full px-6 transition-transform">Download</Button>
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle menu"
            className="w-12 h-12 active:scale-95 transition-transform"
          >
            {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    href="#features"
                    className="block py-2 font-medium text-white/80 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#how-it-works"
                    className="block py-2 font-medium text-white/80 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    How It Works
                  </Link>
                </li>
                <li className="py-2">
                  <a 
                    href="https://apps.apple.com/us/app/tribebills/id6746392287"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block w-full"
                  >
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700 active:scale-95 text-white rounded-full transition-transform"
                      onClick={() => setIsOpen(false)}
                    >
                      Download
                    </Button>
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
