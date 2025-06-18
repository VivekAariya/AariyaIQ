"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileUploader } from "@/components/file-uploader"
import { Badge } from "@/components/ui/badge"
import { Trash2, FileText, Eye } from "lucide-react"
import { deleteFromBlob } from "@/lib/blob-storage"

interface DocumentUploadProps {
  title: string
  description: string
  documentType: string
  onDocumentChange: (documentData: DocumentData | null) => void
  initialDocument?: DocumentData | null
  acceptedFileTypes?: string
}

export interface DocumentData {
  url: string
  name: string
  size: number
  type: string
  uploadedAt: Date
}

export function DocumentUpload({
  title,
  description,
  documentType,
  onDocumentChange,
  initialDocument = null,
  acceptedFileTypes = ".pdf,.jpg,.jpeg,.png",
}: DocumentUploadProps) {
  const [document, setDocument] = useState<DocumentData | null>(initialDocument)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleUploadComplete = (fileData: { url: string; name: string; size: number }) => {
    const newDocument: DocumentData = {
      ...fileData,
      type: documentType,
      uploadedAt: new Date(),
    }

    setDocument(newDocument)
    onDocumentChange(newDocument)
  }

  const handleDelete = async () => {
    if (!document) return

    setIsDeleting(true)

    try {
      await deleteFromBlob(document.url)
      setDocument(null)
      onDocumentChange(null)
    } catch (error) {
      logger.error("Error deleting document:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {document ? (
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FileText className="h-8 w-8 text-blue-500" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium truncate max-w-[200px]">{document.name}</p>
                    <Badge variant="outline" className="text-xs">
                      {document.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(document.size)} • Uploaded {document.uploadedAt.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(document.url, "_blank")}
                  className="h-8 w-8 p-0"
                >
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View document</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete document</span>
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <FileUploader
            onUploadComplete={handleUploadComplete}
            folder={`documents/${documentType.toLowerCase().replace(/\s+/g, "-")}`}
            acceptedFileTypes={acceptedFileTypes}
            buttonText={`Upload ${title}`}
          />
        )}
      </CardContent>
      <CardFooter className="text-xs text-gray-500">Accepted file types: PDF, JPG, PNG • Max size: 10MB</CardFooter>
    </Card>
  )
}
