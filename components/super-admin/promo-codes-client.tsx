"use client";

import { createPromoCode, deletePromoCode, getPromoCodes, updatePromoCode } from "@/app/actions/promo-codes-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import logger from "@/utils/logger";
import { useEffect, useState, useTransition } from "react";

export function PromoCodesClient() {
    const { toast } = useToast();

    const [promoCodes, setPromoCodes] = useState<any[]>([]);
    const [editing, setEditing] = useState<any | null>(null);
    const [isPending, startTransition] = useTransition();
    const [form, setForm] = useState<any>({
        code: "",
        name: "",
        description: "",
        discount_type: "percentage",
        discount_value: "",
        start_date: "",
        end_date: "",
        applicable_to: "all_courses",
        applicable_course_ids: [],
        is_active: true,
    });

    const fetchPromoCodes = async () => {
        const data = await getPromoCodes();
        setPromoCodes(data);
    };

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setForm((prev: any) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSelectChange = (name: string, value: any) => {
        setForm((prev: any) => ({ ...prev, [name]: value }));
        if (name === "applicable_to" && value === "all_courses") {
            setForm((prev: any) => ({ ...prev, applicable_course_ids: [] }));
        }
    };

    const handleCourseIdsChange = (e: any) => {
        const value = e.target.value;
        setForm((prev: any) => ({ ...prev, applicable_course_ids: value.split(",").map((v: string) => v.trim()) }));
    };

    const handleEdit = (promo: any) => {
        setEditing(promo);
        setForm({
            ...promo,
            applicable_course_ids: promo.applicable_course_ids || [],
            start_date: new Date(promo.start_date).toISOString().split("T")[0],
            end_date: new Date(promo.end_date).toISOString().split("T")[0],
        });
    };

    const handleDelete = async (id: string) => {
        startTransition(async () => {
            const res = await deletePromoCode(id);
            if (res.success) {
                toast({ title: "Deleted", description: res.message });
                fetchPromoCodes();
            } else {
                toast({ title: "Error", description: res.message, variant: "destructive" });
            }
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        startTransition(async () => {
            let res;
            const formData = new FormData();
            Object.entries(form).forEach(([k, v]: any) => {
                if (k === "applicable_course_ids") {
                    formData.append(k, JSON.stringify(v));
                } else {
                    formData.append(k, v);
                }
            });

            if (editing) {
                res = await updatePromoCode(editing.id, formData);
            } else {
                res = await createPromoCode(formData);
            }

            if (res.success) {
                toast({ title: "Success", description: res.message });
                setForm({
                    code: "",
                    name: "",
                    description: "",
                    discount_type: "percentage",
                    discount_value: "",
                    start_date: "",
                    end_date: "",
                    applicable_to: "all_courses",
                    applicable_course_ids: [],
                    is_active: true,
                });

                setEditing(null);
                fetchPromoCodes();
            } else {
                logger.error("Error creating promo code:", res.message);
                toast({ title: "Error", description: res.message, variant: "destructive" });
            }
        });
    };

    useEffect(() => {
        fetchPromoCodes();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-4">
                    Promo Codes
                </h1>

                {/* Add Promo Code */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-slate-800/60 rounded-lg p-6 space-y-6 border border-slate-700"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="code">Code</Label>
                            <Input
                                id="code"
                                name="code"
                                value={form.code}
                                onChange={handleChange}
                                required
                                className="bg-slate-900/80 border-slate-700 text-white"
                            />
                        </div>
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="bg-slate-900/80 border-slate-700 text-white"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                className="bg-slate-900/80 border-slate-700 text-white"
                            />
                        </div>
                        <div>
                            <Label htmlFor="discount_type">Discount Type</Label>
                            <Select
                                value={form.discount_type}
                                onValueChange={(v) => handleSelectChange("discount_type", v)}
                            >
                                <SelectTrigger className="bg-slate-900/80 border-slate-700 text-white">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="percentage">Percentage</SelectItem>
                                    <SelectItem value="fixed_amount">Fixed Amount</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="discount_value">Discount Value</Label>
                            <Input
                                id="discount_value"
                                name="discount_value"
                                type="number"
                                value={form.discount_value}
                                onChange={handleChange}
                                required
                                className="bg-slate-900/80 border-slate-700 text-white"
                            />
                        </div>
                        <div>
                            <Label htmlFor="start_date">Start Date</Label>
                            <Input
                                id="start_date"
                                name="start_date"
                                type="date"
                                value={form.start_date}
                                onChange={handleChange}
                                min={new Date().toISOString().split("T")[0]}
                                required
                                className="bg-slate-900/80 border-slate-700 text-white"
                            />
                        </div>
                        <div>
                            <Label htmlFor="end_date">End Date</Label>
                            <Input
                                id="end_date"
                                name="end_date"
                                type="date"
                                value={form.end_date}
                                onChange={handleChange}
                                min={new Date().toISOString().split("T")[0]}
                                required
                                className="bg-slate-900/80 border-slate-700 text-white"
                            />
                        </div>
                        <div>
                            <Label htmlFor="applicable_to">Applicable To</Label>
                            <Select
                                value={form.applicable_to}
                                onValueChange={(v) => handleSelectChange("applicable_to", v)}
                            >
                                <SelectTrigger className="bg-slate-900/80 border-slate-700 text-white">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all_courses">All Courses</SelectItem>
                                    <SelectItem value="specific_courses">Specific Courses</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {form.applicable_to === "specific_courses" && (
                            <div className="md:col-span-2">
                                <Label htmlFor="applicable_course_ids">Applicable Course IDs (comma separated)</Label>
                                <Input
                                    id="applicable_course_ids"
                                    name="applicable_course_ids"
                                    value={form.applicable_course_ids.join(",")}
                                    onChange={handleCourseIdsChange}
                                    className="bg-slate-900/80 border-slate-700 text-white"
                                    placeholder="e.g. 1,2,3"
                                />
                            </div>
                        )}

                        <div className="flex items-center space-x-2 mt-2">
                            <Switch
                                id="is_active"
                                name="is_active"
                                checked={form.is_active}
                                onCheckedChange={(v) => setForm((prev: any) => ({ ...prev, is_active: v }))}
                            />
                            <Label htmlFor="is_active">Active</Label>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button type="submit" disabled={isPending}>
                            {editing ? "Update" : "Create"} Promo Code
                        </Button>

                        {editing && (
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => {
                                    setEditing(null);
                                    setForm({
                                        code: "",
                                        name: "",
                                        description: "",
                                        discount_type: "percentage",
                                        discount_value: "",
                                        start_date: "",
                                        end_date: "",
                                        applicable_to: "all_courses",
                                        applicable_course_ids: [],
                                        is_active: true,
                                    });
                                }}
                            >
                                Cancel
                            </Button>
                        )}
                    </div>
                </form>

                {/* Existing Promo Codes */}
                <div className="bg-slate-800/60 rounded-lg p-6 border border-slate-700 mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-cyan-300">Existing Promo Codes</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left">
                            <thead>
                                <tr className="text-gray-300 border-b border-slate-700">
                                    <th className="py-2 px-2">Code</th>
                                    <th className="py-2 px-2">Name</th>
                                    <th className="py-2 px-2">Type</th>
                                    <th className="py-2 px-2">Value</th>
                                    <th className="py-2 px-2">Active</th>
                                    <th className="py-2 px-2">Start</th>
                                    <th className="py-2 px-2">End</th>
                                    <th className="py-2 px-2">Applicable</th>
                                    <th className="py-2 px-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {promoCodes.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className="text-center text-gray-500 py-4">
                                            No promo codes found.
                                        </td>
                                    </tr>
                                )}
                                {promoCodes.map((promo) => (
                                    <tr key={promo.id} className="border-b border-slate-700 hover:bg-slate-700/30">
                                        <td className="py-2 px-2 font-mono">{promo.code}</td>
                                        <td className="py-2 px-2">{promo.name}</td>
                                        <td className="py-2 px-2 capitalize">
                                            {promo.discount_type.replace("_", " ")}
                                        </td>
                                        <td className="py-2 px-2">{promo.discount_value}</td>
                                        <td className="py-2 px-2">{promo.is_active ? "Yes" : "No"}</td>
                                        <td className="py-2 px-2">{promo.start_date?.slice(0, 10)}</td>
                                        <td className="py-2 px-2">{promo.end_date?.slice(0, 10)}</td>
                                        <td className="py-2 px-2">
                                            {promo.applicable_to === "all_courses"
                                                ? "All"
                                                : (promo.applicable_course_ids || []).join(", ")}
                                        </td>
                                        <td className="py-2 px-2 flex gap-2">
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="secondary"
                                                onClick={() => handleEdit(promo)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                type="button"
                                                size="sm"
                                                variant="destructive"
                                                onClick={() => handleDelete(promo.id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
