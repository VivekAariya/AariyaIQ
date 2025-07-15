"use server";

import { EmailData, sendEmail } from "@/lib/email-service";

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

export async function sendInstructorBanEmail(data: {
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

    return sendEmail("instructor-ban", emailData);
}

export async function sendInstructorSuspendEmail(data: {
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

    return sendEmail("instructor-suspend", emailData);
}

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

    return sendEmail("learner-course-application", emailData);
}

export async function sendLearnerInitialApprovalEmail(data: {
    learnerName: string;
    learnerEmail: string;
    courseName: string;
    courseStartDate: string;
    paymentAmount: string;
}) {
    const emailData: EmailData = {
        recipientName: data.learnerName,
        recipientEmail: data.learnerEmail,
        courseName: data.courseName,
        courseStartDate: data.courseStartDate,
        paymentAmount: data.paymentAmount,
    };

    return sendEmail("learner-initial-approval", emailData);
}

export async function sendLearnerRejectionEmail(data: {
    learnerName: string;
    learnerEmail: string;
    courseName: string;
}) {
    const emailData: EmailData = {
        recipientName: data.learnerName,
        recipientEmail: data.learnerEmail,
        courseName: data.courseName,
    };

    return sendEmail("learner-rejection", emailData);
}

export async function sendLearnerFinalApprovalEmail(data: {
    learnerName: string;
    learnerEmail: string;
    courseName: string;
    courseStartDate: string;
}) {
    const emailData: EmailData = {
        recipientName: data.learnerName,
        recipientEmail: data.learnerEmail,
        courseName: data.courseName,
        courseStartDate: data.courseStartDate,
    };

    return sendEmail("learner-final-approval", emailData);
}

export async function sendLaunchPageNotification(data: { recipientName: string; recipientEmail: string }) {
    const emailData: EmailData = {
        recipientName: data.recipientName,
        recipientEmail: data.recipientEmail,
        nextSteps: [
            "Watch for our launch announcement",
            "Prepare to explore our cutting-edge courses",
            "Share with colleagues who might be interested",
        ],
    };

    return sendEmail("launch-page-notification", emailData);
}

export async function sendAdminLaunchPageNotification(data: {
    recipientName: string;
    recipientEmail: string;
    applicationDate: string;
    expertise: string;
}) {
    const emailData: EmailData = {
        recipientName: data.recipientName,
        recipientEmail: data.recipientEmail,
        applicationDate: data.applicationDate,
        expertise: data.expertise,
    };

    return sendEmail("admin-launch-notification", emailData);
}

export async function sendCourseFinalApprovalEmail(data: {
    courseTitle: string;
    instructorName: string;
    instructorEmail: string;
}) {
    const emailData: EmailData = {
        recipientName: data.instructorName,
        recipientEmail: data.instructorEmail,
        courseName: data.courseTitle,
    };

    return sendEmail("course-final-approval", emailData);
}

export async function sendCourseRejectionEmail(data: {
    courseTitle: string;
    instructorName: string;
    instructorEmail: string;
}) {
    const emailData: EmailData = {
        recipientName: data.instructorName,
        recipientEmail: data.instructorEmail,
        courseName: data.courseTitle,
    };

    return sendEmail("course-rejection", emailData);
}
