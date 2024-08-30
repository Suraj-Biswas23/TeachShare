// components/FilterSidebar.tsx
import React from 'react';

interface FilterSidebarProps {
  filters: {
    formats: string[];
    course: string;
    subject: string;
    tag: string;
    dateRange: string;
    sortBy: string;
  };
  onFilterChange: (filters: FilterSidebarProps['filters']) => void;
  courses: string[];
  subjects: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange, courses, subjects }) => {
  const handleChange = (key: string, value: string | string[]) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      <div className="mb-4">
        <label className="block mb-2">File Type</label>
        <select 
          value={filters.formats[0] || ''}
          onChange={(e) => handleChange('formats', [e.target.value])}
          className="w-full p-2 border rounded"
        >
          <option value="">All Types</option>
          <option value="pdf">PDF</option>
          <option value="docx">DOCX</option>
          <option value="xlsx">XLSX</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Course</label>
        <select 
          value={filters.course}
          onChange={(e) => handleChange('course', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Courses</option>
          {courses.map((course, index) => (
            <option key={index} value={course}>{course}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Subject</label>
        <select 
          value={filters.subject}
          onChange={(e) => handleChange('subject', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">All Subjects</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Tag</label>
        <input 
          type="text" 
          value={filters.tag}
          onChange={(e) => handleChange('tag', e.target.value)}
          placeholder="Filter by tag"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Upload Date</label>
        <input 
          type="date" 
          value={filters.dateRange}
          onChange={(e) => handleChange('dateRange', e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2">Sort By</label>
        <select 
          value={filters.sortBy}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="relevance">Relevance</option>
          <option value="mostViewed">Most Viewed</option>
          <option value="mostDownloaded">Most Downloaded</option>
          <option value="mostShared">Most Shared</option>
          <option value="highestRated">Highest Rated</option>
          <option value="mostReviewed">Most Reviewed</option>
          <option value="mostBookmarked">Most Bookmarked</option>
        </select>
      </div>
    </aside>
  );
};

export default FilterSidebar;