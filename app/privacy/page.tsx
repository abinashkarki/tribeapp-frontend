import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-zinc-900 rounded-2xl p-8 md:p-12 border border-zinc-800">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Privacy Policy</h1>
            <p className="text-white/70 mb-8">Last Updated: 7 June 2025</p>

            <div className="prose prose-invert prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">1. INTRODUCTION</h2>
                <p className="text-white/80 mb-4">
                  TribeBills ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy
                  explains how we collect, use, disclose, and safeguard your information when you use our mobile
                  application TribeBills and related services (collectively, the "Service").
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
                <h2 className="text-2xl font-bold text-white mb-4">2. INFORMATION WE COLLECT</h2>

                <h3 className="text-xl font-semibold text-white mb-3">2.1 Account Information</h3>
                <p className="text-white/80 mb-4">When you create an account, we collect:</p>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>
                    <strong>Email address</strong> (for account creation and authentication)
                  </li>
                  <li>
                    <strong>Username</strong> (for account identification)
                  </li>
                  <li>
                    <strong>Password</strong> (encrypted and stored securely)
                  </li>
                  <li>
                    <strong>Profile picture</strong> (optional, stored in secure cloud storage)
                  </li>
                  <li>
                    <strong>Authentication provider information</strong> (Google, Apple, or email)
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">2.2 Financial and Bill Information</h3>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>
                    <strong>Receipt images</strong> (uploaded by you, processed for data extraction)
                  </li>
                  <li>
                    <strong>Bill details</strong> (amounts, descriptions, dates, categories)
                  </li>
                  <li>
                    <strong>Payment information</strong> (amounts, payment dates, verification status)
                  </li>
                  <li>
                    <strong>Tribe information</strong> (group names, descriptions, member relationships)
                  </li>
                  <li>
                    <strong>Bill splitting data</strong> (how expenses are divided among group members)
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">2.3 Usage and Analytics Information</h3>
                <p className="text-white/80 mb-4">We collect analytics data to improve our service:</p>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>
                    <strong>App usage patterns</strong> (features used, session duration, user interactions)
                  </li>
                  <li>
                    <strong>Login events</strong> (authentication method, login frequency, device information)
                  </li>
                  <li>
                    <strong>Feature usage</strong> (OCR usage, bill creation, payment tracking)
                  </li>
                  <li>
                    <strong>Error reports</strong> (app crashes, API errors for debugging)
                  </li>
                  <li>
                    <strong>Device information</strong> (device type, operating system, app version)
                  </li>
                  <li>
                    <strong>IP address</strong> (for security and rate limiting purposes)
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">3. THIRD-PARTY SERVICES AND INTEGRATIONS</h2>

                <h3 className="text-xl font-semibold text-white mb-3">3.1 Google Services</h3>
                <div className="bg-zinc-800 rounded-lg p-4 mb-4">
                  <p className="text-white/90 mb-2">
                    <strong>Google Sign-In:</strong>
                  </p>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>We use Google Sign-In for authentication</li>
                    <li>Google provides us with your email address and basic profile information</li>
                    <li>Google's Privacy Policy applies: https://policies.google.com/privacy</li>
                  </ul>
                </div>

                <div className="bg-zinc-800 rounded-lg p-4 mb-4">
                  <p className="text-white/90 mb-2">
                    <strong>Google Gemini AI (OCR Processing):</strong>
                  </p>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>Receipt images are processed using Google's AI technology for text extraction</li>
                    <li>Images are sent to Google's secure servers for OCR processing</li>
                    <li>Google processes images only for OCR functionality and does not store them</li>
                    <li>You can manually enter bill information instead of using OCR</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">3.2 Apple Services</h3>
                <div className="bg-zinc-800 rounded-lg p-4 mb-4">
                  <p className="text-white/90 mb-2">
                    <strong>Apple Sign-In:</strong>
                  </p>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>We use Apple Sign-In for authentication</li>
                    <li>Apple may provide a private relay email address to protect your actual email</li>
                    <li>Apple's Privacy Policy applies: https://www.apple.com/legal/privacy/</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">4. HOW WE USE YOUR INFORMATION</h2>

                <h3 className="text-xl font-semibold text-white mb-3">4.1 Service Functionality</h3>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>
                    <strong>Account management</strong> (authentication, profile management)
                  </li>
                  <li>
                    <strong>Bill processing</strong> (OCR, expense tracking, splitting calculations)
                  </li>
                  <li>
                    <strong>Group management</strong> (tribe creation, member management, notifications)
                  </li>
                  <li>
                    <strong>Payment tracking</strong> (verification, settlement, financial records)
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">4.2 Service Improvement</h3>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>
                    <strong>Analytics and insights</strong> (understanding user behavior, feature usage)
                  </li>
                  <li>
                    <strong>Bug fixes and optimization</strong> (error tracking, performance monitoring)
                  </li>
                  <li>
                    <strong>New feature development</strong> (based on usage patterns and user needs)
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">5. INFORMATION SHARING AND DISCLOSURE</h2>

                <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-green-400 mb-3">
                    5.1 We Do NOT Share Your Information Except:
                  </h3>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>
                      <strong>With your explicit consent</strong>
                    </li>
                    <li>
                      <strong>With service providers</strong> (as described in Section 3, under strict data processing
                      agreements)
                    </li>
                    <li>
                      <strong>For legal compliance</strong> (if required by law, court order, or government request)
                    </li>
                    <li>
                      <strong>For safety and security</strong> (to protect rights, property, or safety of users)
                    </li>
                  </ul>
                </div>

                <div className="bg-red-900/20 border border-red-700 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-red-400 mb-3">5.2 We Do NOT:</h3>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>
                      <strong>Sell your personal information</strong> to third parties
                    </li>
                    <li>
                      <strong>Share your information for advertising</strong> purposes
                    </li>
                    <li>
                      <strong>Use your data for marketing</strong> by third parties
                    </li>
                    <li>
                      <strong>Track you across other apps or websites</strong>
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">6. YOUR RIGHTS AND CHOICES</h2>

                <h3 className="text-xl font-semibold text-white mb-3">6.1 Account Access and Control</h3>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>
                    <strong>View your data:</strong> Access all your account information through the app
                  </li>
                  <li>
                    <strong>Edit your profile:</strong> Change username, email, and profile picture
                  </li>
                  <li>
                    <strong>Manage tribes:</strong> Create, join, leave, or archive expense groups
                  </li>
                  <li>
                    <strong>Control bill data:</strong> Add, edit, or delete your bills and expenses
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">6.2 Account Deletion</h3>
                <p className="text-white/80 mb-4">
                  You can permanently delete your account with the following process:
                </p>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>
                    <strong>Deletion preview:</strong> See what data will be affected before deletion
                  </li>
                  <li>
                    <strong>Complete removal:</strong> All personal information is permanently deleted
                  </li>
                  <li>
                    <strong>Financial data handling:</strong> Pending payment obligations are anonymized but preserved
                    for settlement integrity
                  </li>
                  <li>
                    <strong>Tribe management:</strong> Owned tribes are transferred to other members or archived
                  </li>
                  <li>
                    <strong>Image deletion:</strong> All uploaded images are permanently removed from storage
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">7. CONTACT US</h2>
                <p className="text-white/80 mb-4">
                  If you have questions about this Privacy Policy or our privacy practices, please contact us:
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
                  This Privacy Policy is effective as of 7 June 2025 and was last updated on 7 June 2025.
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
