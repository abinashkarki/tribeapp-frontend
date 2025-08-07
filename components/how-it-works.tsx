"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Users, Camera, CheckCircle } from "lucide-react"
import Image from "next/image"

const steps = [
  {
    number: "01",
    title: "Create Your Tribe",
    description:
      "Set up a group for your housemates, friends, or any shared expense scenario. Invite members using a unique tribe code and start your journey together.",
    color: "from-purple-600 to-pink-600",
    icon: <Users className="w-6 h-6" />,
    imageSrc: "/marketing/images/tribal-gathering.webp",
    imageAlt: "Tribal gathering around a campfire representing creating your tribe",
  },
  {
    number: "02",
    title: "Scan and Split",
    description:
      "Take a photo of your receipt and let Smart Scan technology automatically extract all the details. Then instantly split the bill among your tribe members - equally or by custom amounts.",
    color: "from-pink-600 to-orange-600",
    icon: <Camera className="w-6 h-6" />,
    imageSrc: "/marketing/images/scan-and-split.webp",
    imageAlt: "Person scanning a receipt with phone while tribe members gather around campfire",
  },
  {
    number: "03",
    title: "Settle Up",
    description:
      "Pay your share through your preferred payment method (outside the app), then record the settlement in TribeBills. Keep track of who's paid and maintain harmony in your tribe.",
    color: "from-orange-600 to-green-600",
    icon: <CheckCircle className="w-6 h-6" />,
    imageSrc: "/marketing/images/settle-up.webp",
    imageAlt: "Tribe members contributing coins to a shared pot representing settling up payments",
  },
]

interface StepCardProps {
  step: typeof steps[0]
  index: number
  isInView: boolean
}

const StepCard = ({ step, index, isInView }: StepCardProps) => {
  const cardVariants = {
    primary: "border-purple-500/30 bg-linear-to-br from-purple-900/20 to-zinc-900/40",
    secondary: "border-zinc-700/50 bg-linear-to-br from-zinc-900/40 to-zinc-800/20"
  }

  return (
    <motion.div
      className={`
        relative backdrop-blur-xs rounded-3xl p-6 md:p-8 border
        shadow-2xl hover:shadow-purple-500/10 transition-all duration-300
        group cursor-pointer
        ${index === 1 ? cardVariants.primary : cardVariants.secondary}
      `}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ 
        y: -8, 
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      {/* Step Header */}
      <div className="flex items-center gap-4 mb-6">
        <motion.div 
          className={`
            w-16 h-16 rounded-2xl bg-linear-to-br ${step.color} 
            flex items-center justify-center shadow-lg
          `}
          whileHover={{ 
            scale: 1.1,
            transition: { duration: 0.2 }
          }}
        >
          <span className="text-white text-2xl font-bold">{step.number}</span>
        </motion.div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-white/90 transition-colors duration-300">
            {step.title}
          </h3>
          <div className="flex items-center gap-2 text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">
            {step.icon}
            <span>Step {step.number}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-white/70 text-lg leading-relaxed mb-2 group-hover:text-white/80 transition-colors duration-300">
        {step.description}
      </p>

      {/* Image */}
      <div className="relative">
        {/* Glow effect */}
        <div className={`absolute -inset-4 bg-linear-to-r ${step.color} opacity-10 group-hover:opacity-20 rounded-full blur-3xl -z-10 transition-opacity duration-300`} />
        
        {/* Image flowing naturally in card */}
        <motion.div 
          className="relative aspect-4/3 -mx-6 md:-mx-8 -mb-6 md:-mb-8 mt-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Image
            src={step.imageSrc || "/placeholder.svg"}
            alt={step.imageAlt}
            fill
            className="object-contain"
            sizes="(max-width: 480px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <motion.div 
          className={`w-12 h-1 rounded-full bg-linear-to-r ${step.color} shadow-lg`}
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: index * 0.2 + 0.4 }}
          whileHover={{ 
            boxShadow: `0 0 20px rgba(147, 51, 234, 0.5)`,
            transition: { duration: 0.2 }
          }}
        />
      </div>
    </motion.div>
  )
}

export function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="how-it-works" className="py-20 bg-zinc-900 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.png')] bg-center opacity-10"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 xs:px-3 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-4 text-white">How It Works</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            TribeBills streamlines the entire process of managing shared expenses in just three simple steps.
          </p>
        </motion.div>

        {/* Compact Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12 max-w-7xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className={index === 1 ? "md:col-span-2 xl:col-span-1" : ""}>
              <StepCard step={step} index={index} isInView={isInView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
