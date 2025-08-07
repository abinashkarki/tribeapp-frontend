"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Camera, DollarSign, BarChart3, RefreshCw, Users, Lock } from "lucide-react"
import { AutoPlayVideo } from "@/components/marketing-ui/auto-play-video"

const features = [
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Smart Scan",
    description: "Snap a photo of your receipt and our Smart Scan technology automatically extracts all the details.",
    color: "bg-purple-600",
    gradient: "from-purple-600 to-purple-700",
    benefits: ["Instant OCR", "99% Accuracy", "Any Receipt Type"],
    isHero: true, // Mark as hero feature
  },
  {
    icon: <DollarSign className="w-8 h-8" />,
    title: "Flexible Splitting",
    description: "Split costs equally, by percentage, or custom amounts. Perfect for any group situation.",
    color: "bg-pink-600",
    gradient: "from-pink-600 to-pink-700",
    benefits: ["Equal Split", "Custom Amounts", "Percentage Based"],
    isHero: false,
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Clear Tracking",
    description: "See who has paid and who still owes at a glance. No more confusion about who paid what.",
    color: "bg-blue-600",
    gradient: "from-blue-600 to-blue-700",
    benefits: ["Real-time Status", "Payment History", "Visual Dashboard"],
    isHero: false,
  },
  {
    icon: <RefreshCw className="w-8 h-8" />,
    title: "Works Offline",
    description: "Create bills even without internet. Everything syncs when you're back online.",
    color: "bg-green-600",
    gradient: "from-green-600 to-green-700",
    benefits: ["Offline Mode", "Auto Sync", "No Data Loss"],
    isHero: false,
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Multiple Tribes",
    description: "Create different groups for roommates, travel buddies, dinner friends, and more.",
    color: "bg-orange-600",
    gradient: "from-orange-600 to-orange-700",
    benefits: ["Unlimited Groups", "Easy Invites", "Role Management"],
    isHero: false,
  },
  {
    icon: <Lock className="w-8 h-8" />,
    title: "Private & Secure",
    description: "We don't process payments – just record them. Your financial data stays private.",
    color: "bg-yellow-600",
    gradient: "from-yellow-600 to-yellow-700",
    benefits: ["End-to-End Encryption", "No Payment Processing", "GDPR Compliant"],
    isHero: false,
  },
]

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const videoSrc = "/videos/takeapic-cropped.mp4"

  const videoSources = [
    { src: "/videos/takeapic-cropped.webm", type: "video/webm" },
    { src: "/videos/takeapic-cropped.mp4", type: "video/mp4" },
  ]

  return (
    <section id="features" className="py-20 bg-black relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.png')] bg-center opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 xs:px-3 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-4 text-white">Why Choose TribeBills?</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">Powerful features that are easy to use and save you time on every shared expense.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Feature Cards */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`p-6 rounded-2xl border backdrop-blur-xs transition-all duration-300 ${
                    feature.isHero
                      ? `bg-linear-to-br ${feature.gradient} border-transparent shadow-lg shadow-purple-500/25`
                      : "bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      feature.isHero ? "bg-white/20 shadow-lg" : `${feature.color} shadow-md`
                    }`}
                  >
                    {feature.icon}
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p
                    className={`text-sm mb-4 transition-colors duration-300 ${
                      feature.isHero ? "text-white/90" : "text-white/70"
                    }`}
                  >
                    {feature.description}
                  </p>

                  {/* Feature benefits */}
                  <div className="space-y-1">
                    {feature.benefits.map((benefit, benefitIndex) => (
                      <div key={benefitIndex} className="flex items-center gap-2">
                        <div
                          className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                            feature.isHero ? "bg-white/60" : "bg-purple-500"
                          }`}
                        />
                        <span
                          className={`text-xs transition-colors duration-300 ${
                            feature.isHero ? "text-white/80" : "text-white/60"
                          }`}
                        >
                          {benefit}
                        </span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Video Preview - Fixed */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-video sm:h-80 lg:h-[500px]">
              <motion.div
                className="w-full h-full"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-linear-to-br from-zinc-900 to-black">
                  {/* Video container with cropped bottom */}
                  <div className="relative overflow-hidden">
                    <AutoPlayVideo
                      sources={videoSources}
                      aspectRatio="aspect-video"
                    />
                  </div>

                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                </div>
              </motion.div>

              {/* Static glow effect */}
              <div className="absolute -inset-10 rounded-full blur-3xl -z-10 bg-linear-to-r from-purple-600/20 to-pink-600/20 opacity-20" />

              {/* Floating feature indicator for Smart Scan */}
              <motion.div
                className="absolute -top-4 -right-4 bg-black/80 backdrop-blur-xs border border-white/20 rounded-lg p-3"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                <div className="flex items-center gap-2 text-white">
                  <div className="w-3 h-3 rounded-full bg-purple-600 animate-pulse" />
                  <span className="text-sm font-medium">Smart Scan</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
