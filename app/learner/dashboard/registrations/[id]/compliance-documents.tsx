"use client"

import { useState } from "react"
import { DocumentUpload, type DocumentData } from "@/components/document-upload"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle } from "lucide-react"

interface ComplianceDocumentsProps {
  registrationId: string
  onDocumentsSubmitted: (documents: Record<string, DocumentData>) => void
  initialDocuments?: Record<string, DocumentData>
}

export function ComplianceDocuments({
  registrationId,
  onDocumentsSubmitted,
  initialDocuments = {},
}: ComplianceDocumentsProps) {
  const [documents, setDocuments] = useState<Record<string, DocumentData>>(initialDocuments)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Required document types
  const requiredDocuments = [
    {
      id: "identification",
      title: "Identification Document",
      description: "Upload a government-issued ID (passport, driver's license, etc.)",
    },
    {
      id: "qualification",
      title: "Qualification Certificate",
      description: "Upload your highest qualification certificate",
    },
    {
      id: "proof_of_address",
      title: "Proof of Address",
      description: "Upload a recent utility bill or bank statement (less than 3 months old)",
    },
  ]

  const handleDocumentChange = (documentId: string, documentData: DocumentData | null) => {
    setDocuments((prev) => {
      const newDocuments = { ...prev }

      if (documentData) {
        newDocuments[documentId] = documentData
      } else {
        delete newDocuments[documentId]
      }

      return newDocuments
    })

    // Reset status messages when documents change
    setError(null)
    setSuccess(false)
  }

  const handleSubmit = async () => {
    // Check if all required documents are uploaded
    const missingDocuments = requiredDocuments.filter((doc) => !documents[doc.id]).map((doc) => doc.title)

    if (missingDocuments.length > 0) {
      setError(`Missing required documents: ${missingDocuments.join(", ")}`)
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      // In a real implementation, you would save the document references to your database
      // await saveDocumentsToDatabase(registrationId, documents)

      // Call the callback with the documents
      onDocumentsSubmitted(documents)

      setSuccess(true)

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 5000)
    } catch (err) {
      setError((err as Error).message || "Failed to submit documents")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {requiredDocuments.map((doc) => (
          <DocumentUpload
            key={doc.id}
            title={doc.title}
            description={doc.description}
            documentType={doc.title}
            onDocumentChange={(data) => handleDocumentChange(doc.id, data)}
            initialDocument={documents[doc.id] || null}
          />
        ))}
      </div>

      {error && (
        <div className="flex items-center p-4 text-red-800 border border-red-300 rounded-lg bg-red-50">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="flex items-center p-4 text-green-800 border border-green-300 rounded-lg bg-green-50">
          <CheckCircle className="h-5 w-5 mr-2" />
          <span>Documents submitted successfully!</span>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || Object.keys(documents).length === 0}
          className="bg-gradient-to-r from-purple-600/90 via-indigo-700/90 to-cyan-500/90"
        >
          {isSubmitting ? "Submitting..." : "Submit Documents"}
        </Button>
      </div>
    </div>
  )
}
