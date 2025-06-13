"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ContactForm } from "./contact-form"
import { ContactInfo } from "./contact-info"

export function ContactUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section id="contact" className="py-20 bg-zinc-900 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.png')] bg-center opacity-10"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-4 text-white">
            Get in Touch
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Have questions about TribeBills? We're here to help you make expense sharing effortless.
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Contact Form - Takes up more space */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-zinc-800/50 shadow-2xl">
                <ContactForm />
              </div>
            </motion.div>

            {/* Contact Info - Complementary sidebar */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-zinc-800/50 shadow-2xl min-h-[200px] h-full">
                <ContactInfo />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-white/60 text-sm">
            Your tribe is waiting. Ready to make expense sharing effortless?
          </p>
          <a 
            href="https://apps.apple.com/us/app/tribebills/id6746392287"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium cursor-pointer mt-2"
          >
            <span>Download TribeBills today</span>
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  )
} 