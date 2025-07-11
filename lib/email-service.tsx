"use server";

import logger from "@/utils/logger";
import { render } from "@react-email/render";
import type React from "react";
import { CreateEmailOptions, Resend } from "resend";

// Email configuration
const emailConfig = {
    sender: "hello@aariyatech.co.uk",
};

// Email types
export type EmailType =
    | "instructor-application-received"
    | "instructor-final-approval"
    | "instructor-rejection"
    | "instructor-ban"
    | "instructor-suspend"
    | "learner-course-application"
    | "learner-initial-approval"
    | "learner-rejection"
    | "learner-final-approval"
    | "launch-page-notification"
    | "admin-launch-notification";

export interface EmailData {
    recipientName: string;
    recipientEmail: string;
    courseName?: string;
    courseStartDate?: string;
    paymentAmount?: string;
    paymentLink?: string;
    applicationDate?: string;
    expertise?: string;
    loginLink?: string;
    approvalStage?: string;
    nextSteps?: string[];
    resetLink?: string;
    resetExpiry?: string;
    verificationLink?: string;
}

interface EmailTemplateProps {
    type: EmailType;
    data: EmailData;
}

export async function EmailTemplate({ type, data }: EmailTemplateProps) {
    switch (type) {
        case "instructor-application-received":
            return <InstructorApplicationReceivedTemplate data={data} />;
        case "instructor-final-approval":
            return <InstructorFinalApprovalTemplate data={data} />;
        case "instructor-rejection":
            return <InstructorRejectionTemplate data={data} />;
        case "instructor-ban":
            return <InstructorBanTemplate data={data} />;
        case "instructor-suspend":
            return <InstructorSuspendTemplate data={data} />;

        case "learner-course-application":
            return <LearnerCourseApplicationTemplate data={data} />;

        case "learner-initial-approval":
            return <LearnerInitialApprovalTemplate data={data} />;
        case "learner-rejection":
            return <LearnerRejectionTemplate data={data} />;
        case "learner-final-approval":
            return <LearnerFinalApprovalTemplate data={data} />;

        case "launch-page-notification":
            return <LaunchPageNotificationTemplate data={data} />;
        case "admin-launch-notification":
            return <AdminLaunchNotificationTemplate data={data} />;
        default:
            return <DefaultTemplate data={data} />;
    }
}

function InstructorApplicationReceivedTemplate({ data }: { data: EmailData }) {
    return (
        <BaseTemplate title="Instructor Application Received">
            <h2>Hello {data.recipientName || "there"},</h2>
            <p>Thank you for your interest in becoming an instructor with AariyaIQ Learning Hub!</p>
            <p>We have received your application and it is currently under review.</p>
            <p>
                <strong>Application Date:</strong> {data.applicationDate || new Date().toLocaleDateString()}
                <br />
                <strong>Expertise:</strong> {data.expertise || "Please contact us for details"}
            </p>
            <p>Our team will review your application and get back to you shortly with the next steps.</p>
            <p>
                If you have any questions, please contact our support team at{" "}
                <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
            </p>
        </BaseTemplate>
    );
}

function InstructorFinalApprovalTemplate({ data }: { data: EmailData }) {
    return (
        <BaseTemplate title="Final Approval">
            <h2>Hello {data.recipientName || "there"},</h2>
            <p>
                Congratulations! Your instructor application for AariyaIQ Learning Hub has been finalized and approved.
            </p>
            <p>
                You can now start creating and managing courses. If you have any questions, please contact our support
                team at <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
            </p>
        </BaseTemplate>
    );
}

function InstructorRejectionTemplate({ data }: { data: EmailData }) {
    return (
        <BaseTemplate title="Instructor Application Update">
            <h2>Hello {data.recipientName || "there"},</h2>
            <p>
                Thank you for your interest in becoming an instructor with AariyaIQ Learning Hub. After careful review,
                we regret to inform you that your application has not been successful at this time.
            </p>
            <p>
                We appreciate the time and effort you put into your application. While we are unable to move forward
                with your application currently, we encourage you to stay connected and consider applying again in the
                future.
            </p>

            <p>
                If you have any questions or would like feedback on your application, please contact our support team at{" "}
                <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
            </p>
            <p>We wish you all the best in your future endeavors.</p>
        </BaseTemplate>
    );
}

function InstructorBanTemplate({ data }: { data: EmailData }) {
    return (
        <BaseTemplate title="Instructor Account Banned">
            <h2>Hello {data.recipientName || "there"},</h2>
            <p>
                We regret to inform you that your instructor account with AariyaIQ Learning Hub has been{" "}
                <strong>banned</strong> due to a serious violation of our terms of service or code of conduct.
            </p>
            <p>
                If you believe this was a mistake or would like to appeal, please contact our support team at{" "}
                <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
            </p>
            <p>Thank you for your understanding.</p>
        </BaseTemplate>
    );
}

function InstructorSuspendTemplate({ data }: { data: EmailData }) {
    return (
        <BaseTemplate title="Instructor Account Suspended">
            <h2>Hello {data.recipientName || "there"},</h2>
            <p>
                Your instructor account with AariyaIQ Learning Hub has been <strong>suspended</strong>. This action was
                taken due to a violation of our policies or pending investigation.
            </p>
            <p>
                If you have questions or wish to resolve this matter, please contact our support team at{" "}
                <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
            </p>
            <p>We appreciate your cooperation.</p>
        </BaseTemplate>
    );
}

function LearnerCourseApplicationTemplate({ data }: { data: EmailData }) {
    return (
        <BaseTemplate title="Application Received">
            <h2>Hello {data.recipientName || "there"},</h2>
            <p>
                Thank you for applying for <strong>{data.courseName || "our course"}</strong> at AariyaIQ Learning Hub.
                We have received your application and it is currently under review.
            </p>
            <p>
                <strong>Application Date:</strong> {data.applicationDate || new Date().toLocaleDateString()}
                <br />
                <strong>Course Start Date:</strong> {data.courseStartDate || "To be announced"}
            </p>
            <p>Our team will review your application and get back to you shortly with the next steps.</p>
            {data.loginLink && (
                <p>
                    You can check the status of your application by logging into your dashboard:
                    <br />
                    <a href={data.loginLink} className="button">
                        View Application Status
                    </a>
                </p>
            )}
            <p>
                If you have any questions, please contact our support team at{" "}
                <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
            </p>
        </BaseTemplate>
    );
}

function LearnerInitialApprovalTemplate({ data }: { data: EmailData }) {
    return (
        <BaseTemplate title="Initial Approval">
            <h2>Hello {data.recipientName || "there"},</h2>
            <p>
                Great news! Your application for <strong>{data.courseName || "our course"}</strong> has been initially
                approved. To secure your spot, please complete the payment process.
            </p>
            <p>
                <strong>Course:</strong> {data.courseName || "Our course"}
                <br />
                <strong>Start Date:</strong> {data.courseStartDate || "To be announced"}
                <br />
                <strong>Payment Amount:</strong> You will receive an email with the payment details shortly.
            </p>

            <p>
                After your payment is processed, your application will move to the compliance check stage. You can track
                your application status anytime by logging into your dashboard.
            </p>
            <p>
                If you have any questions, please contact our support team at{" "}
                <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
            </p>
        </BaseTemplate>
    );
}

function LearnerRejectionTemplate({ data }: { data: EmailData }) {
    return (
        <BaseTemplate title="Application Update">
            <h2>Hello {data.recipientName || "there"},</h2>
            <p>
                Thank you for your interest in <strong>{data.courseName || "our course"}</strong> at AariyaIQ Learning
                Hub. After careful review, we regret to inform you that your application has not been successful at this
                time.
            </p>
            <p>
                We appreciate the time and effort you put into your application. While we are unable to move forward
                with your application currently, we encourage you to stay connected and consider applying again in the
                future.
            </p>
            <p>
                If you have any questions or would like feedback on your application, please contact our support team at{" "}
                <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
            </p>
            <p>We wish you all the best in your learning journey.</p>
        </BaseTemplate>
    );
}

function LearnerFinalApprovalTemplate({ data }: { data: EmailData }) {
    return (
        <BaseTemplate title="Final Approval">
            <h2>Hello {data.recipientName || "there"},</h2>
            <p>
                Congratulations! Your application for <strong>{data.courseName || "our course"}</strong> at AariyaIQ
                Learning Hub has been finalized and approved.
            </p>
            <p>
                <strong>Course:</strong> {data.courseName || "Our course"}
                <br />
                <strong>Start Date:</strong> {data.courseStartDate || "To be announced"}
            </p>
            <p>
                You can now access your course materials and start learning. If you have any questions, please contact
                our support team at <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
            </p>
        </BaseTemplate>
    );
}

function LaunchPageNotificationTemplate({ data }: { data: EmailData }) {
    return (
        <BaseTemplate title="Thank you for your interest in AariyaIQ!">
            <h2>Hello {data.recipientName},</h2>
            <p>
                Thank you for showing interest in <strong>AariyaIQ</strong>! We're excited to have you join our
                community of learners and innovators.
            </p>
            <p>
                We're working hard to bring you an amazing learning experience. You'll be among the first to know when
                we launch!
            </p>
            <div
                style={{
                    backgroundColor: "#f0f9ff",
                    padding: "20px",
                    borderRadius: "8px",
                    margin: "20px 0",
                    border: "1px solid #0ea5e9",
                }}
            >
                <h3 style={{ color: "#0369a1", margin: "0 0 15px 0" }}>What's Coming:</h3>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                    <li>Cutting-edge technology courses</li>
                    <li>Expert instructors from the industry</li>
                    <li>Hands-on learning experiences</li>
                    <li>Career advancement opportunities</li>
                </ul>
            </div>
            {data.nextSteps && data.nextSteps.length > 0 && (
                <>
                    <p>
                        <strong>Next Steps:</strong>
                    </p>
                    <ul className="steps">
                        {data.nextSteps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </>
            )}
            <p>Stay tuned for updates and exclusive early access!</p>
            <p>
                Best regards,
                <br />
                The AariyaIQ Team
            </p>
        </BaseTemplate>
    );
}

function AdminLaunchNotificationTemplate({ data }: { data: EmailData }) {
    return (
        <BaseTemplate title="New Launch Page Interest - AariyaIQ">
            <h2>New Launch Page Interest</h2>
            <p>Someone has shown interest in AariyaIQ from the launch page.</p>
            <div
                style={{
                    backgroundColor: "#f9fafb",
                    padding: "20px",
                    borderRadius: "8px",
                    margin: "20px 0",
                    border: "1px solid #e5e7eb",
                }}
            >
                <p>
                    <strong>Date:</strong> {data.applicationDate || new Date().toLocaleDateString()}
                </p>
                <p>
                    <strong>Details:</strong> {data.expertise || "No additional details provided"}
                </p>
            </div>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>
                This notification was sent from the AariyaIQ launch page.
            </p>
        </BaseTemplate>
    );
}

function BaseTemplate({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>{title}</title>
                <style>{`
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            padding: 20px;
            text-align: center;
            color: white;
            border-radius: 8px 8px 0 0;
          }
          .content {
            background-color: #ffffff;
            padding: 20px;
            border-left: 1px solid #e5e7eb;
            border-right: 1px solid #e5e7eb;
          }
          .footer {
            background-color: #f9fafb;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #6b7280;
            border-radius: 0 0 8px 8px;
            border: 1px solid #e5e7eb;
            border-top: none;
          }
          .button {
            display: inline-block;
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
            color: white;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: bold;
            margin: 20px 0;
          }
          .steps {
            margin: 20px 0;
            padding: 0;
            list-style-type: none;
          }
          .steps li {
            margin-bottom: 10px;
            padding-left: 25px;
            position: relative;
          }
          .steps li:before {
            content: "✓";
            position: absolute;
            left: 0;
            color: #10b981;
          }
          .alert {
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            border-left: 4px solid #f59e0b;
            background-color: #fff7ed;
          }
          .alert-title {
            margin: 0 0 5px 0;
            color: #d97706;
            font-weight: bold;
          }
          .alert-content {
            margin: 0;
            color: #7c2d12;
          }
        `}</style>
            </head>
            <body>
                <div className="container">
                    <div className="header">
                        <h1 style={{ margin: 0 }}>AariyaIQ Learning Hub</h1>
                    </div>
                    <div className="content">{children}</div>
                    <div className="footer">
                        <p>
                            AariyaTech Ltd | hello@aariyatech.co.uk | © {new Date().getFullYear()} AariyaIQ Learning
                            Hub. All rights reserved.
                        </p>
                    </div>
                </div>
            </body>
        </html>
    );
}

function DefaultTemplate({ data }: { data: EmailData }) {
    return (
        <BaseTemplate title="AariyaIQ Notification">
            <h2>Hello {data.recipientName || "there"},</h2>
            <p>Thank you for your interest in AariyaIQ Learning Hub.</p>
            <p>This is a notification from our system.</p>
            <p>
                If you have any questions, please contact our support team at{" "}
                <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
            </p>
        </BaseTemplate>
    );
}

function SupportTemplate({
    data,
}: {
    data: {
        id: string | null;
        name: string | null;
        email: string | null;
        subject: string | null;
        priority: string | null;
        message: string | null;
    };
}) {
    return (
        <BaseTemplate title={`New Support Request`}>
            <h2 style={{ color: "#0ea5e9" }}>Support Request</h2>
            <div
                style={{
                    margin: "20px 0",
                    padding: "16px",
                    background: "#f0f9ff",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                }}
            >
                <p>
                    <strong>Name:</strong> {data.name || "N/A"}
                </p>
                <p>
                    <strong>Email:</strong> {data.email || "N/A"}
                </p>
                <p>
                    <strong>Subject:</strong> {data.subject || "N/A"}
                </p>
                <p>
                    <strong>Priority:</strong> {data.priority || "N/A"}
                </p>
                <p>
                    <strong>User ID:</strong> {data.id || "N/A"}
                </p>
            </div>
            <div
                style={{
                    margin: "20px 0",
                    padding: "16px",
                    background: "#fff7ed",
                    borderRadius: "8px",
                    border: "1px solid #f59e0b",
                }}
            >
                <h4 style={{ margin: 0, color: "#d97706" }}>Message</h4>
                <p style={{ margin: 0 }}>{data.message || "N/A"}</p>
            </div>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>This email was sent from the AariyaIQ Support form.</p>
        </BaseTemplate>
    );
}

function FeedbackTemplate({
    data,
}: {
    data: {
        name: string | null;
        email: string | null;
        category: string | null;
        rating: string | null;
        message: string | null;
    };
}) {
    return (
        <BaseTemplate title="New Feedback Received">
            <h2 style={{ color: "#10b981" }}>Feedback Submission</h2>
            <div
                style={{
                    margin: "20px 0",
                    padding: "16px",
                    background: "#f0fdf4",
                    borderRadius: "8px",
                    border: "1px solid #bbf7d0",
                }}
            >
                <p>
                    <strong>Name:</strong> {data.name || "N/A"}
                </p>
                <p>
                    <strong>Email:</strong> {data.email || "N/A"}
                </p>
                <p>
                    <strong>Category:</strong> {data.category || "N/A"}
                </p>
                <p>
                    <strong>Rating:</strong> {data.rating || "N/A"}
                </p>
            </div>
            <div
                style={{
                    margin: "20px 0",
                    padding: "16px",
                    background: "#fef9c3",
                    borderRadius: "8px",
                    border: "1px solid #fde68a",
                }}
            >
                <h4 style={{ margin: 0, color: "#ca8a04" }}>Message</h4>
                <p style={{ margin: 0 }}>{data.message || "N/A"}</p>
            </div>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>This email was sent from the AariyaIQ Feedback form.</p>
        </BaseTemplate>
    );
}

function ContactUsTemplate({
    data,
}: {
    data: {
        firstName: string | null;
        lastName: string | null;
        email: string | null;
        phone: string | null;
        subject: string | null;
        message: string | null;
    };
}) {
    return (
        <BaseTemplate title={`New Contact Us Submission`}>
            <h2 style={{ color: "#0ea5e9" }}>Contact Us Submission</h2>
            <div
                style={{
                    margin: "20px 0",
                    padding: "16px",
                    background: "#f0f9ff",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                }}
            >
                <p>
                    <strong>Name:</strong> {data.firstName} {data.lastName}
                </p>
                <p>
                    <strong>Email:</strong> {data.email}
                </p>
                <p>
                    <strong>Phone:</strong> {data.phone}
                </p>
                <p>
                    <strong>Subject:</strong> {data.subject}
                </p>
            </div>
            <div
                style={{
                    margin: "20px 0",
                    padding: "16px",
                    background: "#fff7ed",
                    borderRadius: "8px",
                    border: "1px solid #f59e0b",
                }}
            >
                <h4 style={{ margin: 0, color: "#ca8a04" }}>Message</h4>
                <p style={{ margin: 0 }}>{data.message}</p>
            </div>
            <p style={{ fontSize: "14px", color: "#6b7280" }}>This email was sent from the AariyaIQ Contact Us form.</p>
        </BaseTemplate>
    );
}

function ThankYouTemplate({ firstName, lastName }: { firstName: string | null; lastName: string | null }) {
    const name = firstName || lastName ? `${firstName || ""} ${lastName || ""}`.trim() : "there";

    return (
        <BaseTemplate title="Thank you for contacting us">
            <h2 style={{ color: "#0ea5e9" }}>Thank You for Contacting Us!</h2>
            <p>Hi {name},</p>
            <p>
                Thank you for reaching out to AariyaIQ. We've received your message and appreciate you taking the time
                to contact us.
            </p>
            <p>
                Our team will review your inquiry and get back to you shortly. We typically respond within 24-48 hours
                during business days.
            </p>
            <p>If you have any urgent questions, please don't hesitate to reach out to us directly.</p>
            <p>
                Best regards,
                <br />
                The AariyaIQ Team
            </p>
        </BaseTemplate>
    );
}

function SupportThankYouTemplate({
    name,
    subject,
    priority,
}: {
    name: string | null;
    subject: string | null;
    priority: string | null;
}) {
    const userName = name || "there";
    const priorityText = priority ? ` (Priority: ${priority})` : "";

    return (
        <BaseTemplate title="Support Request Received">
            <h2 style={{ color: "#0ea5e9" }}>Support Request Received</h2>
            <p>Hi {userName},</p>
            <p>
                Thank you for contacting AariyaIQ Support. We've received your support request{priorityText} and our
                team is already working on it.
            </p>
            <p>
                <strong>Your request:</strong> {subject || "Support Request"}
            </p>
            <p>We'll get back to you as soon as possible. Response times vary based on priority level:</p>
            <ul>
                <li>
                    <strong>High Priority:</strong> Within 2-4 hours
                </li>
                <li>
                    <strong>Medium Priority:</strong> Within 24 hours
                </li>
                <li>
                    <strong>Low Priority:</strong> Within 48 hours
                </li>
            </ul>
            <p>If you need immediate assistance or have additional information to add, please reply to this email.</p>
            <p>
                Best regards,
                <br />
                The AariyaIQ Support Team
            </p>
        </BaseTemplate>
    );
}

function FeedbackThankYouTemplate({
    name,
    rating,
    category,
}: {
    name: string | null;
    rating: string | null;
    category: string | null;
}) {
    const userName = name || "there";
    const categoryText = category ? ` about ${category}` : "";

    return (
        <BaseTemplate title="Thank you for your feedback">
            <h2 style={{ color: "#10b981" }}>Thank You for Your Feedback!</h2>
            <p>Hi {userName},</p>
            <p>
                Thank you for taking the time to share your feedback{categoryText} with AariyaIQ. Your input is
                invaluable in helping us improve our services.
            </p>
            {rating && (
                <p>
                    We appreciate your <strong>{rating}</strong> rating and will use your insights to enhance our
                    platform.
                </p>
            )}
            <p>Your feedback helps us:</p>
            <ul>
                <li>Understand what's working well</li>
                <li>Identify areas for improvement</li>
                <li>Build features that matter to you</li>
                <li>Deliver a better user experience</li>
            </ul>
            <p>If you have any additional thoughts or suggestions, feel free to reach out to us anytime.</p>
            <p>Thank you for being part of the AariyaIQ community!</p>
            <p>
                Best regards,
                <br />
                The AariyaIQ Team
            </p>
        </BaseTemplate>
    );
}

/**
 * Send an email notification using React template
 * @param type Email template type
 * @param data Email data
 * @returns Promise with send result
 */
export async function sendEmail(type: EmailType, data: EmailData) {
    try {
        logger.log(`[EMAIL SERVICE] Starting email send process for type: ${type}`);
        logger.log(`[EMAIL SERVICE] Recipient: ${data.recipientEmail}`);

        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            logger.error("[EMAIL SERVICE] RESEND_API_KEY not found in environment variables");
            return {
                success: false,
                error: "Email service not configured. Please contact administrator.",
                debug: { step: "api_key_check", hasKey: false },
            };
        }
        logger.log(`[EMAIL SERVICE] API key found, length: ${apiKey.length}`);

        let resend;
        try {
            resend = new Resend(apiKey);
            logger.log("[EMAIL SERVICE] Resend client initialized successfully");
        } catch (initError) {
            const errorMsg = initError instanceof Error ? initError.message : String(initError);
            logger.error("[EMAIL SERVICE] Failed to initialize Resend:", errorMsg);
            return {
                success: false,
                error: "Failed to initialize email service",
                debug: { step: "resend_init", error: errorMsg },
            };
        }

        // Render React email template to HTML
        let emailHtml: string;
        try {
            emailHtml = await render(<EmailTemplate type={type} data={data} />);
            logger.log(`[EMAIL SERVICE] Email HTML generated successfully, length: ${emailHtml.length}`);

            if (typeof emailHtml !== "string") {
                throw new Error(`Email HTML is not a string, got: ${typeof emailHtml}`);
            }
        } catch (renderError) {
            const errorMsg = renderError instanceof Error ? renderError.message : String(renderError);
            logger.error("[EMAIL SERVICE] Failed to generate email HTML:", errorMsg);
            return {
                success: false,
                error: "Failed to generate email content",
                debug: { step: "html_generation", error: errorMsg },
            };
        }

        // Get email subject based on type
        const subject = getEmailSubject(type, data);
        logger.log(`[EMAIL SERVICE] Email subject: ${subject}`);

        const emailData = {
            from: `AariyaIQ <${emailConfig.sender}>`,
            to: data.recipientEmail,
            subject: subject,
            html: emailHtml,
        };
        logger.log(`[EMAIL SERVICE] Attempting to send email via Resend API`);
        logger.log(`[EMAIL SERVICE] Email data prepared:`, {
            from: emailData.from,
            to: emailData.to,
            subject: emailData.subject,
            htmlLength: emailHtml.length,
            htmlType: typeof emailHtml,
        });

        const result = await resend.emails.send(emailData);
        const messageId = (result as any).id || (result as any).data?.id || null;
        logger.log(`[EMAIL SERVICE] Email sent successfully! Message ID: ${messageId}`);

        return {
            success: true,
            messageId,
            debug: {
                step: "send_success",
                subject,
                recipient: data.recipientEmail,
                type,
                htmlLength: emailHtml.length,
            },
        };
    } catch (error) {
        logger.error("[EMAIL SERVICE] Error sending email:", error);
        let errorMessage = "Failed to send email. Please try again later.";
        const debugInfo: any = { step: "send_error" };
        if (error instanceof Error) {
            debugInfo.errorMessage = error.message;
            debugInfo.errorName = error.name;
            if (error.message.includes("API key")) {
                errorMessage = "Email service configuration error. Please contact administrator.";
                debugInfo.issue = "api_key_invalid";
            } else if (error.message.includes("domain")) {
                errorMessage = "Email domain not verified. Please contact administrator.";
                debugInfo.issue = "domain_not_verified";
            } else if (error.message.includes("rate limit")) {
                errorMessage = "Email rate limit exceeded. Please try again later.";
                debugInfo.issue = "rate_limit";
            } else if (error.message.includes("invalid email")) {
                errorMessage = "Invalid email address provided.";
                debugInfo.issue = "invalid_email";
            } else if (error.message.includes("validation_error")) {
                errorMessage = "Email validation error. Please check the email format.";
                debugInfo.issue = "validation_error";
            }
        }
        return {
            success: false,
            error: errorMessage,
            debug: debugInfo,
        };
    }
}

/**
 * Get email subject based on type
 */
function getEmailSubject(type: EmailType, data: EmailData): string {
    const subjects: Record<EmailType, string> = {
        "instructor-application-received": "Your AariyaIQ Instructor Application - Received",
        "instructor-final-approval": "Congratulations! Your AariyaIQ Instructor Application is Approved",
        "instructor-rejection": "Update on Your AariyaIQ Instructor Application",
        "instructor-ban": "Your AariyaIQ Instructor Account Has Been Banned",
        "instructor-suspend": "Your AariyaIQ Instructor Account Has Been Suspended",

        "learner-course-application": `Your AariyaIQ Course Application: ${data.courseName || "Course"} - Received`,
        "learner-initial-approval": `Your AariyaIQ Registration: ${data.courseName || "Course"} - Initially Approved`,
        "learner-rejection": `Update on Your AariyaIQ Course Application`,
        "learner-final-approval": `Congratulations! Your AariyaIQ Course Application is Approved`,

        "launch-page-notification": "Thank you for your interest in AariyaIQ!",
        "admin-launch-notification": "Someone has shown interest - AariyaIQ",
    };

    return subjects[type];
}

/**
 * Test email service configuration
 */
export async function testEmailService() {
    try {
        logger.log("[EMAIL SERVICE] Testing email service configuration...");

        const apiKey = process.env.RESEND_API_KEY;

        if (!apiKey) {
            logger.error("[EMAIL SERVICE] No API key found");
            return {
                success: false,
                error: "RESEND_API_KEY environment variable is not set",
                debug: {
                    hasApiKey: false,
                    apiKeyFormat: "N/A",
                    environment: process.env.NODE_ENV || "unknown",
                    timestamp: new Date().toISOString(),
                },
            };
        }

        logger.log(`[EMAIL SERVICE] API key found, checking format...`);

        if (!apiKey.startsWith("re_")) {
            logger.error("[EMAIL SERVICE] Invalid API key format");
            return {
                success: false,
                error: "Invalid API key format. Should start with 're_'",
                debug: {
                    hasApiKey: true,
                    apiKeyFormat: "Invalid",
                    keyPrefix: apiKey.substring(0, 3),
                    keyLength: apiKey.length,
                    environment: process.env.NODE_ENV || "unknown",
                    timestamp: new Date().toISOString(),
                },
            };
        }

        logger.log("[EMAIL SERVICE] API key format is valid");

        // Try to initialize Resend
        try {
            const resend = new Resend(apiKey);
            logger.log("[EMAIL SERVICE] Resend client created successfully");

            return {
                success: true,
                message: "Email service configured correctly",
                debug: {
                    hasApiKey: true,
                    apiKeyFormat: "Valid",
                    keyPrefix: apiKey.substring(0, 3),
                    keyLength: apiKey.length,
                    environment: process.env.NODE_ENV || "unknown",
                    sender: emailConfig.sender,
                    timestamp: new Date().toISOString(),
                },
            };
        } catch (resendError) {
            logger.error("[EMAIL SERVICE] Failed to create Resend client:", resendError);
            return {
                success: false,
                error: "Failed to initialize Resend client",
                debug: {
                    hasApiKey: true,
                    apiKeyFormat: "Valid",
                    initError: resendError instanceof Error ? resendError.message : "Unknown error",
                    environment: process.env.NODE_ENV || "unknown",
                    timestamp: new Date().toISOString(),
                },
            };
        }
    } catch (error) {
        logger.error("[EMAIL SERVICE] Test service error:", error);
        return {
            success: false,
            error: error instanceof Error ? error.message : "Unknown error",
            debug: {
                hasApiKey: !!process.env.RESEND_API_KEY,
                apiKeyFormat: process.env.RESEND_API_KEY?.startsWith("re_") ? "Valid" : "Invalid",
                environment: process.env.NODE_ENV || "unknown",
                testError: error instanceof Error ? error.message : "Unknown error",
                timestamp: new Date().toISOString(),
            },
        };
    }
}

export async function sendSupportEmail({
    id,
    name,
    email,
    subject,
    priority,
    message,
}: {
    id: string | null;
    name: string | null;
    email: string | null;
    subject: string | null;
    priority: string | null;
    message: string | null;
}) {
    try {
        logger.log(`[SUPPORT/FEEDBACK EMAIL] Type: Support, From: ${email}, Name: ${name}`);

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            logger.error("[SUPPORT/FEEDBACK EMAIL] RESEND_API_KEY not found");
            return {
                success: false,
                error: "Email service not configured. Please contact administrator.",
                debug: { step: "api_key_check", hasKey: false },
            };
        }

        let resend;
        try {
            resend = new Resend(apiKey);
        } catch (initError) {
            logger.error("[SUPPORT/FEEDBACK EMAIL] Failed to initialize Resend:", initError);
            return {
                success: false,
                error: "Failed to initialize email service",
                debug: { step: "resend_init", error: String(initError) },
            };
        }

        // Compose the email HTML
        let emailHtml: string;
        try {
            emailHtml = await render(<SupportTemplate data={{ id, name, email, subject, priority, message }} />);
        } catch (renderError) {
            logger.error("[SUPPORT/FEEDBACK EMAIL] Failed to render template:", renderError);
            return {
                success: false,
                error: "Failed to generate email content",
                debug: { step: "html_generation", error: String(renderError) },
            };
        }

        const emailData: CreateEmailOptions = {
            from: `AariyaIQ Support <${emailConfig.sender}>`,
            to: emailConfig.sender,
            subject: `[Support] ${subject || "No Subject"}`,
            html: emailHtml,
        };

        // Send admin notification email
        const adminResult = await resend.emails.send(emailData);
        logger.log("[SUPPORT/FEEDBACK EMAIL] Admin email sent result:", adminResult);

        if (adminResult.error) {
            logger.error("[SUPPORT/FEEDBACK EMAIL] Error sending admin email:", adminResult.error);
            throw new Error(adminResult.error.message);
        }

        // Send thank you email to sender (only if email is provided)
        let thankYouResult = null;
        if (email) {
            try {
                const thankYouHtml = await render(
                    <SupportThankYouTemplate name={name} subject={subject} priority={priority} />
                );

                const thankYouEmailData: CreateEmailOptions = {
                    from: `AariyaIQ Support <${emailConfig.sender}>`,
                    to: email,
                    subject: "Your support request has been received",
                    html: thankYouHtml,
                };

                thankYouResult = await resend.emails.send(thankYouEmailData);
                logger.log("[SUPPORT/FEEDBACK EMAIL] Thank you email sent result:", thankYouResult);

                if (thankYouResult.error) {
                    logger.error("[SUPPORT/FEEDBACK EMAIL] Error sending thank you email:", thankYouResult.error);
                    // Don't throw here - admin email was successful
                }
            } catch (thankYouError) {
                logger.error("[SUPPORT/FEEDBACK EMAIL] Failed to send thank you email:", thankYouError);
                // Don't throw here - admin email was successful
            }
        }

        const adminMessageId = (adminResult as any).id || (adminResult as any).data?.id || null;
        const thankYouMessageId = thankYouResult
            ? (thankYouResult as any).id || (thankYouResult as any).data?.id || null
            : null;

        return {
            success: true,
            messageId: adminMessageId,
            thankYouMessageId,
            debug: {
                step: "send_success",
                type: "support",
                from: email,
                subject,
                thankYouSent: !!thankYouMessageId,
            },
        };
    } catch (error) {
        logger.error("[SUPPORT/FEEDBACK EMAIL] Error sending email:", error);
        return {
            success: false,
            error: "Failed to send support/feedback email. Please try again later.",
            debug: { step: "send_error", error: error instanceof Error ? error.message : String(error) },
        };
    }
}

export async function sendFeedbackEmail({
    name,
    email,
    category,
    rating,
    message,
}: {
    name: string | null;
    email: string | null;
    category: string | null;
    rating: string | null;
    message: string | null;
}) {
    try {
        logger.log(`[SUPPORT/FEEDBACK EMAIL] Type: FEEDBACK, From: ${email}, Name: ${name}`);

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            logger.error("[SUPPORT/FEEDBACK EMAIL] RESEND_API_KEY not found");
            return {
                success: false,
                error: "Email service not configured. Please contact administrator.",
                debug: { step: "api_key_check", hasKey: false },
            };
        }

        let resend;
        try {
            resend = new Resend(apiKey);
        } catch (initError) {
            logger.error("[SUPPORT/FEEDBACK EMAIL] Failed to initialize Resend:", initError);
            return {
                success: false,
                error: "Failed to initialize email service",
                debug: { step: "resend_init", error: String(initError) },
            };
        }

        // Compose the email HTML
        let emailHtml: string;
        try {
            emailHtml = await render(<FeedbackTemplate data={{ name, email, category, rating, message }} />);
        } catch (renderError) {
            logger.error("[SUPPORT/FEEDBACK EMAIL] Failed to render template:", renderError);
            return {
                success: false,
                error: "Failed to generate email content",
                debug: { step: "html_generation", error: String(renderError) },
            };
        }

        const emailData: CreateEmailOptions = {
            from: `AariyaIQ FEEDBACK <${emailConfig.sender}>`,
            to: emailConfig.sender,
            subject: "[FEEDBACK]",
            html: emailHtml,
        };

        // Send admin notification email
        const adminResult = await resend.emails.send(emailData);
        logger.log("[SUPPORT/FEEDBACK EMAIL] Admin email sent result:", adminResult);

        if (adminResult.error) {
            logger.error("[SUPPORT/FEEDBACK EMAIL] Error sending admin email:", adminResult.error);
            throw new Error(adminResult.error.message);
        }

        // Send thank you email to sender (only if email is provided)
        let thankYouResult = null;
        if (email) {
            try {
                const thankYouHtml = await render(
                    <FeedbackThankYouTemplate name={name} rating={rating} category={category} />
                );

                const thankYouEmailData: CreateEmailOptions = {
                    from: `AariyaIQ <${emailConfig.sender}>`,
                    to: email,
                    subject: "Thank you for your feedback",
                    html: thankYouHtml,
                };

                thankYouResult = await resend.emails.send(thankYouEmailData);
                logger.log("[SUPPORT/FEEDBACK EMAIL] Thank you email sent result:", thankYouResult);

                if (thankYouResult.error) {
                    logger.error("[SUPPORT/FEEDBACK EMAIL] Error sending thank you email:", thankYouResult.error);
                    // Don't throw here - admin email was successful
                }
            } catch (thankYouError) {
                logger.error("[SUPPORT/FEEDBACK EMAIL] Failed to send thank you email:", thankYouError);
                // Don't throw here - admin email was successful
            }
        }

        const adminMessageId = (adminResult as any).id || (adminResult as any).data?.id || null;
        const thankYouMessageId = thankYouResult
            ? (thankYouResult as any).id || (thankYouResult as any).data?.id || null
            : null;

        return {
            success: true,
            messageId: adminMessageId,
            thankYouMessageId,
            debug: {
                step: "send_success",
                type: "feedback",
                from: email,
                subject: "FEEDBACK",
                thankYouSent: !!thankYouMessageId,
            },
        };
    } catch (error) {
        logger.error("[SUPPORT/FEEDBACK EMAIL] Error sending email:", error);
        return {
            success: false,
            error: "Failed to send support/feedback email. Please try again later.",
            debug: { step: "send_error", error: error instanceof Error ? error.message : String(error) },
        };
    }
}

export async function sendContactUsEmail({
    firstName,
    lastName,
    email,
    phone,
    subject,
    message,
}: {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phone: string | null;
    subject: string | null;
    message: string | null;
}) {
    try {
        logger.log(`[CONTACT US EMAIL] From: ${email}, Name: ${firstName} ${lastName}`);

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            logger.error("[CONTACT US EMAIL] RESEND_API_KEY not found");
            return {
                success: false,
                error: "Email service not configured. Please contact administrator.",
                debug: { step: "api_key_check", hasKey: false },
            };
        }

        let resend;
        try {
            resend = new Resend(apiKey);
        } catch (initError) {
            logger.error("[CONTACT US EMAIL] Failed to initialize Resend:", initError);
            return {
                success: false,
                error: "Failed to initialize email service",
                debug: { step: "resend_init", error: String(initError) },
            };
        }

        // Compose the email HTML using a React template
        let emailHtml: string;
        try {
            emailHtml = await render(
                <ContactUsTemplate data={{ firstName, lastName, email, phone, subject, message }} />
            );
        } catch (renderError) {
            logger.error("[CONTACT US EMAIL] Failed to render template:", renderError);
            return {
                success: false,
                error: "Failed to generate email content",
                debug: { step: "html_generation", error: String(renderError) },
            };
        }

        const emailData: CreateEmailOptions = {
            from: `AariyaIQ Contact <${emailConfig.sender}>`,
            to: emailConfig.sender,
            subject: `[Contact Us] ${subject || "No Subject"}`,
            html: emailHtml,
        };

        // Send admin notification email
        const adminResult = await resend.emails.send(emailData);
        logger.log("[CONTACT US EMAIL] Admin email sent result:", adminResult);

        if (adminResult.error) {
            logger.error("[CONTACT US EMAIL] Error sending admin email:", adminResult.error);
            throw new Error(adminResult.error.message);
        }

        // Send thank you email to sender (only if email is provided)
        let thankYouResult = null;
        if (email) {
            try {
                const thankYouHtml = await render(<ThankYouTemplate firstName={firstName} lastName={lastName} />);

                const thankYouEmailData: CreateEmailOptions = {
                    from: `AariyaIQ <${emailConfig.sender}>`,
                    to: email,
                    subject: "Thank you for contacting AariyaIQ",
                    html: thankYouHtml,
                };

                thankYouResult = await resend.emails.send(thankYouEmailData);
                logger.log("[CONTACT US EMAIL] Thank you email sent result:", thankYouResult);

                if (thankYouResult.error) {
                    logger.error("[CONTACT US EMAIL] Error sending thank you email:", thankYouResult.error);
                    // Don't throw here - admin email was successful
                }
            } catch (thankYouError) {
                logger.error("[CONTACT US EMAIL] Failed to send thank you email:", thankYouError);
                // Don't throw here - admin email was successful
            }
        }

        const adminMessageId = (adminResult as any).id || (adminResult as any).data?.id || null;
        const thankYouMessageId = thankYouResult
            ? (thankYouResult as any).id || (thankYouResult as any).data?.id || null
            : null;

        return {
            success: true,
            messageId: adminMessageId,
            thankYouMessageId,
            debug: {
                step: "send_success",
                type: "contact-us",
                from: email,
                subject,
                thankYouSent: !!thankYouMessageId,
            },
        };
    } catch (error) {
        logger.error("[CONTACT US EMAIL] Error sending email:", error);
        return {
            success: false,
            error: "Failed to send contact email. Please try again later.",
            debug: { step: "send_error", error: error instanceof Error ? error.message : String(error) },
        };
    }
}
