"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

type FaqItem = {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is TribeBills and why should I use it?",
    answer:
      "TribeBills is the smartest way to split expenses with your friends, roommates, or travel groups. Instead of awkward money conversations and confusing spreadsheets, you simply scan receipts, split costs instantly, and track who owes what. It eliminates the stress and keeps your relationships drama-free.",
  },
  {
    question: "Do I need an account to get started?",
    answer:
      "You can join bills as a guest using just your name, but creating a free account unlocks the full experience. With an account, you can create your own tribes, access your complete payment history, and sync across all your devices. Sign up takes just 30 seconds with email, Google, or Apple.",
  },
  {
    question: "How do I join my friends' tribe?",
    answer:
      "Super easy! Your friend shares a unique tribe code with you, you enter it in the app, and you're instantly connected. No complicated setup, no friend requests - just enter the code and start splitting expenses together.",
  },
  {
    question: "How does Smart Scan work?",
    answer:
      "Just snap a photo of any receipt and our AI instantly extracts the restaurant name, total amount, date, and individual items. No more manual typing or math errors. The technology is incredibly accurate, but you can always review and adjust before splitting the bill.",
  },
  {
    question: "Is settling payments actually easy?",
    answer:
      "When you owe money, just tap 'Settle Split', confirm the amount, and mark it as paid. TribeBills tracks everything automatically so everyone knows who's paid and who hasn't. You handle the actual payment however you prefer - Venmo, cash, bank transfer, whatever works for your group.",
  },
  {
    question: "How secure is my financial information?",
    answer:
      "Your data is completely secure. We never store your bank details or process actual payments - we only track who owes what. All data is encrypted, stored securely in the cloud, and you can export or delete everything anytime. We're a tracking tool, not a payment processor, which keeps your financial info safe.",
  },
  {
    question: "Which platforms is TribeBills available on?",
    answer:
      "TribeBills is currently available on iOS devices through the App Store. We're actively working on web and Android versions that will be coming soon. Stay tuned for updates on our website and social media channels for when these platforms become available.",
  },
]

type FaqItemProps = {
  faq: FaqItem;
  index: number;
  isOpen: boolean;
  toggleOpen: () => void;
}

function FaqItem({ faq, index, isOpen, toggleOpen }: FaqItemProps) {
  return (
    <motion.div
      className="border-b border-zinc-800 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <button
        className="flex justify-between items-center w-full py-6 text-left group"
        onClick={toggleOpen}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors pr-4">
          {faq.question}
        </h3>
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-purple-600 transition-colors flex items-center justify-center">
            {isOpen ? <ChevronUp className="w-4 h-4 text-white" /> : <ChevronDown className="w-4 h-4 text-white" />}
          </div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/80 text-lg leading-relaxed">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function Faq() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 bg-zinc-900 relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.png')] bg-center opacity-10"></div>

        <motion.div
          className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full bg-orange-600/10 blur-3xl"
          animate={{
            x: [0, -50, 50, 0],
            y: [0, 50, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Everything you need to know about splitting expenses with TribeBills.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-black rounded-2xl border border-zinc-800 p-8 md:p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                toggleOpen={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
