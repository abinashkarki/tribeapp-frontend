"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronLeft, Star } from "lucide-react"
import { Button } from "@/components/marketing-ui/button"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Roommate",
    quote:
      "TribeBills has completely eliminated the awkward money conversations with my roommates. We just scan, split, and settle up without any drama.",
    stars: 5,
  },
  {
    name: "Jamie Smith",
    role: "Trip Organizer",
    quote:
      "I used to dread organizing group trips because of the expense tracking. Now I just create a tribe for each trip and everything is crystal clear.",
    stars: 5,
  },
  {
    name: "Taylor Williams",
    role: "Dinner Club Member",
    quote:
      "Our weekly dinner club used to be a nightmare to track who paid what. TribeBills has made it so simple that we actually enjoy settling up now.",
    stars: 4,
  },
  {
    name: "Morgan Lee",
    role: "College Student",
    quote:
      "As a college student sharing expenses with friends, this app has been a lifesaver. The receipt scanning feature is incredibly accurate!",
    stars: 5,
  },
]

export function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section id="testimonials" className="py-20 bg-black relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.png')] bg-center opacity-20"></div>

        <motion.div
          className="absolute top-1/4 right-1/3 w-64 h-64 rounded-full bg-green-600/10 blur-3xl"
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
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
          <h2 className="text-3xl md:text-6xl font-bold mb-4 text-white">What People Are Saying</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Join thousands of happy users who have simplified their shared expenses.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-900 rounded-3xl p-8 md:p-12 border border-zinc-800"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="flex mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < testimonials[currentIndex].stars ? "text-yellow-500 fill-yellow-500" : "text-zinc-700"
                        }`}
                      />
                    ))}
                  </div>

                  <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 relative">
                    <span className="absolute -top-10 -left-4 text-6xl text-purple-600 opacity-50">"</span>
                    {testimonials[currentIndex].quote}
                    <span className="absolute -bottom-10 -right-4 text-6xl text-purple-600 opacity-50">"</span>
                  </blockquote>

                  <div>
                    <div className="text-xl font-bold text-white">{testimonials[currentIndex].name}</div>
                    <div className="text-purple-400">{testimonials[currentIndex].role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 gap-4">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-zinc-700 hover:bg-zinc-800"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentIndex === index ? "bg-white w-6" : "bg-zinc-700 hover:bg-zinc-600"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-zinc-700 hover:bg-zinc-800"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
