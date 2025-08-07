"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Clock, MessageCircle, Phone } from "lucide-react"
import { Button } from "@/components/marketing-ui/button"

const contactMethods = [
  {
    icon: <Mail className="w-5 h-5" />,
    title: "Email",
    description: "karkiabinash777@gmail.com",
    action: "mailto:karkiabinash777@gmail.com",
    actionText: "Send Email",
  },
  {
    icon: <MapPin className="w-5 h-5" />,
    title: "Address",
    description: "6-8 Station St, Guildford 2161 NSW, Australia",
    action: "https://maps.google.com/?q=6-8+Station+St,+Guildford+2161+NSW,+Australia",
    actionText: "View on Map",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Response Time",
    description: "We typically respond within 24 hours during business days",
    action: null,
    actionText: null,
  },
]

const quickHelp = [
  {
    title: "Frequently Asked Questions",
    description: "Find answers to common questions about TribeBills",
    link: "#faq",
  },
  {
    title: "Privacy Policy",
    description: "Learn how we protect your data",
    link: "/privacy",
  },
  {
    title: "Terms of Service",
    description: "Read our terms and conditions",
    link: "/terms",
  },
]

export function ContactInfo() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h3 className="text-2xl font-bold text-white mb-2">Need Quick Help?</h3>
        <p className="text-white/70">
          Check out these resources for instant answers to common questions.
        </p>
      </div>

      {/* Quick Help Section */}
      <div className="bg-linear-to-br from-purple-900/20 to-pink-900/20 rounded-xl p-6 border border-purple-500/20">
        <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Quick Help
        </h4>
        <div className="space-y-3">
          {quickHelp.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className="block group"
            >
              <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 shrink-0"></div>
                <div>
                  <h5 className="text-white font-medium text-sm group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h5>
                  <p className="text-white/60 text-xs mt-1">{item.description}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Business Hours Notice */}
      <div className="bg-zinc-800/30 rounded-lg p-4 border border-zinc-700/30">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <div>
            <p className="text-white text-sm font-medium">We're here to help</p>
            <p className="text-white/60 text-xs">
              Monitoring messages regularly • Response within 24 hours
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 