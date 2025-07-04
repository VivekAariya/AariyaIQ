import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";
import { NextResponse } from "next/server";

export async function GET() {
    const { data: upcomingCourses, error: upcomingCoursesError } = await supabaseServiceRoleClient
        .from("courses")
        .select("id, course_title, short_description, start_date, course_image")
        .eq("status", "approved")
        .order("start_date", { ascending: true })
        .limit(3);

    if (upcomingCoursesError) {
        return NextResponse.json({ error: upcomingCoursesError.message }, { status: 500 });
    }

    const { data: courses, error: coursesError } = await supabaseServiceRoleClient
        .from("courses")
        .select("id, course_title, short_description, start_date, course_image, created_at")
        .eq("status", "approved")
        .order("created_at", { ascending: true })
        .limit(3);

    if (coursesError) {
        return NextResponse.json({ error: coursesError.message }, { status: 500 });
    }

    return NextResponse.json({ upcomingCourses, courses });
}
