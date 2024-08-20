import { useState, useEffect } from "react";

const categories = ["All", "Notes", "Articles", "Course Plans", "Question Papers"];
const formats = ["PDF", "DOCX", "PPT"];
const courses = ["MCA", "MBA", "AI/ML", "BCA", "BBA", "Other"];
const subjects = ["React", "Python", "Machine Learning", "SQL", "AWS", "Flutter", "Cybersecurity", "Data Visualization", "Agile Methodologies", "Blockchain"];
const contentTypes = ["Article", "Tutorial", "Case Study"];

interface FilterSidebarProps {
  filters: {
    category: string;
    formats: string[];
    dateRange: string;
    course: string;
    subject: string;
    tag: string;
    contentType: string;
  };
  onFilterChange: (filters: FilterSidebarProps['filters']) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    onFilterChange(localFilters);
  }, [localFilters, onFilterChange]);

  const updateFilter = (key: string, value: string | string[]) => {
    setLocalFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleFormat = (format: string) => {
    const newFormats = localFilters.formats.includes(format)
      ? localFilters.formats.filter(f => f !== format)
      : [...localFilters.formats, format];
    updateFilter('formats', newFormats);
  };

  return (
    <aside className="w-1/5 bg-white p-4 shadow-md">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category} className="my-2">
              <button
                onClick={() => updateFilter('category', category)}
                className={`text-gray-700 hover:text-blue-600 focus:outline-none ${
                  localFilters.category === category ? "font-bold" : ""
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Formats</h2>
        <ul>
          {formats.map(format => (
            <li key={format} className="my-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={localFilters.formats.includes(format)}
                  onChange={() => toggleFormat(format)}
                  className="mr-2"
                />
                {format}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Date Range</h2>
        <input
          type="date"
          value={localFilters.dateRange}
          onChange={(e) => updateFilter('dateRange', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Course</h2>
        <select
          value={localFilters.course}
          onChange={(e) => updateFilter('course', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Courses</option>
          {courses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Subject</h2>
        <select
          value={localFilters.subject}
          onChange={(e) => updateFilter('subject', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Subjects</option>
          {subjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Tag</h2>
        <input
          type="text"
          value={localFilters.tag}
          onChange={(e) => updateFilter('tag', e.target.value)}
          placeholder="Enter tag..."
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Content Type</h2>
        <select
          value={localFilters.contentType}
          onChange={(e) => updateFilter('contentType', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Content Types</option>
          {contentTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}