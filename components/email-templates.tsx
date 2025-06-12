import type React from "react"
import type { EmailData, EmailType } from "@/lib/email-service"

interface EmailTemplateProps {
  type: EmailType
  data: EmailData
}

export function EmailTemplate({ type, data }: EmailTemplateProps) {
  // Get the appropriate template based on the email type
  switch (type) {
    case "learner-registration-received":
      return <LearnerRegistrationReceivedTemplate data={data} />
    case "learner-initial-approval":
      return <LearnerInitialApprovalTemplate data={data} />
    case "learner-payment-required":
      return <LearnerPaymentRequiredTemplate data={data} />
    case "learner-compliance-check":
      return <LearnerComplianceCheckTemplate data={data} />
    case "learner-final-approval":
      return <LearnerFinalApprovalTemplate data={data} />
    case "instructor-application-received":
      return <InstructorApplicationReceivedTemplate data={data} />
    case "instructor-initial-approval":
      return <InstructorInitialApprovalTemplate data={data} />
    case "instructor-payment-required":
      return <InstructorPaymentRequiredTemplate data={data} />
    case "instructor-compliance-check":
      return <InstructorComplianceCheckTemplate data={data} />
    case "instructor-final-approval":
      return <InstructorFinalApprovalTemplate data={data} />
    case "password-reset":
      return <PasswordResetTemplate data={data} />
    case "launch-page-notification":
      return <LaunchPageNotificationTemplate data={data} />
    case "admin-launch-notification":
      return <AdminLaunchNotificationTemplate data={data} />
    default:
      return <DefaultTemplate data={data} />
  }
}

// Launch Page Notification Template (User)
function LaunchPageNotificationTemplate({ data }: { data: EmailData }) {
  return (
    <BaseTemplate title="Thank you for your interest in AariyaIQ!">
      <h2>Hello {data.recipientName},</h2>
      <p>
        Thank you for showing interest in <strong>AariyaIQ</strong>! We're excited to have you join our community of
        learners and innovators.
      </p>
      <p>
        We're working hard to bring you an amazing learning experience. You'll be among the first to know when we
        launch!
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
  )
}

// Admin Launch Notification Template
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
      <p style={{ fontSize: "14px", color: "#6b7280" }}>This notification was sent from the AariyaIQ launch page.</p>
    </BaseTemplate>
  )
}

// Base email template with common styling
function BaseTemplate({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>{title}</title>
        <style>{`
          /* Base styles */
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
              AariyaTech Ltd | hello@aariyatech.co.uk | © {new Date().getFullYear()} AariyaIQ Learning Hub. All rights
              reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  )
}

// Default template as a fallback
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
  )
}

// All other existing template functions remain the same...
function LearnerRegistrationReceivedTemplate({ data }: { data: EmailData }) {
  return (
    <BaseTemplate title="Registration Received">
      <h2>Hello {data.recipientName || "there"},</h2>
      <p>
        Thank you for registering for <strong>{data.courseName || "our course"}</strong> at AariyaIQ Learning Hub. We
        have received your application and it is currently under review.
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
  )
}

function LearnerInitialApprovalTemplate({ data }: { data: EmailData }) {
  return (
    <BaseTemplate title="Initial Approval">
      <h2>Hello {data.recipientName || "there"},</h2>
      <p>
        Great news! Your application for <strong>{data.courseName || "our course"}</strong> has been initially approved.
        To secure your spot, please complete the payment process.
      </p>
      <p>
        <strong>Course:</strong> {data.courseName || "Our course"}
        <br />
        <strong>Start Date:</strong> {data.courseStartDate || "To be announced"}
        <br />
        <strong>Payment Amount:</strong> {data.paymentAmount || "Please contact us for details"}
      </p>
      {data.paymentLink && (
        <p>
          Please click the button below to complete your payment:
          <br />
          <a href={data.paymentLink} className="button">
            Complete Payment
          </a>
        </p>
      )}
      <p>
        After your payment is processed, your application will move to the compliance check stage. You can track your
        application status anytime by logging into your dashboard.
      </p>
      <p>
        If you have any questions, please contact our support team at{" "}
        <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
      </p>
    </BaseTemplate>
  )
}

function PasswordResetTemplate({ data }: { data: EmailData }) {
  return (
    <BaseTemplate title="Reset Your Password">
      <h2>Hello {data.recipientName || "there"},</h2>
      <p>We received a request to reset your password for your AariyaIQ Learning Hub account.</p>
      {data.resetLink && (
        <p>
          To reset your password, please click the button below:
          <br />
          <a href={data.resetLink} className="button">
            Reset Password
          </a>
        </p>
      )}
      <div className="alert">
        <h4 className="alert-title">Important</h4>
        <p className="alert-content">
          This link will expire in {data.resetExpiry || "24 hours"}. If you did not request a password reset, please
          ignore this email or contact us if you have concerns.
        </p>
      </div>
      {data.resetLink && (
        <p>
          If the button above doesn't work, copy and paste the following link into your browser:
          <br />
          <a href={data.resetLink}>{data.resetLink}</a>
        </p>
      )}
      <p>
        If you have any questions, please contact our support team at{" "}
        <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
      </p>
    </BaseTemplate>
  )
}

// Placeholder for other template functions
function LearnerPaymentRequiredTemplate({ data }: { data: EmailData }) {
  return (
    <BaseTemplate title="Payment Required">
      <h2>Hello {data.recipientName || "there"},</h2>
      <p>
        Thank you for your interest in <strong>{data.courseName || "our course"}</strong> at AariyaIQ Learning Hub.
      </p>
      <p>
        <strong>Course:</strong> {data.courseName || "Our course"}
        <br />
        <strong>Start Date:</strong> {data.courseStartDate || "To be announced"}
        <br />
        <strong>Payment Amount:</strong> {data.paymentAmount || "Please contact us for details"}
      </p>
      {data.paymentLink && (
        <p>
          Please click the button below to complete your payment:
          <br />
          <a href={data.paymentLink} className="button">
            Complete Payment
          </a>
        </p>
      )}
      <p>
        If you have any questions, please contact our support team at{" "}
        <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
      </p>
    </BaseTemplate>
  )
}

function LearnerComplianceCheckTemplate({ data }: { data: EmailData }) {
  return (
    <BaseTemplate title="Compliance Check">
      <h2>Hello {data.recipientName || "there"},</h2>
      <p>
        Your application for <strong>{data.courseName || "our course"}</strong> at AariyaIQ Learning Hub is currently
        undergoing a compliance check.
      </p>
      <p>
        <strong>Course:</strong> {data.courseName || "Our course"}
        <br />
        <strong>Start Date:</strong> {data.courseStartDate || "To be announced"}
      </p>
      <p>
        We will notify you once your application has been reviewed. You can track your application status anytime by
        logging into your dashboard.
      </p>
      <p>
        If you have any questions, please contact our support team at{" "}
        <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
      </p>
    </BaseTemplate>
  )
}

function LearnerFinalApprovalTemplate({ data }: { data: EmailData }) {
  return (
    <BaseTemplate title="Final Approval">
      <h2>Hello {data.recipientName || "there"},</h2>
      <p>
        Congratulations! Your application for <strong>{data.courseName || "our course"}</strong> at AariyaIQ Learning
        Hub has been finalized and approved.
      </p>
      <p>
        <strong>Course:</strong> {data.courseName || "Our course"}
        <br />
        <strong>Start Date:</strong> {data.courseStartDate || "To be announced"}
      </p>
      <p>
        You can now access your course materials and start learning. If you have any questions, please contact our
        support team at <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
      </p>
    </BaseTemplate>
  )
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
  )
}

function InstructorInitialApprovalTemplate({ data }: { data: EmailData }) {
  return (
    <BaseTemplate title="Initial Approval">
      <h2>Hello {data.recipientName || "there"},</h2>
      <p>
        Great news! Your instructor application for AariyaIQ Learning Hub has been initially approved. To secure your
        position, please complete the payment process.
      </p>
      <p>
        <strong>Payment Amount:</strong> {data.paymentAmount || "Please contact us for details"}
      </p>
      {data.paymentLink && (
        <p>
          Please click the button below to complete your payment:
          <br />
          <a href={data.paymentLink} className="button">
            Complete Payment
          </a>
        </p>
      )}
      <p>
        After your payment is processed, your application will move to the compliance check stage. You can track your
        application status anytime by logging into your dashboard.
      </p>
      <p>
        If you have any questions, please contact our support team at{" "}
        <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
      </p>
    </BaseTemplate>
  )
}

function InstructorPaymentRequiredTemplate({ data }: { data: EmailData }) {
  return (
    <BaseTemplate title="Payment Required">
      <h2>Hello {data.recipientName || "there"},</h2>
      <p>Thank you for your interest in becoming an instructor with AariyaIQ Learning Hub.</p>
      <p>
        <strong>Payment Amount:</strong> {data.paymentAmount || "Please contact us for details"}
      </p>
      {data.paymentLink && (
        <p>
          Please click the button below to complete your payment:
          <br />
          <a href={data.paymentLink} className="button">
            Complete Payment
          </a>
        </p>
      )}
      <p>
        If you have any questions, please contact our support team at{" "}
        <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
      </p>
    </BaseTemplate>
  )
}

function InstructorComplianceCheckTemplate({ data }: { data: EmailData }) {
  return (
    <BaseTemplate title="Compliance Check">
      <h2>Hello {data.recipientName || "there"},</h2>
      <p>Your instructor application for AariyaIQ Learning Hub is currently undergoing a compliance check.</p>
      <p>
        We will notify you once your application has been reviewed. You can track your application status anytime by
        logging into your dashboard.
      </p>
      <p>
        If you have any questions, please contact our support team at{" "}
        <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
      </p>
    </BaseTemplate>
  )
}

function InstructorFinalApprovalTemplate({ data }: { data: EmailData }) {
  return (
    <BaseTemplate title="Final Approval">
      <h2>Hello {data.recipientName || "there"},</h2>
      <p>Congratulations! Your instructor application for AariyaIQ Learning Hub has been finalized and approved.</p>
      <p>
        You can now start creating and managing courses. If you have any questions, please contact our support team at{" "}
        <a href="mailto:hello@aariyatech.co.uk">hello@aariyatech.co.uk</a>.
      </p>
    </BaseTemplate>
  )
}
