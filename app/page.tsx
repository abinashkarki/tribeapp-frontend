import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { Download } from "@/components/download"
import { Footer } from "@/components/footer"
import { Faq } from "@/components/faq"
import { ContactUs } from "@/components/contact-us"
import { StructuredData } from "@/components/structured-data"

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="min-h-screen bg-black text-white overflow-hidden">
        <Header />
        <Hero />
        <Features />
        <HowItWorks />
        <Faq />
        <ContactUs />
        <Download />
        <Footer />
      </main>
    </>
  )
}
