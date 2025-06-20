"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function ToastHandlerServer({ message, type }: { message?: string; type?: any }) {
    useEffect(() => {
        if (message) {
            if (type === "success") toast.success(message);
            else if (type === "error") toast.error(message);
            else if (type === "message") toast.message(message);
            else if (type === "message") toast.message(message);
            else if (type === "info") toast.info(message);
            else if (type === "warning") toast.warning(message);
            else if (type === "warning") toast.warning(message);
            else toast(message);
        }
    }, [message, type]);
    return null;
}
