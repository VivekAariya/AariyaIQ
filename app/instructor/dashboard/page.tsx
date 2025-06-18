import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/lib/courses";
import { BarChart, BookOpen, PlusCircle, Users } from "lucide-react";
import Link from "next/link";

export default function InstructorDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Instructor Dashboard</h1>
                <p className="text-muted-foreground">Manage your courses and learners</p>
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 md:grid-cols-4">
                <Button variant="instructor" className="h-auto py-4 flex-col items-center justify-center gap-2" asChild>
                    <Link href="/instructor/dashboard/courses/new">
                        <PlusCircle className="h-6 w-6" />
                        <span>Create New Course</span>
                    </Link>
                </Button>
                <Button variant="instructor" className="h-auto py-4 flex-col items-center justify-center gap-2" asChild>
                    <Link href="/instructor/dashboard/users">
                        <Users className="h-6 w-6" />
                        <span>Manage Learners</span>
                    </Link>
                </Button>
                <Button variant="instructor" className="h-auto py-4 flex-col items-center justify-center gap-2" asChild>
                    <Link href="/instructor/dashboard/courses">
                        <BookOpen className="h-6 w-6" />
                        <span>View All Courses</span>
                    </Link>
                </Button>
                <Button variant="instructor" className="h-auto py-4 flex-col items-center justify-center gap-2" asChild>
                    <Link href="/instructor/dashboard/analytics">
                        <BarChart className="h-6 w-6" />
                        <span>View Analytics</span>
                    </Link>
                </Button>
            </div>

            {/* Blurred Glass Panel for Admin Analytics */}
            <div className="relative rounded-xl overflow-hidden border border-white/20 bg-gradient-to-br from-indigo-900/10 via-purple-800/10 to-cyan-900/10 backdrop-blur-md p-6 shadow-lg">
                {/* Neon border elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
                </div>

                <div className="relative z-10">
                    <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                        Platform Analytics
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                            <h3 className="text-sm font-medium text-gray-300 mb-2">Learner Engagement</h3>
                            <div className="flex items-end space-x-1 mb-2">
                                <div className="text-2xl font-bold">78%</div>
                                <div className="text-xs text-green-400 pb-1">↑ 12%</div>
                            </div>
                            <p className="text-xs text-gray-400">Average course completion rate</p>
                            <div className="mt-3 h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                                    style={{ width: "78%" }}
                                ></div>
                            </div>
                        </div>

                        <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                            <h3 className="text-sm font-medium text-gray-300 mb-2">Active Learners</h3>
                            <div className="flex items-end space-x-1 mb-2">
                                <div className="text-2xl font-bold">85</div>
                                <div className="text-xs text-green-400 pb-1">↑ 8%</div>
                            </div>
                            <p className="text-xs text-gray-400">Learners active in the last 7 days</p>
                            <div className="mt-3 flex space-x-1">
                                {[65, 72, 68, 75, 82, 79, 85].map((value, i) => (
                                    <div key={i} className="flex-1">
                                        <div className="h-10 bg-gray-700 rounded-sm relative overflow-hidden">
                                            <div
                                                className="absolute bottom-0 w-full bg-gradient-to-t from-indigo-500 to-cyan-500 rounded-sm"
                                                style={{ height: `${(value / 100) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between text-xs mt-1 text-gray-400">
                                <span>Mon</span>
                                <span>Wed</span>
                                <span>Sun</span>
                            </div>
                        </div>

                        <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-white/10">
                            <h3 className="text-sm font-medium text-gray-300 mb-2">Admin Actions</h3>
                            <div className="space-y-2">
                                <Button variant="instructor" size="sm" className="w-full" asChild>
                                    <Link href="/instructor/dashboard/courses/new">Create New Course</Link>
                                </Button>
                                <Button variant="instructor" size="sm" className="w-full" asChild>
                                    <Link href="/instructor/dashboard/users">Manage Learners</Link>
                                </Button>
                                <Button variant="outline" size="sm" className="w-full border-white/20" asChild>
                                    <Link href="/instructor/dashboard/logs">View System Logs</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{courses.length}</div>
                        <p className="text-xs text-muted-foreground">+2 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">120</div>
                        <p className="text-xs text-muted-foreground">+15 from last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Learners</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85</div>
                        <p className="text-xs text-muted-foreground">70% of total learners</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Course Completion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">65%</div>
                        <p className="text-xs text-muted-foreground">+5% from last month</p>
                    </CardContent>
                </Card>
            </div>

            <div className="relative rounded-xl overflow-hidden border border-white/20 bg-gradient-to-br from-indigo-900/10 via-purple-800/10 to-cyan-900/10 backdrop-blur-md p-6 shadow-lg">
                {/* Neon border elements */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-indigo-500/50 to-transparent"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Recent Courses
                        </h2>
                        <Button variant="instructor" asChild>
                            <Link href="/instructor/dashboard/courses/new">Add New Course</Link>
                        </Button>
                    </div>
                    <div className="mt-4 rounded-md border border-white/10 bg-black/40 backdrop-blur-sm">
                        <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                            <div>Title</div>
                            <div>Instructor</div>
                            <div>Level</div>
                            <div>Start Date</div>
                            <div>Actions</div>
                        </div>
                        {courses.slice(0, 5).map((course) => (
                            <div key={course.id} className="grid grid-cols-5 gap-4 border-t p-4">
                                <div>{course.title}</div>
                                <div>{course.instructor}</div>
                                <div>{course.level}</div>
                                <div>{new Date(course.startDate).toLocaleDateString()}</div>
                                <div className="flex space-x-2">
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/instructor/dashboard/courses/${course.id}`}>Edit</Link>
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4 flex justify-center">
                        <Button variant="outline" asChild>
                            <Link href="/instructor/dashboard/courses">View All Courses</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
