'use client'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { TagsInput } from 'react-tag-input-component'



export default function UploadForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [course, setCourse] = useState('')
  const [otherCourse, setOtherCourse] = useState('')
  const [subject, setSubject] = useState('')
  const [fileType, setFileType] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [uploadProgress, setUploadProgress] = useState(0)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: {[key: string]: string} = {}

    if (!title.trim()) newErrors.title = "Title is required"
    if (!description.trim()) newErrors.description = "Description is required"
    if (!course) newErrors.course = "Course is required"
    if (course === 'Other' && !otherCourse.trim()) newErrors.otherCourse = "Please specify the course"
    if (!subject.trim()) newErrors.subject = "Subject is required"
    if (!fileType) newErrors.fileType = "File type is required"
    if (tags.length === 0) newErrors.tags = "At least one tag is required"
    if (files.length === 0) newErrors.files = "At least one file is required"

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Clear any previous errors
    setErrors({})

    // Simulating upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i)
      await new Promise(resolve => setTimeout(resolve, 200))
    }

    const finalCourse = course === 'Other' ? otherCourse : course
    console.log({ title, description, files, course: finalCourse, subject, fileType, tags })

    // Reset form after  the submission
    setTitle('')
    setDescription('')
    setFiles([])
    setCourse('')
    setOtherCourse('')
    setSubject('')
    setFileType('')
    setTags([])
    setUploadProgress(0)
  }

  const removeFile = (index: number) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index))
  }

  return (
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
          <option value="MCA">MCA</option>
          <option value="MBA">MBA</option>
          <option value="AI/ML">AI/ML</option>
          <option value="BCA">BCA</option>
          <option value="BBA">BBA</option>
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
          <option value="PDF">PDF</option>
          <option value="DOCX">DOCX</option>
          <option value="XLSX">XLSX</option>
        </select>
        {errors.fileType && <p className="text-red-500 text-sm mt-1">{errors.fileType}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Tags <span className="text-red-500">*</span></label>
        <TagsInput
          value={tags}
          onChange={setTags}
          name="tags"
          placeHolder="Enter tags"
        />
        {errors.tags && <p className="text-red-500 text-sm mt-1">{errors.tags}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Files <span className="text-red-500">*</span></label>
        <div {...getRootProps()} className={`p-16 border-2 border-dashed rounded ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} flex justify-center items-center`}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag &apos;n&apos; drop  or click to select files</p>
          }
        </div>
        {errors.files && <p className="text-red-500 text-sm mt-1">{errors.files}</p>}
      </div>
      {files.length > 0 && (
        <div className="mb-4">
          <h3 className="font-bold mb-2">Uploaded Files:</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span>{file.name}</span>
                <button type="button" onClick={() => removeFile(index)} className="text-red-500">Remove</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {uploadProgress > 0 && (
        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded">
            <div 
              className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded" 
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadProgress}%
            </div>
          </div>
        </div>
      )}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Upload
      </button>
    </form>
  )
}