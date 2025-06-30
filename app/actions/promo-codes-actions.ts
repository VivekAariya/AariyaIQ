"use server";

import logger from "@/utils/logger";
import { supabaseServiceRoleClient } from "@/utils/supabase/service-client";

export async function createPromoCode(formData: FormData) {
    try {
        const code = formData.get("code") as string;
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const discount_type = formData.get("discount_type") as string;
        const discount_value = Number(formData.get("discount_value"));
        const start_date = formData.get("start_date") as string;
        const end_date = formData.get("end_date") as string;
        const applicable_to = formData.get("applicable_to") as string;
        const applicable_course_ids = formData.get("applicable_course_ids") as string;
        const is_active = formData.get("is_active");

        if (!code || !name || !discount_type || !discount_value || !start_date || !end_date || !applicable_to) {
            return { success: false, message: "All required fields must be filled." };
        }

        const { error } = await supabaseServiceRoleClient.from("promo_codes").insert({
            code,
            name,
            description,
            discount_type,
            discount_value,
            start_date,
            end_date,
            applicable_to,
            applicable_course_ids:
                applicable_to === "specific_courses" ? JSON.parse(applicable_course_ids || "[]") : null,
            is_active,
        });

        if (error) {
            logger.error("Error creating promo code:", error);
            return { success: false, message: error.message };
        }
        return { success: true, message: "Promo code created successfully!" };
    } catch (error: any) {
        logger.error("Exception in createPromoCode:", error);
        return { success: false, message: error.message || "An error occurred." };
    }
}

export async function updatePromoCode(id: string, formData: FormData) {
    try {
        const code = formData.get("code") as string;
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const discount_type = formData.get("discount_type") as string;
        const discount_value = Number(formData.get("discount_value"));
        const start_date = formData.get("start_date") as string;
        const end_date = formData.get("end_date") as string;
        const applicable_to = formData.get("applicable_to") as string;
        const applicable_course_ids = formData.get("applicable_course_ids") as string;
        const is_active = formData.get("is_active");

        logger.log("data", {
            code,
            name,
            description,
            discount_type,
            discount_value,
            start_date,
            end_date,
            applicable_to,
            applicable_course_ids,
            is_active,
        });

        if (!code || !name || !discount_type || !discount_value || !start_date || !end_date || !applicable_to) {
            return { success: false, message: "All required fields must be filled." };
        }

        const { error } = await supabaseServiceRoleClient
            .from("promo_codes")
            .update({
                code,
                name,
                description,
                discount_type,
                discount_value,
                start_date,
                end_date,
                applicable_to,
                applicable_course_ids:
                    applicable_to === "specific_courses" ? JSON.parse(applicable_course_ids || "[]") : null,
                is_active,
            })
            .eq("id", id);

        if (error) {
            logger.error("Error updating promo code:", error);
            return { success: false, message: error.message };
        }
        return { success: true, message: "Promo code updated successfully!" };
    } catch (error: any) {
        logger.error("Exception in updatePromoCode:", error);
        return { success: false, message: error.message || "An error occurred." };
    }
}

export async function deletePromoCode(id: string) {
    try {
        const { error } = await supabaseServiceRoleClient.from("promo_codes").delete().eq("id", id);
        if (error) {
            logger.error("Error deleting promo code:", error);
            return { success: false, message: error.message };
        }
        return { success: true, message: "Promo code deleted successfully!" };
    } catch (error: any) {
        logger.error("Exception in deletePromoCode:", error);
        return { success: false, message: error.message || "An error occurred." };
    }
}

export async function getPromoCodes() {
    try {
        const { data, error } = await supabaseServiceRoleClient.from("promo_codes").select("*");

        if (error) {
            logger.error("Error fetching promo codes:", error);
            return [];
        }

        return data || [];
    } catch (error: any) {
        logger.error("Exception in getPromoCodes:", error);
        return [];
    }
}

export async function isPromoCodeValid(code: string) {
    try {
        const { data, error } = await supabaseServiceRoleClient
            .from("promo_codes")
            .select("*")
            .eq("code", code)
            .eq("is_active", true)
            .gt("end_date", new Date().toISOString())
            .maybeSingle();

        if (error) {
            logger.error("Error fetching promo codes:", error);
            return false;
        }

        logger.log("data", data);

        if (!data) {
            return false;
        } else {
            return true;
        }
    } catch (error: any) {
        logger.error("Exception in isPromoCodeValid:", error);
        return false;
    }
}
