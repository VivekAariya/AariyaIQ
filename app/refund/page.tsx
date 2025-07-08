import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Refund Policy | AariyaIQ",
    description: "Refund Policy for AariyaIQ - A learning platform by AariyaTech UK",
};

export default function RefundPolicyPage() {
    return (
        <main className="min-h-screen pt-16 pb-16">
            <div className="container mx-auto py-12 px-4 max-w-4xl">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8">
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl font-bold mb-2 text-gray-700 dark:text-gray-300">Refund Policy</h1>
                        <p className="text-gray-600 dark:text-gray-400">For AariyaIQ (Operated by AariyaTech UK)</p>
                        <div className="mt-4 flex flex-col sm:flex-row justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                            <p>Version – 1.0</p>
                            <p>
                                Effective Date: 1<sup>st</sup> January 2025
                            </p>
                            <p>
                                Last Updated: 7<sup>th</sup> January 2025
                            </p>
                        </div>
                    </div>

                    <div className="prose prose-slate max-w-none dark:prose-invert text-gray-700 dark:text-gray-300">
                        <p className="mb-6">
                            This Refund Policy outlines the terms and conditions under which AariyaIQ ("we," "us," or
                            "our") provides refunds for courses, services, and other products purchased through our
                            platform. By enrolling in our courses or purchasing our services, you agree to the terms
                            outlined in this policy.
                        </p>
                        <p className="mb-6">
                            We are committed to providing high-quality educational content and services. However, we
                            understand that circumstances may arise where a refund is necessary. This policy ensures
                            transparency and fairness for all parties involved.
                        </p>

                        <h2 className="text-xl font-semibold mb-3">1. Refund Eligibility Criteria</h2>
                        <ul className="list-disc pl-6 mb-6">
                            <li>
                                The balance of the course fee (excluding the non-refundable registration fee) is
                                refundable <strong>within 7 calendar days of enrollment</strong> if{" "}
                                <strong>both</strong> of the following conditions are met:
                                <ul className="list-disc pl-6 mt-2">
                                    <li>Less than 20% of the course content has been accessed.</li>
                                    <li>A valid refund request is submitted as per our Refund Policy procedures.</li>
                                </ul>
                            </li>
                            <li>
                                No refunds will be issued:
                                <ul className="list-disc pl-6 mt-2">
                                    <li>After 7 calendar days from the date of enrollment</li>
                                    <li>If more than 20% of the course content has been accessed</li>
                                    <li>Registration fees (non-refundable under all circumstances)</li>
                                </ul>
                            </li>
                        </ul>

                        <h2 className="text-xl font-semibold mb-3">2. Refund Request Process</h2>
                        <ul className="list-disc pl-6 mb-6">
                            <li>
                                Send a refund request email to <strong>admin@aariyatech.co.uk</strong> within 7 days of
                                enrollment with your course details and reason for refund.
                            </li>
                            <li>
                                We will verify your eligibility by checking your course access history and enrollment
                                date within 2-3 business days.
                            </li>
                            <li>
                                If approved, refunds will be processed within 5-7 business days to your original payment
                                method.
                            </li>
                            <li>
                                You will receive email confirmation once the refund has been processed and initiated.
                            </li>
                        </ul>

                        <h2 className="text-xl font-semibold mb-3">3. Special Circumstances</h2>
                        <ul className="list-disc pl-6 mb-6">
                            <li>
                                In exceptional circumstances, we may consider refund requests outside the standard
                                policy. These may include:
                                <ul className="list-disc pl-6 mt-2">
                                    <li>Technical issues preventing course access for extended periods</li>
                                    <li>Course cancellation by AariyaIQ</li>
                                    <li>Significant changes to course content or structure</li>
                                    <li>Medical emergencies or other documented hardships</li>
                                </ul>
                            </li>
                            <li>
                                Each case will be reviewed individually, and decisions will be made at the sole
                                discretion of AariyaIQ management.
                            </li>
                        </ul>

                        <h2 className="text-xl font-semibold mb-3">4. Refund Processing Times</h2>
                        <ul className="list-disc pl-6 mb-6">
                            <li>Review Period: 2-3 Business Days</li>
                            <li>Processing Time: 5-7 Business Days</li>
                            <li>
                                Bank Processing: 3-5 Business Days (may vary depending on your bank or payment provider)
                            </li>
                        </ul>

                        <h2 className="text-xl font-semibold mb-3">5. Contact Information</h2>
                        <p className="mb-3">
                            For any questions regarding refunds or to submit a refund request, please contact:
                        </p>
                        <div className="mb-6">
                            <p className="font-semibold">AariyaTech UK</p>
                            <p>
                                Phone No:{" "}
                                <a
                                    href="tel:+447384025531"
                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    +44 7384025531
                                </a>
                            </p>
                            <p>
                                Email:{" "}
                                <a
                                    href="mailto:admin@aariyatech.co.uk"
                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    admin@aariyatech.co.uk
                                </a>{" "}
                                or{" "}
                                <a
                                    href="mailto:hello@aariyatech.co.uk"
                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                >
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
                            This Refund Policy is part of our Terms of Service and should be read in conjunction with
                            our Privacy Policy and other applicable terms.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
