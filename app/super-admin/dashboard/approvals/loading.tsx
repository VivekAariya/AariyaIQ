import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-64" />
            </div>

            <Skeleton className="h-10 w-full" />

            <div className="space-y-6 pt-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-10 w-64" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-24" />
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
                    <div className="space-y-4">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-64 w-full" />
                    </div>
                    <Skeleton className="h-96 w-full" />
                </div>
            </div>
        </div>
    );
}
