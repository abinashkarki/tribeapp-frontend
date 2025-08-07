"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/marketing-ui/button"
import { Smartphone, ArrowRight, Users, DollarSign, CheckCircle } from "lucide-react"

export function Cta() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <section
      className="py-20 bg-linear-to-r from-purple-700 to-purple-900 dark:from-purple-900 dark:to-purple-800 text-white relative overflow-hidden"
      ref={ref}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-full h-full opacity-5" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Keep the Good Vibes Going?</h2>
            <p className="text-xl text-purple-100 mb-8">
              Download TribeBills today and make shared expenses stress-free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://apps.apple.com/us/app/tribebills/id6746392287"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Button className="bg-orange-500 hover:bg-orange-600 active:scale-95 text-white flex items-center gap-2 group shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition-all duration-300">
                  <Smartphone className="w-5 h-5" />
                  <span>Download for iOS</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
            </div>

            {/* App Store Badge */}
            <div className="flex flex-wrap gap-4 mt-8">
              <a 
                href="https://apps.apple.com/us/app/tribebills/id6746392287"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-900 active:scale-95 transition-all cursor-pointer">
                  <Smartphone className="w-5 h-5" />
                  <div>
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Animated Concept Illustration */}
            <div className="relative h-[500px] max-w-xs mx-auto">
              {/* Central App Concept */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-40 bg-linear-to-br from-purple-600 to-pink-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center z-20"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  ease: "easeInOut",
                }}
              >
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-1">TB</div>
                  <div className="text-xs opacity-80">TribeBills</div>
                </div>
              </motion.div>

              {/* Floating Feature Icons */}
              <motion.div
                className="absolute top-10 -left-10 w-20 h-20 bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-700 z-10 opacity-90"
                animate={{
                  y: [0, 10, 0],
                  rotate: [-5, -7, -5],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 6,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                <div className="p-4 text-center">
                  <Users className="w-8 h-8 text-purple-400 mx-auto mb-1" />
                  <div className="text-xs text-white">Groups</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute top-10 -right-10 w-20 h-20 bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-700 z-10 opacity-90"
                animate={{
                  y: [0, 15, 0],
                  rotate: [5, 8, 5],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 7,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <div className="p-4 text-center">
                  <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-1" />
                  <div className="text-xs text-white">Split</div>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-10 left-0 w-20 h-20 bg-zinc-900 rounded-2xl shadow-xl overflow-hidden border border-zinc-700 z-10 opacity-90"
                animate={{
                  y: [0, -8, 0],
                  rotate: [-3, -5, -3],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 8,
                  ease: "easeInOut",
                  delay: 2,
                }}
              >
                <div className="p-4 text-center">
                  <CheckCircle className="w-8 h-8 text-orange-400 mx-auto mb-1" />
                  <div className="text-xs text-white">Settle</div>
                </div>
              </motion.div>

              {/* Connection Lines */}
              {[
                { from: "top-1/2 left-1/2", to: "top-20 left-0", delay: 0 },
                { from: "top-1/2 left-1/2", to: "top-20 right-0", delay: 0.5 },
                { from: "top-1/2 left-1/2", to: "bottom-20 left-10", delay: 1 },
              ].map((line, index) => (
                <motion.div
                  key={index}
                  className="absolute w-px h-20 bg-linear-to-b from-purple-400 to-transparent"
                  style={{
                    top: "50%",
                    left: "50%",
                    transformOrigin: "top",
                    transform: `translate(-50%, -50%) rotate(${index * 45 - 45}deg)`,
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={isInView ? { scaleY: 1, opacity: 0.6 } : { scaleY: 0, opacity: 0 }}
                  transition={{ delay: line.delay + 1, duration: 0.8 }}
                />
              ))}

              {/* Floating Elements */}
              <motion.div
                className="absolute top-10 right-0 w-12 h-12 bg-orange-400 rounded-full opacity-30"
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                }}
              />
              <motion.div
                className="absolute bottom-20 left-0 w-16 h-16 bg-purple-400 rounded-full opacity-30"
                animate={{
                  y: [0, 20, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
