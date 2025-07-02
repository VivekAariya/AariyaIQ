import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { Edit, Search } from "lucide-react";
import Link from "next/link";

export default async function LearnersPage({ searchParams }: { searchParams?: { search?: string } }) {
    const search = searchParams?.search || "";
    let learners: any = [];
    let enrollments = null;
    let errorMsg = null;

    try {
        let query = supabaseServiceRoleClient
            .from("users")
            .select("*")
            .eq("role", "learner")
            .order("created_at", { ascending: false });

        if (search) {
            query = query.or(`first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%`);
        }

        const { data: learnerData, error } = await query;

        if (error) {
            logger.error("Error fetching learners:", error);
            errorMsg = error.message || "Unknown error";
        }

        learners = learnerData || [];
    } catch (error: any) {
        logger.error("Error fetching learners:", error);
        errorMsg = error?.message || "Unknown error";
    }

    logger.log("enrollments", enrollments);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Manage Learners</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Learners</CardTitle>
                    <CardDescription>
                        Manage learner accounts, track course enrollments, and monitor activity.
                    </CardDescription>

                    <form className="flex w-full max-w-sm items-center space-x-2 mt-4" action="" method="get">
                        <div className="relative w-full">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="search"
                                name="search"
                                placeholder="Search learners..."
                                className="w-full pl-8"
                                defaultValue={search}
                                autoComplete="off"
                            />
                        </div>
                        <Button type="submit" size="icon" variant="ghost">
                            <Search className="h-4 w-4" />
                        </Button>
                    </form>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {learners.map((learner: any) => (
                                <TableRow key={learner.id}>
                                    <TableCell className="font-medium">
                                        <Link
                                            href={`/super-admin/dashboard/learners/${learner.id}`}
                                            className="hover:underline"
                                        >
                                            {learner.first_name} {learner.last_name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{learner.email}</TableCell>
                                    <TableCell>
                                        <div>
                                            <Link href={`/super-admin/dashboard/learners/${learner.id}`}>
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
