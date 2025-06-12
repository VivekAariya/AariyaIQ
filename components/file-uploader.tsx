"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { uploadToBlob } from "@/lib/blob-storage"
import { X, Upload, FileText, CheckCircle, AlertCircle } from "lucide-react"

interface FileUploaderProps {
  onUploadComplete: (fileData: { url: string; name: string; size: number }) => void
  folder?: string
  acceptedFileTypes?: string
  maxSizeMB?: number
  buttonText?: string
}

export function FileUploader({
  onUploadComplete,
  folder = "uploads",
  acceptedFileTypes = "*",
  maxSizeMB = 10,
  buttonText = "Upload File",
}: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const maxSizeBytes = maxSizeMB * 1024 * 1024

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    setError(null)
    setSuccess(false)

    if (!selectedFile) return

    // Validate file size
    if (selectedFile.size > maxSizeBytes) {
      setError(`File size exceeds the ${maxSizeMB}MB limit`)
      return
    }

    setFile(selectedFile)
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setUploading(true)
      setProgress(10)

      // Simulate progress (in a real app, you might get actual progress)
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 10))
      }, 300)

      // Upload file to Blob storage
      const result = await uploadToBlob(file, folder)

      clearInterval(progressInterval)
      setProgress(100)
      setSuccess(true)

      // Call the callback with file data
      onUploadComplete({
        url: result.url,
        name: file.name,
        size: result.size,
      })

      // Reset after 2 seconds
      setTimeout(() => {
        setFile(null)
        setProgress(0)
      }, 2000)
    } catch (err) {
      setError((err as Error).message || "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  const handleCancel = () => {
    setFile(null)
    setError(null)
    setSuccess(false)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <div className="w-full space-y-4">
      {!file ? (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 transition-colors hover:border-gray-400">
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-2">Drag and drop or click to upload</p>
          <p className="text-xs text-gray-400 mb-4">
            Max file size: {maxSizeMB}MB
            {acceptedFileTypes !== "*" && ` • Accepted types: ${acceptedFileTypes}`}
          </p>
          <Button onClick={() => fileInputRef.current?.click()} variant="outline" className="bg-white hover:bg-gray-50">
            {buttonText}
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept={acceptedFileTypes}
            className="hidden"
          />
        </div>
      ) : (
        <div className="border rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-500" />
              <div>
                <p className="text-sm font-medium truncate max-w-[200px]">{file.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
              </div>
            </div>
            {!uploading && !success && (
              <Button variant="ghost" size="sm" onClick={handleCancel} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
                <span className="sr-only">Remove file</span>
              </Button>
            )}
            {success && <CheckCircle className="h-5 w-5 text-green-500" />}
          </div>

          {uploading && (
            <div className="space-y-2">
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-gray-500 text-right">{progress}%</p>
            </div>
          )}

          {error && (
            <div className="flex items-center space-x-2 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          {!uploading && !success && !error && (
            <div className="flex justify-end space-x-2">
              <Button variant="outline" size="sm" onClick={handleCancel}>
                Cancel
              </Button>
              <Button size="sm" onClick={handleUpload}>
                Upload
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
