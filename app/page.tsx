"use client";

import React, { useState, useEffect } from 'react'
import Link from 'next/link'; // Import Link from next/link
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Users, Receipt, CreditCard, X, Smile, Frown } from 'lucide-react'
import { Button } from "@/components/ui/button"

const HeroSection = () => {
  const [currentProblem, setCurrentProblem] = useState(0)
  const problems = [
    "Awkward money conversations?",
    "Complicated expense tracking?",
    "Not knowing who owes what?"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProblem((prev) => (prev + 1) % problems.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [problems.length]) // Add problems.length to the dependency array

  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <motion.h1 
        className="text-5xl md:text-7xl font-bold mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Say Goodbye to
      </motion.h1>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProblem}
          className="text-4xl md:text-6xl font-bold mb-8 h-20 flex items-center justify-center text-primary"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {problems[currentProblem]}
        </motion.div>
      </AnimatePresence>
      <motion.p 
        className="text-xl md:text-2xl mb-8 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        TribeApp: Your solution to stress-free shared expenses
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link href="/auth/signup">
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg">
            Start Your Tribe <ArrowRight className="ml-2" />
          </Button>
        </Link>
      </motion.div>
    </section>
  )
}

interface FeatureCardProps {
  icon: React.ElementType; // Define the type for the icon
  title: string;           // Define the type for the title
  description: string;     // Define the type for the description
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Icon className="h-12 w-12 text-primary mb-4" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
)

const BeforeAfterSection = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Experience the TribeApp Difference</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Frown className="mr-2 text-red-500" /> Before TribeApp
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Awkward money conversations</li>
              <li>Complicated spreadsheets</li>
              <li>Not knowing who owes what</li>
            </ul>
          </motion.div>
          <ArrowRight size={48} className="text-primary hidden md:block" />
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Smile className="mr-2 text-green-500" /> With TribeApp
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Automated expense tracking</li>
              <li>Real-time balance updates</li>
              <li>Easy in-app settlements</li>
              <li>Fair split suggestions</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  quote: string; // Define the type for the quote
  author: string; // Define the type for the author
  role: string;   // Define the type for the role
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role }) => (
  <motion.div
    className="bg-white p-6 rounded-lg shadow-lg"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <p className="text-gray-600 italic mb-4">&ldquo;{quote}&rdquo;</p>
    <p className="font-semibold">{author}</p>
    <p className="text-sm text-gray-500">{role}</p>
  </motion.div>
)

const TribeAppLandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50">
      <header className="sticky top-0 z-50 bg-background/50 backdrop-blur-sm border-b">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary">
            TribeApp
          </div>
          <div className="space-x-4">
            <Link href="/auth/signin">
              <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/auth/signup">
              <Button onClick={() => setIsModalOpen(true)}>Sign Up</Button>
            </Link>
          </div>
        </nav>
      </header>

      <HeroSection />

      <BeforeAfterSection />

      <main className="container mx-auto px-4 py-16">
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How TribeApp Makes Sharing Expenses Easy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Users} 
              title="Build Your Tribe" 
              description="Create groups for different expense-sharing scenarios with ease."
            />
            <FeatureCard 
              icon={Receipt} 
              title="Snap & Split" 
              description="Take a photo of your receipt and let TribeApp do the math."
            />
            <FeatureCard 
              icon={CreditCard} 
              title="Settle with Ease" 
              description="Track and manage shared expenses effortlessly."
            />
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Happy Tribes, Happy Lives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <TestimonialCard 
              quote="TribeApp turned our house of 5 into a drama-free zone. Bills? What bills?"
              author="Alex C."
              role="Happy Housemate"
            />
            <TestimonialCard 
              quote="Our friend group's Euro trip was a breeze thanks to TribeApp. No more 'who owes what' headaches!"
              author="Sophia L."
              role="Globe Trotter"
            />
          </div>
        </section>

        <section className="text-center mb-20">
          <h2 className="text-3xl font-bold mb-8">Ready to Join the TribeApp Community?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Experience a world where shared expenses bring people together, not apart!
          </p>
          <Link href="/auth/signup">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 text-lg">
                Start Your Free Trial <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2023 TribeApp. All rights reserved.</p>
          <nav className="mt-4 md:mt-0">
            <ul className="flex space-x-4">
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary transition-colors duration-300">Contact Us</a></li>
            </ul>
          </nav>
        </div>
      </footer>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Join the Tribe!</h2>
                <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                  <X className="h-6 w-6" />
                </Button>
              </div>
              <p className="mb-4">Sign up now and say goodbye to expense-sharing headaches!</p>
              <form className="space-y-4">
                <input type="email" placeholder="Email" className="w-full p-2 border rounded" />
                <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">
                    Create Your Tribe
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TribeAppLandingPage
