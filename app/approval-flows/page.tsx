import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ApprovalFlowsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainNav />
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Registration & Approval Flows</h1>
              <p className="text-muted-foreground">Understanding the approval process for learners and instructors</p>
            </div>

            <Tabs defaultValue="learner">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="learner">Learner Registration Flow</TabsTrigger>
                <TabsTrigger value="instructor">Instructor Registration Flow</TabsTrigger>
              </TabsList>

              <TabsContent value="learner" className="space-y-6 pt-6">
                <Card className="border border-white/20 dark:border-white/10">
                  <CardHeader>
                    <CardTitle>Learner Course Registration Flow</CardTitle>
                    <CardDescription>The complete process from registration to course access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <div className="min-w-[800px] p-4">
                        <div className="flex flex-col items-center">
                          {/* Flow diagram */}
                          <div className="w-full max-w-4xl">
                            {/* Step 1 */}
                            <div className="flex items-start mb-8">
                              <div className="flex-1">
                                <div className="bg-purple-900/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
                                  <h3 className="text-lg font-medium text-purple-400 mb-2">
                                    Step 1: Course Registration Form
                                  </h3>
                                  <p className="text-sm text-gray-300">
                                    Learner completes and submits the course registration form with personal and
                                    professional details.
                                  </p>
                                </div>
                              </div>
                              <div className="w-16 flex items-center justify-center">
                                <div className="h-16 w-0.5 bg-gradient-to-b from-purple-500 to-indigo-500"></div>
                              </div>
                              <div className="flex-1"></div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex items-start mb-8">
                              <div className="flex-1"></div>
                              <div className="w-16 flex items-center justify-center">
                                <div className="h-16 w-0.5 bg-gradient-to-b from-indigo-500 to-blue-500"></div>
                              </div>
                              <div className="flex-1">
                                <div className="bg-indigo-900/20 backdrop-blur-sm rounded-lg p-4 border border-indigo-500/30">
                                  <h3 className="text-lg font-medium text-indigo-400 mb-2">
                                    Step 2: Super Admin Initial Review
                                  </h3>
                                  <p className="text-sm text-gray-300">
                                    Super Admin reviews the registration form and either approves or rejects the initial
                                    application.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex items-start mb-8">
                              <div className="flex-1">
                                <div className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
                                  <h3 className="text-lg font-medium text-blue-400 mb-2">Step 3: Payment Process</h3>
                                  <p className="text-sm text-gray-300">
                                    After initial approval, learner receives payment instructions via email (handled
                                    manually outside the system).
                                  </p>
                                </div>
                              </div>
                              <div className="w-16 flex items-center justify-center">
                                <div className="h-16 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                              </div>
                              <div className="flex-1"></div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex items-start mb-8">
                              <div className="flex-1"></div>
                              <div className="w-16 flex items-center justify-center">
                                <div className="h-16 w-0.5 bg-gradient-to-b from-cyan-500 to-green-500"></div>
                              </div>
                              <div className="flex-1">
                                <div className="bg-cyan-900/20 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
                                  <h3 className="text-lg font-medium text-cyan-400 mb-2">Step 4: Compliance Check</h3>
                                  <p className="text-sm text-gray-300">
                                    After payment confirmation, the application undergoes a compliance check to ensure
                                    all requirements are met.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Step 5 */}
                            <div className="flex items-start mb-8">
                              <div className="flex-1">
                                <div className="bg-green-900/20 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
                                  <h3 className="text-lg font-medium text-green-400 mb-2">Step 5: Final Approval</h3>
                                  <p className="text-sm text-gray-300">
                                    Super Admin reviews the compliance check results and grants final approval for
                                    course access.
                                  </p>
                                </div>
                              </div>
                              <div className="w-16 flex items-center justify-center">
                                <div className="h-16 w-0.5 bg-gradient-to-b from-green-500 to-emerald-500"></div>
                              </div>
                              <div className="flex-1"></div>
                            </div>

                            {/* Final Step */}
                            <div className="flex items-start">
                              <div className="flex-1"></div>
                              <div className="w-16"></div>
                              <div className="flex-1">
                                <div className="bg-emerald-900/20 backdrop-blur-sm rounded-lg p-4 border border-emerald-500/30">
                                  <h3 className="text-lg font-medium text-emerald-400 mb-2">Course Access Granted</h3>
                                  <p className="text-sm text-gray-300">
                                    Learner receives confirmation and gains access to the course materials and platform.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-white/20 dark:border-white/10">
                  <CardHeader>
                    <CardTitle>Learner Dashboard View</CardTitle>
                    <CardDescription>What learners see during the approval process</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-300">
                        Throughout the registration and approval process, learners have access to a dedicated dashboard
                        that provides:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <h4 className="font-medium text-white mb-2">Real-time Status Updates</h4>
                          <p className="text-sm text-gray-400">
                            Visual indicators show the current stage of the approval process, from initial submission to
                            final approval.
                          </p>
                        </div>

                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <h4 className="font-medium text-white mb-2">Email Notifications</h4>
                          <p className="text-sm text-gray-400">
                            Automated emails are sent at each stage of the process, including payment instructions and
                            approval confirmations.
                          </p>
                        </div>

                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <h4 className="font-medium text-white mb-2">Message Center</h4>
                          <p className="text-sm text-gray-400">
                            A dedicated message center allows for communication between learners and administrators
                            during the approval process.
                          </p>
                        </div>

                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <h4 className="font-medium text-white mb-2">Timeline View</h4>
                          <p className="text-sm text-gray-400">
                            A chronological timeline displays all events related to the registration, including
                            submission date, review dates, and approval date.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor" className="space-y-6 pt-6">
                <Card className="border border-white/20 dark:border-white/10">
                  <CardHeader>
                    <CardTitle>Instructor Registration Flow</CardTitle>
                    <CardDescription>The complete process from application to instructor access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <div className="min-w-[800px] p-4">
                        <div className="flex flex-col items-center">
                          {/* Flow diagram */}
                          <div className="w-full max-w-4xl">
                            {/* Step 1 */}
                            <div className="flex items-start mb-8">
                              <div className="flex-1">
                                <div className="bg-purple-900/20 backdrop-blur-sm rounded-lg p-4 border border-purple-500/30">
                                  <h3 className="text-lg font-medium text-purple-400 mb-2">
                                    Step 1: Instructor Application
                                  </h3>
                                  <p className="text-sm text-gray-300">
                                    Instructor submits an application with professional background, teaching experience,
                                    and proposed courses.
                                  </p>
                                </div>
                              </div>
                              <div className="w-16 flex items-center justify-center">
                                <div className="h-16 w-0.5 bg-gradient-to-b from-purple-500 to-indigo-500"></div>
                              </div>
                              <div className="flex-1"></div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex items-start mb-8">
                              <div className="flex-1"></div>
                              <div className="w-16 flex items-center justify-center">
                                <div className="h-16 w-0.5 bg-gradient-to-b from-indigo-500 to-blue-500"></div>
                              </div>
                              <div className="flex-1">
                                <div className="bg-indigo-900/20 backdrop-blur-sm rounded-lg p-4 border border-indigo-500/30">
                                  <h3 className="text-lg font-medium text-indigo-400 mb-2">
                                    Step 2: Super Admin Initial Review
                                  </h3>
                                  <p className="text-sm text-gray-300">
                                    Super Admin reviews the instructor application, evaluating qualifications and
                                    teaching potential.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex items-start mb-8">
                              <div className="flex-1">
                                <div className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-4 border border-blue-500/30">
                                  <h3 className="text-lg font-medium text-blue-400 mb-2">Step 3: Payment Process</h3>
                                  <p className="text-sm text-gray-300">
                                    After initial approval, instructor receives payment instructions via email (handled
                                    manually outside the system).
                                  </p>
                                </div>
                              </div>
                              <div className="w-16 flex items-center justify-center">
                                <div className="h-16 w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                              </div>
                              <div className="flex-1"></div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex items-start mb-8">
                              <div className="flex-1"></div>
                              <div className="w-16 flex items-center justify-center">
                                <div className="h-16 w-0.5 bg-gradient-to-b from-cyan-500 to-green-500"></div>
                              </div>
                              <div className="flex-1">
                                <div className="bg-cyan-900/20 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/30">
                                  <h3 className="text-lg font-medium text-cyan-400 mb-2">Step 4: Compliance Check</h3>
                                  <p className="text-sm text-gray-300">
                                    After payment confirmation, the application undergoes a compliance check, including
                                    verification of credentials and background.
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Step 5 */}
                            <div className="flex items-start mb-8">
                              <div className="flex-1">
                                <div className="bg-green-900/20 backdrop-blur-sm rounded-lg p-4 border border-green-500/30">
                                  <h3 className="text-lg font-medium text-green-400 mb-2">Step 5: Final Approval</h3>
                                  <p className="text-sm text-gray-300">
                                    Super Admin reviews the compliance check results and grants final approval for
                                    instructor status.
                                  </p>
                                </div>
                              </div>
                              <div className="w-16 flex items-center justify-center">
                                <div className="h-16 w-0.5 bg-gradient-to-b from-green-500 to-emerald-500"></div>
                              </div>
                              <div className="flex-1"></div>
                            </div>

                            {/* Final Step */}
                            <div className="flex items-start">
                              <div className="flex-1"></div>
                              <div className="w-16"></div>
                              <div className="flex-1">
                                <div className="bg-emerald-900/20 backdrop-blur-sm rounded-lg p-4 border border-emerald-500/30">
                                  <h3 className="text-lg font-medium text-emerald-400 mb-2">
                                    Instructor Access Granted
                                  </h3>
                                  <p className="text-sm text-gray-300">
                                    Instructor receives confirmation and gains access to the instructor dashboard to
                                    create and manage courses.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-white/20 dark:border-white/10">
                  <CardHeader>
                    <CardTitle>Instructor Dashboard View</CardTitle>
                    <CardDescription>What instructors see during the approval process</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-300">
                        Throughout the application and approval process, instructors have access to a dedicated
                        dashboard that provides:
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <h4 className="font-medium text-white mb-2">Application Status Tracker</h4>
                          <p className="text-sm text-gray-400">
                            Visual indicators show the current stage of the approval process, from initial submission to
                            final approval.
                          </p>
                        </div>

                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <h4 className="font-medium text-white mb-2">Email Notifications</h4>
                          <p className="text-sm text-gray-400">
                            Automated emails are sent at each stage of the process, including payment instructions and
                            approval confirmations.
                          </p>
                        </div>

                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <h4 className="font-medium text-white mb-2">Message Center</h4>
                          <p className="text-sm text-gray-400">
                            A dedicated message center allows for communication between instructors and administrators
                            during the approval process.
                          </p>
                        </div>

                        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                          <h4 className="font-medium text-white mb-2">Next Steps Guide</h4>
                          <p className="text-sm text-gray-400">
                            A guide showing the next steps in the process, including what to expect after approval and
                            how to create courses.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
