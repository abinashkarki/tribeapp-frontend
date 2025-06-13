import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function CopyrightAndLicenses() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-zinc-900 rounded-2xl p-8 md:p-12 border border-zinc-800">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Copyright & Licenses</h1>
            <p className="text-white/70 mb-8">Last Updated: 7 June 2025</p>

            <div className="prose prose-invert prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">COPYRIGHT NOTICE</h2>
                <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-4 mb-4">
                  <p className="text-purple-400 font-bold text-xl mb-2">© 2025 TribeBills. All rights reserved.</p>
                  <p className="text-white/80">
                    TribeBills and all related marks, logos, and intellectual property are trademarks of the developer.
                    The TribeBills mobile application, including its design, functionality, user interface, and
                    underlying technology, is protected by copyright and other intellectual property laws.
                  </p>
                </div>

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
                  <p className="text-white/90 mb-2">
                    <strong>Version:</strong> 1.0
                  </p>
                  <p className="text-white/90">
                    <strong>Category:</strong> Finance/Productivity
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">INTELLECTUAL PROPERTY RIGHTS</h2>

                <h3 className="text-xl font-semibold text-white mb-3">App Content and Design</h3>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>
                    <strong>Original Software:</strong> The TribeBills application code, user interface design, visual
                    assets, and functionality are original works protected by copyright
                  </li>
                  <li>
                    <strong>Proprietary Technology:</strong> Receipt processing algorithms, bill splitting calculations,
                    and expense tracking features are proprietary
                  </li>
                  <li>
                    <strong>Visual Assets:</strong> App icons, logos, graphics, and design elements are original
                    creations or properly licensed materials
                  </li>
                  <li>
                    <strong>Database Design:</strong> User data models, financial tracking schemas, and application
                    architecture are proprietary
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3">Trademarks</h3>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>
                    <strong>TribeBills™</strong> - Application name and primary trademark
                  </li>
                  <li>
                    <strong>App Icon and Logo</strong> - Visual identity elements
                  </li>
                  <li>
                    <strong>User Interface Elements</strong> - Distinctive design patterns and interface components
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">THIRD-PARTY SOFTWARE LICENSES</h2>

                <h3 className="text-xl font-semibold text-white mb-3">Google Services and Libraries</h3>

                <div className="bg-zinc-800 rounded-lg p-4 mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">1. Google Sign-In for iOS</h4>
                  <pre className="text-sm text-white/80 bg-zinc-900 rounded p-3 overflow-x-auto">
                    {`Google Sign-In iOS SDK
Copyright (c) 2015 Google Inc.
Licensed under the Apache License, Version 2.0

Repository: https://github.com/google/GoogleSignIn-iOS
License: https://www.apache.org/licenses/LICENSE-2.0

Usage: User authentication and OAuth integration`}
                  </pre>
                </div>

                <div className="bg-zinc-800 rounded-lg p-4 mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">2. Google Gemini AI API</h4>
                  <pre className="text-sm text-white/80 bg-zinc-900 rounded p-3 overflow-x-auto">
                    {`Google AI APIs
Copyright (c) Google LLC
Terms of Service: https://ai.google.dev/terms

Usage: OCR processing and receipt text extraction
Note: API service, not embedded library`}
                  </pre>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">Apple Frameworks and Services</h3>

                <div className="bg-zinc-800 rounded-lg p-4 mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">1. SwiftUI</h4>
                  <pre className="text-sm text-white/80 bg-zinc-900 rounded p-3 overflow-x-auto">
                    {`SwiftUI Framework
Copyright (c) Apple Inc.
Licensed under Apple Developer Program License Agreement

Usage: User interface development framework
Platform: iOS native framework`}
                  </pre>
                </div>

                <div className="bg-zinc-800 rounded-lg p-4 mb-4">
                  <h4 className="text-lg font-semibold text-white mb-2">2. AuthenticationServices</h4>
                  <pre className="text-sm text-white/80 bg-zinc-900 rounded p-3 overflow-x-auto">
                    {`AuthenticationServices Framework
Copyright (c) Apple Inc.
Licensed under Apple Developer Program License Agreement

Usage: Apple Sign-In integration
Platform: iOS native framework`}
                  </pre>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">OPEN SOURCE LICENSES</h2>

                <h3 className="text-xl font-semibold text-white mb-3">Apache License, Version 2.0</h3>
                <p className="text-white/80 mb-4">
                  The following components are licensed under the Apache License, Version 2.0:
                </p>
                <ul className="list-disc list-inside text-white/80 mb-4 space-y-1">
                  <li>Google Sign-In iOS SDK</li>
                  <li>Google Utilities</li>
                  <li>AppAuth for iOS</li>
                  <li>AWS SDK (Backend)</li>
                  <li>Mixpanel SDK (Backend)</li>
                </ul>

                <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 mb-4">
                  <p className="text-green-400 font-semibold mb-2">Apache License Summary:</p>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>✅ Commercial use permitted</li>
                    <li>✅ Modification permitted</li>
                    <li>✅ Distribution permitted</li>
                    <li>✅ Patent use granted</li>
                    <li>⚠️ Must include copyright notice</li>
                    <li>⚠️ Must include license text</li>
                  </ul>
                  <p className="text-white/80 mt-3">
                    Full Apache License 2.0 text: https://www.apache.org/licenses/LICENSE-2.0
                  </p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">USER CONTENT AND DATA RIGHTS</h2>

                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-blue-400 mb-3">Your Rights</h3>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>
                      <strong>Content Ownership:</strong> You retain ownership of receipt images and expense data you
                      upload
                    </li>
                    <li>
                      <strong>Data Portability:</strong> You can export your data through the app or by contacting us
                    </li>
                    <li>
                      <strong>Account Control:</strong> You can modify or delete your account and associated data at any
                      time
                    </li>
                  </ul>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-700 rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold text-yellow-400 mb-3">Our Rights</h3>
                  <ul className="list-disc list-inside text-white/80 space-y-1">
                    <li>
                      <strong>Service License:</strong> You grant us a limited license to process, store, and display
                      your content for service functionality
                    </li>
                    <li>
                      <strong>Technical Operations:</strong> We may access your data for technical support, security,
                      and service improvement
                    </li>
                    <li>
                      <strong>Legal Compliance:</strong> We may access or disclose data as required by law or legal
                      process
                    </li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">CONTACT INFORMATION</h2>
                <p className="text-white/80 mb-4">
                  For questions regarding copyright, licensing, or intellectual property:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-zinc-800 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">General Inquiries</h4>
                    <p className="text-white/90 mb-1">
                      <strong>Email:</strong> karkiabinash777@gmail.com
                    </p>
                    <p className="text-white/90">
                      <strong>Website:</strong> tribebills.com
                    </p>
                  </div>

                  <div className="bg-zinc-800 rounded-lg p-4">
                    <h4 className="text-lg font-semibold text-white mb-2">Legal and Copyright</h4>
                    <p className="text-white/90 mb-1">
                      <strong>Email:</strong> karkiabinash777@gmail.com
                    </p>
                    <p className="text-white/90">
                      <strong>Address:</strong> 6-8 station st Guildford 2161 NSW, Australia
                    </p>
                  </div>
                </div>
              </section>

              <div className="bg-purple-900/20 border border-purple-700 rounded-lg p-4 mt-8">
                <p className="text-purple-400 font-semibold">
                  This document is effective as of 7 June 2025 and was last updated on 7 June 2025.
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
