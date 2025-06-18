"use server"

import { put, del, list, head } from "@vercel/blob"
import { nanoid } from "nanoid"

/**
 * Upload a file to Vercel Blob storage
 * @param file File to upload
 * @param folder Optional folder path (e.g., "course-materials", "user-documents")
 * @returns Object containing the blob URL and other metadata
 */
export async function uploadToBlob(
  file: File,
  folder = "uploads",
): Promise<{ url: string; size: number; uploadedAt: Date }> {
  try {
    // Generate a unique filename with original extension
    const fileExtension = file.name.split(".").pop() || ""
    const uniqueFilename = `${folder}/${nanoid()}.${fileExtension}`

    // Upload to Vercel Blob
    const blob = await put(uniqueFilename, file, {
      access: "public", // or 'private' for sensitive files
      addRandomSuffix: false, // we're already using nanoid for uniqueness
    })

    return {
      url: blob.url,
      size: blob.size,
      uploadedAt: new Date(),
    }
  } catch (error) {
    logger.error("Error uploading to Blob storage:", error)
    throw new Error("Failed to upload file. Please try again.")
  }
}

/**
 * Delete a file from Vercel Blob storage
 * @param url URL of the blob to delete
 * @returns Success status
 */
export async function deleteFromBlob(url: string): Promise<{ success: boolean }> {
  try {
    await del(url)
    return { success: true }
  } catch (error) {
    logger.error("Error deleting from Blob storage:", error)
    return { success: false }
  }
}

/**
 * List files in a folder in Vercel Blob storage
 * @param prefix Folder prefix to list
 * @returns Array of blob objects
 */
export async function listBlobFiles(prefix = "uploads/"): Promise<any[]> {
  try {
    const { blobs } = await list({ prefix })
    return blobs
  } catch (error) {
    logger.error("Error listing Blob storage files:", error)
    return []
  }
}

/**
 * Check if a blob exists and get its metadata
 * @param url URL of the blob to check
 * @returns Blob metadata or null if not found
 */
export async function getBlobMetadata(url: string): Promise<any | null> {
  try {
    const metadata = await head(url)
    return metadata
  } catch (error) {
    logger.error("Error getting Blob metadata:", error)
    return null
  }
}
