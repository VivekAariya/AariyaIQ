import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { AlertTriangle, CheckCircle, Clock, Search, User, XCircle } from "lucide-react";
import Link from "next/link";

// Accept searchParams from Next.js
export default async function InstructorsPage({ searchParams }: { searchParams?: { search?: string } }) {
    const search = searchParams?.search || "";
    let supabaseInstructors = [];
    let errorMsg = null;

    try {
        let query = supabaseServiceRoleClient
            .from("users")
            .select("*")
            .eq("role", "instructor")
            .order("created_at", { ascending: false });

        if (search) {
            query = query.or(
                `first_name.ilike.%${search}%,last_name.ilike.%${search}%,email.ilike.%${search}%,area_of_expertise.ilike.%${search}%`
            );
        }

        const { data, error } = await query;

        if (error) {
            logger.error("Error fetching instructors:", error);
            errorMsg = error.message || "Unknown error";
        } else {
            supabaseInstructors = data || [];
        }
    } catch (error: any) {
        logger.error("Error fetching instructors:", error);
        errorMsg = error?.message || "Unknown error";
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            case "pending":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "suspended":
                return "bg-orange-500/20 text-orange-400 border-orange-500/30";
            case "banned":
                return "bg-red-600/20 text-red-300 border-red-600/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "approved":
                return <CheckCircle className="h-4 w-4" />;
            case "pending":
                return <Clock className="h-4 w-4" />;
            case "suspended":
                return <XCircle className="h-4 w-4" />;
            case "banned":
                return <AlertTriangle className="h-4 w-4" />;
            default:
                return <User className="h-4 w-4" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Manage Instructors</h1>
            </div>

            <form className="flex items-center justify-start" action="" method="get">
                <div className="relative w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        name="search"
                        placeholder="Search instructors..."
                        className="w-full pl-8"
                        defaultValue={search}
                        autoComplete="off"
                    />
                </div>
                <Button type="submit" className="ml-2" variant={"outline"}>
                    Search
                </Button>
            </form>

            <div className="rounded-md border border-white/20 bg-black/90 backdrop-blur-none overflow-hidden">
                <div className="grid grid-cols-5 gap-4 p-4 font-medium">
                    <div>Name</div>
                    <div>Email</div>
                    <div>Area of Expertise</div>
                    <div>Status</div>
                    <div>Actions</div>
                </div>

                {errorMsg ? (
                    <div className="p-4 text-red-500">Error: {errorMsg}</div>
                ) : supabaseInstructors.length === 0 ? (
                    <div className="p-4 text-center text-gray-400">No instructors found.</div>
                ) : (
                    supabaseInstructors.map((instructor) => (
                        <div key={instructor.id} className="grid grid-cols-5 gap-4 border-t p-4">
                            <div className="truncate">
                                {instructor.first_name} {instructor.last_name}
                            </div>
                            <div className="truncate">{instructor.email}</div>
                            <div className="truncate">{instructor.area_of_expertise}</div>
                            <div className="truncate">
                                <span
                                    className={`inline-flex items-center gap-1 px-2 py-1 rounded border text-xs font-medium ${getStatusColor(
                                        instructor.profile_status
                                    )}`}
                                >
                                    {getStatusIcon(instructor.profile_status)}
                                    {instructor.profile_status.charAt(0).toUpperCase() +
                                        instructor.profile_status.slice(1)}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                <Button variant="outline" size="sm" asChild className="text-xs">
                                    <Link href={`/super-admin/dashboard/instructors/${instructor.id}`}>Edit</Link>
                                </Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
