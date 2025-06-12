import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms of Service | AariyaIQ",
  description: "Terms of Service for AariyaIQ - A learning platform by AariyaTech UK",
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen pt-16 pb-16">
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold mb-2 text-gray-700 dark:text-gray-300">Terms of Service</h1>
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
              Welcome to AariyaIQ, a learning platform operated by AariyaTech UK, a registered sole proprietorship in
              England and Wales. By accessing or using AariyaIQ's website, web app, or any of our services, you agree to
              these Terms of Service.
            </p>
            <p className="mb-6">Please read these terms carefully before using our platform.</p>

            <h2 className="text-xl font-semibold mb-3">1. Definitions</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>"AariyaIQ" refers to the online learning platform operated by AariyaTech UK.</li>
              <li>"User", "Learner", or "You" means anyone who accesses, registers for, or uses the platform.</li>
              <li>"Instructor" means any authorized individual providing educational content on the platform.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">2. Use of Services</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>You must be at least 16 years old to create an account and enroll in courses.</li>
              <li>You agree to provide accurate, current, and complete information during registration.</li>
              <li>You are responsible for maintaining the confidentiality of your account login information.</li>
              <li>You agree not to use AariyaIQ for any unlawful, fraudulent, or unauthorized purpose.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">3. Course Enrollment and Access</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>
                Upon enrolling in a course, you are granted a limited, non-exclusive, non-transferable license to access
                the course content.
              </li>
              <li>Course access is provided for the duration specified at the time of enrollment.</li>
              <li>Unauthorized sharing, distribution, or reproduction of course materials is strictly prohibited.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">4. Payments, Registration Fees, and Refunds</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>
                A non-refundable registration fee will be charged at the time of course enrollment. This fee is clearly
                specified on the course enrollment page.
              </li>
              <li>
                The balance of the course fee (excluding the registration fee) is refundable within 7 calendar days of
                enrollment if:
                <ul className="list-disc pl-6 mt-2">
                  <li>Less than 20% of the course content has been accessed.</li>
                  <li>
                    A valid refund request is submitted as per our{" "}
                    <Link href="/refund" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Refund Policy
                    </Link>
                    .
                  </li>
                </ul>
              </li>
              <li>After 7 days or if more than 20% of the course content is accessed, no refunds will be issued.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">5. Instructor Contributions</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>Instructors provide educational materials and lead training sessions.</li>
              <li>
                AariyaIQ reserves the right to review, modify, or remove any instructor content that violates our
                policies or legal standards.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>
                All content on AariyaIQ, including but not limited to text, graphics, logos, videos, and course
                materials, is the property of AariyaTech UK or its licensors.
              </li>
              <li>
                You may not copy, reproduce, distribute, or create derivative works without explicit written permission.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>
                AariyaTech UK reserves the right to suspend or terminate your account if you breach these Terms of
                Service.
              </li>
              <li>
                Upon termination, you will lose access to any enrolled courses without refund, except where mandated by
                law.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">8. Disclaimers</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>AariyaIQ provides educational content for general learning purposes only.</li>
              <li>
                We do not guarantee job placement, promotions, or other professional advancement as a direct result of
                course completion.
              </li>
              <li>All courses are provided "as is" without warranties of any kind, either express or implied.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
            <p className="mb-6">
              To the fullest extent permitted by law, AariyaTech UK shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising from your use of the platform.
            </p>

            <h2 className="text-xl font-semibold mb-3">10. Governing Law</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>These Terms of Service are governed by the laws of England and Wales.</li>
              <li>Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">11. Changes to Terms</h2>
            <ul className="list-disc pl-6 mb-6">
              <li>AariyaTech UK reserves the right to update or modify these Terms at any time.</li>
              <li>
                Updated Terms will be posted on the platform, and continued use of the services constitutes acceptance
                of the new Terms.
              </li>
            </ul>

            <h2 className="text-xl font-semibold mb-3">12. Contact Information</h2>
            <p className="mb-3">For any questions regarding these Terms of Service, please contact:</p>
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
              This Terms of Service document governs the use of the AariyaIQ website, web application, and all
              associated services provided by AariyaTech UK.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
