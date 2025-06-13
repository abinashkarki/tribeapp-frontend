import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-zinc-900 rounded-2xl p-8 md:p-12 border border-zinc-800">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Terms of Service</h1>
            <p className="text-white/70 mb-8">Last Updated: 7 June 2025</p>

            <div className="prose prose-invert prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. ACCEPTANCE OF TERMS</h2>
                <p className="text-white/80 mb-4">
                  By downloading, installing, or using the TribeBills mobile application ("App") and related services
                  ("Service"), you ("User," "you," or "your") agree to be bound by these Terms of Service ("Terms"). If
                  you do not agree to these Terms, do not use the Service.
                </p>
                <div className="bg-zinc-800 rounded-lg p-4 mb-4">
                  <p className="text-white/90 mb-2">
                    <strong>Developer:</strong> Solo Developer
                  </p>
                  <p className="text-white/90 mb-2">
                    <strong>App Name:</strong> TribeBills
                  </p>
                  <p className="text-white/90 mb-2">
                    <strong>Bundle ID:</strong> Solo.VibeTribeBills
                  </p>
                  <p className="text-white/90">
                    <strong>Contact:</strong> karkiabinash777@gmail.com
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">2. DESCRIPTION OF SERVICE</h2>

                <h3 className="text-xl font-semibold text-white mb-3">2.1 Service Overview</h3>
                <p className="text-white/80 mb-4">TribeBills is a mobile application that helps users:</p>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>
                    <strong>Track expenses</strong> and manage bills
                  </li>
                  <li>
                    <strong>Split expenses</strong> among groups ("Tribes")
                  </li>
                  <li>
                    <strong>Capture and process</strong> receipt images using OCR technology
                  </li>
                  <li>
                    <strong>Manage payments</strong> and settlement between group members
                  </li>
                  <li>
                    <strong>Organize financial data</strong> for personal and group expense tracking
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">2.2 Service Features</h3>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>
                    <strong>Account management</strong> (registration, authentication, profile management)
                  </li>
                  <li>
                    <strong>Expense tracking</strong> (bill creation, categorization, amount tracking)
                  </li>
                  <li>
                    <strong>Group management</strong> (tribe creation, member management, permissions)
                  </li>
                  <li>
                    <strong>Image processing</strong> (receipt capture, OCR text extraction)
                  </li>
                  <li>
                    <strong>Payment tracking</strong> (verification, settlement, financial records)
                  </li>
                  <li>
                    <strong>Data synchronization</strong> across devices
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. USER ACCOUNTS AND REGISTRATION</h2>

                <h3 className="text-xl font-semibold text-white mb-3">3.1 Account Types</h3>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>
                    <strong>Registered Users:</strong> Full access with email/Google/Apple authentication
                  </li>
                  <li>
                    <strong>Guest Users:</strong> Limited access with temporary data storage
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">3.2 Account Requirements</h3>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>You must be at least 13 years old to use the Service</li>
                  <li>You must provide accurate and complete information during registration</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. USER RESPONSIBILITIES AND CONDUCT</h2>

                <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-green-400 mb-3">4.1 Acceptable Use</h3>
                  <p className="text-white/80 mb-3">
                    You agree to use the Service only for lawful purposes and in accordance with these Terms. You will:
                  </p>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>
                      <strong>Provide accurate information</strong> for bills, expenses, and payments
                    </li>
                    <li>
                      <strong>Respect other users</strong> in tribes and group interactions
                    </li>
                    <li>
                      <strong>Use the Service</strong> only for personal or legitimate business expense tracking
                    </li>
                    <li>
                      <strong>Comply with applicable laws</strong> and regulations
                    </li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-red-400 mb-3">4.2 Prohibited Activities</h3>
                  <p className="text-white/80 mb-3">You agree NOT to:</p>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>
                      <strong>Upload illegal content</strong> or receipts for illegal activities
                    </li>
                    <li>
                      <strong>Misrepresent expenses</strong> or financial information
                    </li>
                    <li>
                      <strong>Abuse the Service</strong> through automated tools, bots, or excessive usage
                    </li>
                    <li>
                      <strong>Interfere with</strong> the Service's security features or other users' access
                    </li>
                    <li>
                      <strong>Reverse engineer</strong> or attempt to extract source code from the App
                    </li>
                    <li>
                      <strong>Use the Service</strong> for commercial purposes without authorization
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. FINANCIAL DISCLAIMER</h2>

                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-3">6.1 Not Financial Advice</h3>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>
                      TribeBills is an expense tracking tool, <strong>not a financial advisor</strong>
                    </li>
                    <li>We do not provide financial, tax, or legal advice</li>
                    <li>You are responsible for your own financial decisions and tax compliance</li>
                  </ul>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-3">6.2 Accuracy Disclaimer</h3>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>
                      While we strive for accuracy in OCR and calculations,{" "}
                      <strong>you are responsible for verifying all information</strong>
                    </li>
                    <li>We do not guarantee the accuracy of OCR text extraction</li>
                    <li>You should review all automatically processed data before relying on it</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. PAYMENTS AND FINANCIAL FEATURES</h2>

                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">7.1 Payment Tracking</h3>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>The Service helps track payment obligations between users</li>
                    <li>
                      <strong>We do not process actual payments</strong> or financial transactions
                    </li>
                    <li>Users are responsible for actual payment settlement outside the App</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">11. LIMITATION OF LIABILITY</h2>

                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-red-400 mb-3">11.1 Disclaimer of Warranties</h3>
                  <p className="text-white/80 mb-3">
                    THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
                    NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                  </p>
                </div>

                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-red-400 mb-3">11.2 Limitation of Damages</h3>
                  <p className="text-white/80 mb-3">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR:
                  </p>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>
                      <strong>Indirect, incidental, special, or consequential damages</strong>
                    </li>
                    <li>
                      <strong>Loss of profits, data, or business opportunities</strong>
                    </li>
                    <li>
                      <strong>Damages resulting from OCR errors or data processing mistakes</strong>
                    </li>
                    <li>
                      <strong>Financial losses due to calculation errors or data inaccuracy</strong>
                    </li>
                    <li>
                      <strong>Disputes between users regarding payments or expenses</strong>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">17. CONTACT INFORMATION</h2>
                <p className="text-white/80 mb-4">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <p className="text-white/90 mb-2">
                    <strong>Email:</strong> karkiabinash777@gmail.com
                  </p>
                  <p className="text-white/90 mb-2">
                    <strong>Website:</strong> tribebills.com
                  </p>
                  <p className="text-white/90">
                    <strong>Address:</strong> 6-8 station st Guildford 2161 NSW, Australia
                  </p>
                </div>
              </section>

              <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-4 mt-8">
                <p className="text-purple-400 font-semibold">
                  These Terms of Service are effective as of 7 June 2025 and were last updated on 7 June 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
