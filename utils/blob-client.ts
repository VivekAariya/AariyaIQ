"use client";

export async function listBlobs(prefix = "uploads/", limit = 1000, cursor?: string) {
    try {
        const params = new URLSearchParams({ prefix, limit: limit.toString() });
        if (cursor) {
            params.append("cursor", cursor);
        }

        const response = await fetch(`/api/blob/list?${params}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to list files");
        }

        return await response.json();
    } catch (error) {
        console.error("Error listing blobs:", error);
        return { blobs: [], hasMore: false, cursor: null };
    }
}

export async function deleteBlob(url: string): Promise<{ success: boolean }> {
    try {
        const response = await fetch("/api/blob/delete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Delete failed");
        }

        return result;
    } catch (error) {
        console.error("Error deleting blob:", error);
        return { success: false };
    }
}

export async function getBlobMetadata(url: string) {
    try {
        const params = new URLSearchParams({ url });
        const response = await fetch(`/api/blob/metadata?${params}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to get metadata");
        }

        return await response.json();
    } catch (error) {
        console.error("Error getting blob metadata:", error);
        return null;
    }
}
