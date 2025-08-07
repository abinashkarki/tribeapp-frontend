"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/marketing-ui/button"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-purple-900/20 via-black to-black"></div>
        <div className="absolute inset-0 bg-[url('/grid.png')] bg-center mask-[radial-gradient(ellipse_at_center,transparent_20%,black_75%)]"></div>
      </div>

      <div className="container mx-auto px-4 xs:px-3 relative">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div
            className="lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-purple-500">Tribe</span> is the <span className="text-pink-500">vibe</span>
              <br />
              and settled <span className="text-orange-500">bills</span>
              <br />
              keeps it <span className="text-green-500">alive</span>.
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
              Split expenses with friends without the awkward money talk. Scan, split, and settle up in seconds.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="https://apps.apple.com/us/app/tribebills/id6746392287"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 active:scale-95 text-white text-lg px-8 py-6 rounded-full flex items-center gap-2 group shadow-lg shadow-purple-500/25 transition-transform">
                  <span>Download Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative max-w-2xl mx-auto">
              {/* Main image container */}
              <div className="relative">
                <motion.div
                  className="relative w-full aspect-9/16 xs:aspect-[9/12] lg:h-[700px]"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src="/images/theme.webp"
                    alt="TribeBills - Friends gathering around a campfire representing community and shared experiences"
                    fill
                    className="object-contain"
                    sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 700px"
                    priority
                  />
                </motion.div>
              </div>

              {/* Background glow effect - more subtle */}
              <div className="absolute -inset-20 bg-linear-to-r from-orange-500/10 to-yellow-500/10 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
