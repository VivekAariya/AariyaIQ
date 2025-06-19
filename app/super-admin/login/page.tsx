"use client";

import { loginSuperAdmin } from "@/app/actions/super-admin-actions";
import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function SuperAdminLoginPage() {
    const router = useRouter();

    const [isPending, startTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            const result = await loginSuperAdmin(formData);

            if (result.success) {
                toast({
                    title: "Login Successful",
                    description: "Welcome back to AariyaIQ Super Admin Portal!",
                });
                router.push("/super-admin/dashboard");
            } else {
                toast({
                    title: "Login Failed",
                    description: result.message || "Invalid credentials",
                    variant: "destructive",
                });
            }
        });
    };

    return (
        <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-900 via-indigo-800 to-violet-900">
            <MainNav />
            <main className="flex-1 flex items-center justify-center py-12 px-4">
                <Card className="w-full max-w-md border-2 border-purple-400/30 shadow-xl shadow-purple-500/20 bg-black/30 backdrop-blur-sm">
                    <CardHeader className="space-y-2 border-b border-purple-500/20 pb-6">
                        <div className="flex items-center justify-center mb-2">
                            <div className="h-16 w-16 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <Shield className="h-8 w-8 text-purple-400" />
                            </div>
                        </div>
                        <CardTitle className="text-3xl font-bold text-white text-center">Super Admin</CardTitle>
                        <CardDescription className="text-gray-300 text-base text-center">
                            Restricted access - Authorized personnel only
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <form action={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-gray-200 text-base">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="superadmin@aariyatech.com"
                                    required
                                    className="bg-gray-800/50 border-gray-700 text-white h-11"
                                />
                            </div>
                            <div className="relative space-y-2">
                                <Label htmlFor="password" className="text-gray-200 text-base">
                                    Password
                                </Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="bg-gray-800/50 border-gray-700 text-white h-11 pr-10"
                                />
                                <button
                                    type="button"
                                    tabIndex={-1}
                                    className="absolute right-2 top-11 -translate-y-1/2 text-gray-400 hover:text-purple-400"
                                    onClick={() => setShowPassword((v) => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="securityKey" className="text-gray-200 text-base">
                                    Security Key
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="securityKey"
                                        name="securityKey"
                                        type="password"
                                        placeholder="Enter your security key"
                                        required
                                        className="bg-gray-800/50 border-gray-700 text-white h-11 pl-10"
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                                <p className="text-gray-400 text-xs mt-1">
                                    The security key is provided to authorized super administrators only.
                                </p>
                            </div>
                            <Button
                                type="submit"
                                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                                disabled={isPending}
                            >
                                {isPending ? "Authenticating..." : "Access System"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4 pt-0">
                        <div className="w-full border-t border-gray-700 my-2"></div>
                        <div className="text-center">
                            <p className="text-gray-400 text-sm">
                                This is a secure area. All login attempts are monitored and logged.
                            </p>
                        </div>
                    </CardFooter>
                </Card>
            </main>
            <Footer />
        </div>
    );
}
