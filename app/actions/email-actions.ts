"use server";

import { EmailData, sendEmail } from "@/lib/email-service";

export async function sendLearnerRegistrationEmail(data: {
    learnerName: string;
    learnerEmail: string;
    courseName: string;
    courseStartDate: string;
    applicationDate: string;
    loginLink: string;
}) {
    const emailData: EmailData = {
        recipientName: data.learnerName,
        recipientEmail: data.learnerEmail,
        courseName: data.courseName,
        courseStartDate: data.courseStartDate,
        applicationDate: data.applicationDate,
        loginLink: data.loginLink,
    };

    return sendEmail("learner-registration-received", emailData);
}

export async function sendLearnerInitialApprovalEmail(data: {
    learnerName: string;
    learnerEmail: string;
    courseName: string;
    courseStartDate: string;
    paymentAmount: string;
    paymentLink: string;
    loginLink: string;
}) {
    const emailData: EmailData = {
        recipientName: data.learnerName,
        recipientEmail: data.learnerEmail,
        courseName: data.courseName,
        courseStartDate: data.courseStartDate,
        paymentAmount: data.paymentAmount,
        paymentLink: data.paymentLink,
        loginLink: data.loginLink,
    };

    return sendEmail("learner-initial-approval", emailData);
}

export async function sendLearnerPaymentEmail(data: {
    learnerName: string;
    learnerEmail: string;
    courseName: string;
    courseStartDate: string;
    paymentAmount: string;
    paymentLink: string;
}) {
    const emailData: EmailData = {
        recipientName: data.learnerName,
        recipientEmail: data.learnerEmail,
        courseName: data.courseName,
        courseStartDate: data.courseStartDate,
        paymentAmount: data.paymentAmount,
        paymentLink: data.paymentLink,
    };

    return sendEmail("learner-payment-required", emailData);
}

export async function sendLearnerComplianceEmail(data: {
    learnerName: string;
    learnerEmail: string;
    courseName: string;
    loginLink: string;
}) {
    const emailData: EmailData = {
        recipientName: data.learnerName,
        recipientEmail: data.learnerEmail,
        courseName: data.courseName,
        loginLink: data.loginLink,
    };

    return sendEmail("learner-compliance-check", emailData);
}

export async function sendLearnerFinalApprovalEmail(data: {
    learnerName: string;
    learnerEmail: string;
    courseName: string;
    courseStartDate: string;
    loginLink: string;
    nextSteps: string[];
}) {
    const emailData: EmailData = {
        recipientName: data.learnerName,
        recipientEmail: data.learnerEmail,
        courseName: data.courseName,
        courseStartDate: data.courseStartDate,
        loginLink: data.loginLink,
        nextSteps: data.nextSteps,
    };

    return sendEmail("learner-final-approval", emailData);
}

export async function sendInstructorApplicationEmail(data: {
    instructorName: string;
    instructorEmail: string;
    expertise: string;
    applicationDate: string;
    loginLink: string;
}) {
    const emailData: EmailData = {
        recipientName: data.instructorName,
        recipientEmail: data.instructorEmail,
        expertise: data.expertise,
        applicationDate: data.applicationDate,
        loginLink: data.loginLink,
    };

    return sendEmail("instructor-application-received", emailData);
}

export async function sendInstructorInitialApprovalEmail(data: {
    instructorName: string;
    instructorEmail: string;
    expertise: string;
    paymentAmount: string;
    paymentLink: string;
    loginLink: string;
}) {
    const emailData: EmailData = {
        recipientName: data.instructorName,
        recipientEmail: data.instructorEmail,
        expertise: data.expertise,
        paymentAmount: data.paymentAmount,
        paymentLink: data.paymentLink,
        loginLink: data.loginLink,
    };

    return sendEmail("instructor-initial-approval", emailData);
}

export async function sendInstructorPaymentEmail(data: {
    instructorName: string;
    instructorEmail: string;
    paymentAmount: string;
    paymentLink: string;
}) {
    const emailData: EmailData = {
        recipientName: data.instructorName,
        recipientEmail: data.instructorEmail,
        paymentAmount: data.paymentAmount,
        paymentLink: data.paymentLink,
    };

    return sendEmail("instructor-payment-required", emailData);
}

export async function sendInstructorComplianceEmail(data: {
    instructorName: string;
    instructorEmail: string;
    loginLink: string;
}) {
    const emailData: EmailData = {
        recipientName: data.instructorName,
        recipientEmail: data.instructorEmail,
        loginLink: data.loginLink,
    };

    return sendEmail("instructor-compliance-check", emailData);
}

export async function sendInstructorFinalApprovalEmail(data: {
    instructorName: string;
    instructorEmail: string;
    loginLink: string;
    nextSteps: string[];
}) {
    const emailData: EmailData = {
        recipientName: data.instructorName,
        recipientEmail: data.instructorEmail,
        loginLink: data.loginLink,
        nextSteps: data.nextSteps,
    };

    return sendEmail("instructor-final-approval", emailData);
}

export async function sendInstructorRejectionEmail(data: {
    instructorName: string;
    instructorEmail: string;
    loginLink: string;
    nextSteps: string[];
}) {
    const emailData: EmailData = {
        recipientName: data.instructorName,
        recipientEmail: data.instructorEmail,
        loginLink: data.loginLink,
        nextSteps: data.nextSteps,
    };

    return sendEmail("instructor-rejection", emailData);
}
