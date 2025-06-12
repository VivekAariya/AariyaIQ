"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUploader } from "@/components/file-uploader"
import { Trash2, FileText, Eye, Plus } from "lucide-react"

interface CourseMaterialUploaderProps {
  courseId: string
  onMaterialsChange: (materials: CourseMaterial[]) => void
  initialMaterials?: CourseMaterial[]
}

export interface CourseMaterial {
  id: string
  title: string
  description: string
  type: string
  url: string
  fileName: string
  fileSize: number
  uploadedAt: Date
}

const materialTypes = [
  { value: "lecture", label: "Lecture Slides" },
  { value: "assignment", label: "Assignment" },
  { value: "reading", label: "Reading Material" },
  { value: "video", label: "Video Resource" },
  { value: "exercise", label: "Practice Exercise" },
  { value: "other", label: "Other" },
]

export function CourseMaterialUploader({
  courseId,
  onMaterialsChange,
  initialMaterials = [],
}: CourseMaterialUploaderProps) {
  const [materials, setMaterials] = useState<CourseMaterial[]>(initialMaterials)
  const [currentUpload, setCurrentUpload] = useState<{
    title: string
    description: string
    type: string
    file?: { url: string; name: string; size: number }
  }>({
    title: "",
    description: "",
    type: "lecture",
  })
  const [showUploadForm, setShowUploadForm] = useState(false)

  const handleFileUpload = (fileData: { url: string; name: string; size: number }) => {
    setCurrentUpload((prev) => ({
      ...prev,
      file: fileData,
    }))
  }

  const handleAddMaterial = () => {
    if (!currentUpload.title || !currentUpload.type || !currentUpload.file) return

    const newMaterial: CourseMaterial = {
      id: `material-${Date.now()}`,
      title: currentUpload.title,
      description: currentUpload.description,
      type: currentUpload.type,
      url: currentUpload.file.url,
      fileName: currentUpload.file.name,
      fileSize: currentUpload.file.size,
      uploadedAt: new Date(),
    }

    const updatedMaterials = [...materials, newMaterial]
    setMaterials(updatedMaterials)
    onMaterialsChange(updatedMaterials)

    // Reset form
    setCurrentUpload({
      title: "",
      description: "",
      type: "lecture",
    })
    setShowUploadForm(false)
  }

  const handleDeleteMaterial = (materialId: string) => {
    const updatedMaterials = materials.filter((material) => material.id !== materialId)
    setMaterials(updatedMaterials)
    onMaterialsChange(updatedMaterials)
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  const getMaterialTypeLabel = (value: string): string => {
    return materialTypes.find((type) => type.value === value)?.label || value
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Course Materials</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="flex items-center gap-1"
        >
          {showUploadForm ? (
            "Cancel"
          ) : (
            <>
              <Plus className="h-4 w-4" />
              Add Material
            </>
          )}
        </Button>
      </div>

      {showUploadForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Add New Course Material</CardTitle>
            <CardDescription>Upload a new resource for your course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={currentUpload.title}
                  onChange={(e) => setCurrentUpload({ ...currentUpload, title: e.target.value })}
                  placeholder="e.g., Week 1 Lecture Slides"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Material Type</Label>
                <Select
                  value={currentUpload.type}
                  onValueChange={(value) => setCurrentUpload({ ...currentUpload, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {materialTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={currentUpload.description}
                onChange={(e) => setCurrentUpload({ ...currentUpload, description: e.target.value })}
                placeholder="Brief description of this material"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>File</Label>
              <FileUploader
                onUploadComplete={handleFileUpload}
                folder={`courses/${courseId}/materials`}
                acceptedFileTypes=".pdf,.ppt,.pptx,.doc,.docx,.xls,.xlsx,.zip,.mp4,.mp3"
                buttonText="Upload Material"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleAddMaterial}
              disabled={!currentUpload.title || !currentUpload.type || !currentUpload.file}
              className="bg-gradient-to-r from-purple-600/90 via-indigo-700/90 to-cyan-500/90"
            >
              Add Material
            </Button>
          </CardFooter>
        </Card>
      )}

      {materials.length > 0 ? (
        <div className="space-y-4">
          {materials.map((material) => (
            <Card key={material.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <FileText className="h-8 w-8 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-medium">{material.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">{material.description}</p>
                      <div className="flex items-center mt-2 space-x-3">
                        <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">
                          {getMaterialTypeLabel(material.type)}
                        </span>
                        <span className="text-xs text-gray-500">{formatFileSize(material.fileSize)}</span>
                        <span className="text-xs text-gray-500">Added {material.uploadedAt.toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open(material.url, "_blank")}
                      className="h-8 w-8 p-0"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View material</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteMaterial(material.id)}
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete material</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border border-dashed rounded-lg">
          <p className="text-gray-500">No course materials added yet</p>
          {!showUploadForm && (
            <Button variant="link" onClick={() => setShowUploadForm(true)} className="mt-2">
              Add your first material
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
