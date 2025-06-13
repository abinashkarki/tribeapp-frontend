import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-black text-white py-12 border-t border-zinc-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/tribebills-logo.webp"
                width={32}
                height={32}
                alt="TribeBills Logo"
                className="w-8 h-8"
              />
              <span className="text-xl font-bold">TribeBills</span>
            </div>
            <p className="text-white/60 mb-4">Bill it in the Tribe.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <a href="#features" className="text-white/60 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-white/60 hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="text-white/60 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/60 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a href="/terms" className="text-white/60 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-white/60 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/copyright" className="text-white/60 hover:text-white transition-colors">
                  Copyright & Licenses
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-zinc-900 text-center text-white/40">
          <p>&copy; {currentYear} TribeBills. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
