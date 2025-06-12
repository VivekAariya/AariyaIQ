import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function EmailNotificationsFlowPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Email Notification Flows</h1>
              <p className="text-muted-foreground mt-2">
                Visual representation of email notifications sent during the registration and approval processes
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Learner Registration Flow</h2>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Registration Submission</h3>
                        <p className="text-gray-400 mt-1">Learner submits course registration form</p>
                        <div className="mt-2 bg-purple-900/30 p-3 rounded-md border border-purple-500/30">
                          <p className="text-sm text-purple-300">
                            <strong>Email Sent:</strong> Registration Confirmation
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            From: hello@aariyatech.co.uk
                            <br />
                            To: Learner
                            <br />
                            Subject: Your AariyaIQ Registration: [Course Name] - Received
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-700 ml-5"></div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Initial Approval</h3>
                        <p className="text-gray-400 mt-1">Super Admin reviews and approves initial registration</p>
                        <div className="mt-2 bg-blue-900/30 p-3 rounded-md border border-blue-500/30">
                          <p className="text-sm text-blue-300">
                            <strong>Email Sent:</strong> Initial Approval & Payment Request
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            From: hello@aariyatech.co.uk
                            <br />
                            To: Learner
                            <br />
                            Subject: Your AariyaIQ Registration: [Course Name] - Initially Approved
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-700 ml-5"></div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Payment</h3>
                        <p className="text-gray-400 mt-1">
                          Learner receives payment instructions and completes payment
                        </p>
                        <div className="mt-2 bg-yellow-900/30 p-3 rounded-md border border-yellow-500/30">
                          <p className="text-sm text-yellow-300">
                            <strong>Email Sent:</strong> Payment Reminder (if needed)
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            From: hello@aariyatech.co.uk
                            <br />
                            To: Learner
                            <br />
                            Subject: Action Required: Payment for [Course Name] Registration
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-700 ml-5"></div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Compliance Check</h3>
                        <p className="text-gray-400 mt-1">Super Admin conducts compliance check after payment</p>
                        <div className="mt-2 bg-indigo-900/30 p-3 rounded-md border border-indigo-500/30">
                          <p className="text-sm text-indigo-300">
                            <strong>Email Sent:</strong> Compliance Check Notification
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            From: hello@aariyatech.co.uk
                            <br />
                            To: Learner
                            <br />
                            Subject: Your AariyaIQ Registration: Compliance Check in Progress
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-700 ml-5"></div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">5</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Final Approval</h3>
                        <p className="text-gray-400 mt-1">Super Admin grants final approval</p>
                        <div className="mt-2 bg-green-900/30 p-3 rounded-md border border-green-500/30">
                          <p className="text-sm text-green-300">
                            <strong>Email Sent:</strong> Final Approval Notification
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            From: hello@aariyatech.co.uk
                            <br />
                            To: Learner
                            <br />
                            Subject: Congratulations! Your AariyaIQ Course Registration is Approved
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Instructor Registration Flow</h2>
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">1</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Application Submission</h3>
                        <p className="text-gray-400 mt-1">Instructor submits application form</p>
                        <div className="mt-2 bg-purple-900/30 p-3 rounded-md border border-purple-500/30">
                          <p className="text-sm text-purple-300">
                            <strong>Email Sent:</strong> Application Confirmation
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            From: hello@aariyatech.co.uk
                            <br />
                            To: Instructor
                            <br />
                            Subject: Your AariyaIQ Instructor Application - Received
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-700 ml-5"></div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">2</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Initial Approval</h3>
                        <p className="text-gray-400 mt-1">Super Admin reviews and approves initial application</p>
                        <div className="mt-2 bg-blue-900/30 p-3 rounded-md border border-blue-500/30">
                          <p className="text-sm text-blue-300">
                            <strong>Email Sent:</strong> Initial Approval & Payment Request
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            From: hello@aariyatech.co.uk
                            <br />
                            To: Instructor
                            <br />
                            Subject: Your AariyaIQ Instructor Application - Initially Approved
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-700 ml-5"></div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-yellow-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Payment</h3>
                        <p className="text-gray-400 mt-1">
                          Instructor receives payment instructions and completes payment
                        </p>
                        <div className="mt-2 bg-yellow-900/30 p-3 rounded-md border border-yellow-500/30">
                          <p className="text-sm text-yellow-300">
                            <strong>Email Sent:</strong> Payment Reminder (if needed)
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            From: hello@aariyatech.co.uk
                            <br />
                            To: Instructor
                            <br />
                            Subject: Action Required: Payment for Instructor Registration
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-700 ml-5"></div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">4</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Compliance Check</h3>
                        <p className="text-gray-400 mt-1">Super Admin conducts compliance check after payment</p>
                        <div className="mt-2 bg-indigo-900/30 p-3 rounded-md border border-indigo-500/30">
                          <p className="text-sm text-indigo-300">
                            <strong>Email Sent:</strong> Compliance Check Notification
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            From: hello@aariyatech.co.uk
                            <br />
                            To: Instructor
                            <br />
                            Subject: Your AariyaIQ Instructor Application: Compliance Check in Progress
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="w-0.5 h-6 bg-gray-700 ml-5"></div>

                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold">5</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">Final Approval</h3>
                        <p className="text-gray-400 mt-1">Super Admin grants final approval</p>
                        <div className="mt-2 bg-green-900/30 p-3 rounded-md border border-green-500/30">
                          <p className="text-sm text-green-300">
                            <strong>Email Sent:</strong> Final Approval Notification
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            From: hello@aariyatech.co.uk
                            <br />
                            To: Instructor
                            <br />
                            Subject: Congratulations! Your AariyaIQ Instructor Application is Approved
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <h2 className="text-2xl font-bold mb-4">Email Notification System</h2>
              <p className="text-gray-400 mb-6">
                All emails are sent from hello@aariyatech.co.uk through our secure email service. The system
                automatically sends notifications at each stage of the approval process, keeping learners and
                instructors informed about their registration status.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold mb-2">Automated Notifications</h3>
                  <p className="text-sm text-gray-400">
                    Emails are automatically triggered when a status changes in the system, ensuring timely
                    communication.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold mb-2">Manual Reminders</h3>
                  <p className="text-sm text-gray-400">
                    Super Admins can manually send reminder emails for payment or other required actions.
                  </p>
                </div>

                <div className="bg-gray-800/50 p-4 rounded-lg border border-white/10">
                  <h3 className="font-semibold mb-2">Email Templates</h3>
                  <p className="text-sm text-gray-400">
                    All emails use professionally designed templates that maintain brand consistency.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
