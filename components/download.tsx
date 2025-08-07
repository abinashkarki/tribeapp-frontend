"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AppleIcon } from "@/components/ui/icons"
import { AutoPlayVideo } from "@/components/ui/auto-play-video"

export function Download() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const videoSrc = "/videos/create-tribe-cropped.mp4"

  const videoSources = [
    { src: "/videos/create-tribe-cropped.webm", type: "video/webm" },
    { src: "/videos/create-tribe-cropped.mp4", type: "video/mp4" },
  ]

  return (
    <section className="py-20 bg-linear-to-b from-black to-purple-950 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.png')] bg-center opacity-10"></div>
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-6xl font-bold mb-6 text-white">KickStart your tribe today!</h2>
            <p className="text-xl text-white/70 mb-8">
              Download TribeBills today and make shared expenses stress-free.
            </p>

            <a 
              href="https://apps.apple.com/us/app/tribebills/id6746392287"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="bg-white hover:bg-gray-100 active:scale-95 text-purple-600 text-lg px-8 py-6 rounded-full flex items-center gap-2 transition-transform">
                <AppleIcon className="w-6 h-6" />
                <span>Download on the App Store</span>
              </Button>
            </a>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative max-w-md mx-auto">
              {/* Video container with cropped bottom */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-linear-to-br from-zinc-900 to-black">
                <div className="relative overflow-hidden aspect-video">
                  <AutoPlayVideo
                    sources={videoSources}
                    aspectRatio="aspect-video"
                  />
                </div>

                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Background glow effect */}
              <div className="absolute -inset-10 bg-linear-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
