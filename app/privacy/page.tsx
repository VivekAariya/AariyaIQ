import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | AariyaIQ",
  description: "Privacy Policy for AariyaIQ - A learning platform by AariyaTech UK",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen pt-16 pb-16">
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-700 dark:text-gray-300">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-400">For AariyaIQ (Operated by AariyaTech UK)</p>
            <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
              <p>Version – 001</p>
              <p>
                Effective Date: 22<sup>nd</sup> May 2025
              </p>
              <p>
                Last Updated: 22<sup>nd</sup> May 2025
              </p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">
            <p className="mb-6">
              AariyaIQ is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, store,
              and protect your personal information when you use our website, web app, and learning platform.
            </p>
            <p className="mb-6">
              AariyaIQ is operated by AariyaTech UK, a registered sole proprietorship in England and Wales. We comply
              with the General Data Protection Regulation (GDPR), the Data Protection Act 2018, and other relevant data
              protection laws.
            </p>

            <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="mb-3">We collect the following types of personal information:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Full name</li>
              <li>Email address</li>
              <li>Payment and billing information</li>
              <li>Course enrolment details</li>
              <li>Learning progress and activity data</li>
              <li>Any communication you send to us (e.g., support requests)</li>
            </ul>
            <p className="mb-6">We may also collect non-personal data through cookies and analytics tools.</p>

            <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">Your information is used to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Process course enrolments and payments</li>
              <li>Provide access to learning materials</li>
              <li>Issue course completion certificates</li>
              <li>Improve platform performance and user experience</li>
              <li>Communicate important updates, news, or promotional offers</li>
              <li>Maintain security and protect against fraud</li>
            </ul>
            <p className="mb-6">We will never sell or rent your personal data to third parties.</p>

            <h2 className="text-xl font-semibold mb-3">3. Sharing Your Information</h2>
            <p className="mb-3">We may share your information only with:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>
                Trusted service providers (e.g., payment processors, hosting providers) under strict confidentiality
                agreements
              </li>
              <li>Regulatory authorities if legally required</li>
            </ul>
            <p className="mb-6">All data sharing complies with GDPR and other applicable privacy laws.</p>

            <h2 className="text-xl font-semibold mb-3">4. Cookies and Tracking Technologies</h2>
            <p className="mb-3">We use cookies to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Enable essential site functionality</li>
              <li>Track platform usage and performance for improvement</li>
              <li>Personalize your experience on our platform</li>
            </ul>
            <p className="mb-6">
              By using AariyaIQ, you consent to the use of cookies in accordance with our{" "}
              <Link href="/cookies" className="text-blue-600 dark:text-blue-400 hover:underline">
                Cookie Policy
              </Link>
              .
            </p>

            <h2 className="text-xl font-semibold mb-3">5. Your Rights</h2>
            <p className="mb-3">Under GDPR, you have the right to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Access the personal data we hold about you</li>
              <li>Request correction or deletion of your data</li>
              <li>Object to the processing of your data</li>
              <li>Withdraw consent at any time (where processing is based on consent)</li>
            </ul>
            <p className="mb-6">
              You can exercise your rights by contacting us at{" "}
              <a href="mailto:admin@aariyatech.co.uk" className="text-blue-600 dark:text-blue-400 hover:underline">
                admin@aariyatech.co.uk
              </a>{" "}
              or{" "}
              <a href="mailto:hello@aariyatech.co.uk" className="text-blue-600 dark:text-blue-400 hover:underline">
                hello@aariyatech.co.uk
              </a>
              .
            </p>

            <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
            <p className="mb-3">We retain your personal data for as long as necessary to:</p>
            <ul className="list-disc pl-6 mb-6">
              <li>Fulfill the purposes outlined in this policy</li>
              <li>Comply with legal, accounting, or regulatory obligations</li>
            </ul>
            <p className="mb-6">
              If you wish to delete your account or request removal of your data, please contact us.
            </p>

            <h2 className="text-xl font-semibold mb-3">7. International Data Transfers</h2>
            <p className="mb-6">
              If you are accessing AariyaIQ from outside the UK, you acknowledge that your information will be processed
              in the United Kingdom and may be transferred internationally, subject to appropriate safeguards.
            </p>

            <h2 className="text-xl font-semibold mb-3">8. Changes to This Privacy Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time. Updated versions will be posted on our website and
              are effective immediately upon posting.
            </p>

            <h2 className="text-xl font-semibold mb-3">9. Contact Us</h2>
            <p className="mb-3">For any questions regarding this Privacy Policy, please contact:</p>
            <div className="mb-6">
              <p className="font-semibold">AariyaTech UK</p>
              <p>
                Phone No:{" "}
                <a href="tel:+447384025531" className="text-blue-600 dark:text-blue-400 hover:underline">
                  +44 7384025531
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:admin@aariyatech.co.uk" className="text-blue-600 dark:text-blue-400 hover:underline">
                  admin@aariyatechco.uk
                </a>{" "}
                or{" "}
                <a href="mailto:hello@aariyatech.co.uk" className="text-blue-600 dark:text-blue-400 hover:underline">
                  hello@aariyatech.co.uk
                </a>
              </p>
              <p>
                Website:{" "}
                <a
                  href="https://aariyatech.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  https://aariyatech.co.uk
                </a>
              </p>
              <p>ICO Registration Number: ZB881395</p>
              <p>Address: Barts House, Black Lion St, Brighton and Hove, Brighton – BN1 1JE, UK</p>
            </div>

            <p className="text-center mt-8 text-sm">© 2025 AariyaTech UK. All rights reserved.</p>
            <p className="text-center text-sm mb-4">
              This Privacy Policy applies to all users of the AariyaIQ website, web application, and associated
              services.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
