'use client'

import { useState, useEffect } from 'react'
import { TagsInput } from 'react-tag-input-component'
import axios from 'axios'
import { UploadButton } from "@/utils/uploadthing"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from '@/components/ui/dialog'

export default function UploadForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [course, setCourse] = useState('')
  const [otherCourse, setOtherCourse] = useState('')
  const [subject, setSubject] = useState('')
  const [fileType, setFileType] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [courses, setCourses] = useState<string[]>([])
  const [fileUrl, setFileUrl] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<{ name: string; url: string } | null>(null)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses')
        console.log('Fetched courses:', response.data);
        const courseNames = response.data.map((course: { name: string }) => course.name)
        setCourses(courseNames)
      } catch (error) {
        console.error('Failed to fetch courses:', error)
      }
    }

    fetchCourses()
  }, [])

  const handleRemoveFile = () => {
    setUploadedFile(null);
    setFileUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}

    if (!title.trim()) newErrors.title = "Title is required"
    if (!description.trim()) newErrors.description = "Description is required"
    if (!course) newErrors.course = "Course is required"
    if (course === 'Other' && !otherCourse.trim()) newErrors.otherCourse = "Please specify the course"
    if (!subject.trim()) newErrors.subject = "Subject is required"
    if (!fileType) newErrors.fileType = "File type is required"
    if (tags.length === 0 || tags.every(tag => tag.trim() === '')) {
      newErrors.tags = "At least one non-empty tag is required"
    }
    if (!fileUrl) newErrors.fileUrl = "File upload is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})

    const payload = {
      title,
      description,
      course: course === 'Other' ? 'Other' : course,
      ...(course === 'Other' && { specificCourse: otherCourse }),
      subject,
      fileType: fileType.toLowerCase(),
      tags,
      fileUrl,
      views: 0,      // Default initial value
      shares: 0,     // Default initial value
      rating: 0,     // Default initial value
      reviews: 0,    // Default initial value
      bookmarks: 0   // Default initial value
    }

    try {
      const response = await axios.post('/api/material/insert/', payload)
      console.log('Upload response:', response.data)
      setTitle('')
      setDescription('')
      setCourse('')
      setOtherCourse('')
      setSubject('')
      setFileType('')
      setTags([])
      setFileUrl(null)
      setUploadedFile(null)
      setShowSuccessPopup(true)  // Show success popup
    } catch (error) {
      console.error('Upload failed:', error)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description <span className="text-red-500">*</span></label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows={4}
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="course" className="block mb-2">Course <span className="text-red-500">*</span></label>
          <select
            id="course"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select course</option>
            {courses.map((courseOption, index) => (
              <option key={index} value={courseOption}>{courseOption}</option>
            ))}
            <option value="Other">Other</option>
          </select>
          {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
        </div>
        {course === 'Other' && (
          <div className="mb-4">
            <label htmlFor="otherCourse" className="block mb-2">Specify Course <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="otherCourse"
              value={otherCourse}
              onChange={(e) => setOtherCourse(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            {errors.otherCourse && <p className="text-red-500 text-sm mt-1">{errors.otherCourse}</p>}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="subject" className="block mb-2">Subject <span className="text-red-500">*</span></label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
          {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="fileType" className="block mb-2">File Type <span className="text-red-500">*</span></label>
          <select
            id="fileType"
            value={fileType}
            onChange={(e) => setFileType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select file type</option>
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
            <option value="xlsx">XLSX</option>
            <option value="ppt">PPT</option>
            <option value="other">Other</option>
          </select>
          {errors.fileType && <p className="text-red-500 text-sm mt-1">{errors.fileType}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Tags <span className="text-red-500">*</span></label>
          <TagsInput
            value={tags}
            onChange={(newTags) => {
              console.log('New tags:', newTags);
              setTags(newTags);
              if (newTags.length > 0) {
                setErrors(prev => ({ ...prev, tags: '' }));
              }
            }}
            name="tags"
            placeHolder="Enter tags"
            separators={['Enter', ',', ' ']}
          />
          {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Upload File <span className="text-red-500">*</span></label>
          {uploadedFile ? (
            <div className="flex items-center space-x-2">
              <span>{uploadedFile.name}</span>
              <button 
                onClick={handleRemoveFile}
                className="text-red-500 hover:text-red-700"
                type="button"
              >
                ✕
              </button>
            </div>
          ) : (
            <UploadButton
              endpoint="pdfUploader"
              onClientUploadComplete={(res) => {
                console.log("Files: ", res);
                if (res && res[0]) {
                  setUploadedFile({ name: res[0].name, url: res[0].url });
                  setFileUrl(res[0].url);
                }
              }}
              onUploadError={(error: Error) => {
                console.error("Upload error: ", error);
              }}
            />
          )}
          {errors.fileUrl && <p className="text-red-500 text-sm mt-1">{errors.fileUrl}</p>}
        </div>
        <div className="mt-8">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Upload</button>
        </div>
      </form>

      <Dialog open={showSuccessPopup} onOpenChange={setShowSuccessPopup}>
        <DialogTrigger />
        <DialogContent>
          <DialogTitle>Success!</DialogTitle>
          <p>Your material has been uploaded successfully.</p>
          <DialogClose />
        </DialogContent>
      </Dialog>
    </>
  )
}