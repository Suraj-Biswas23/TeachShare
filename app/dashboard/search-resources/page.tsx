// 'use client';

// import { useState, useEffect } from 'react';
// import SearchBar from '@/components/SearchBar';
// import ResourceCard from '@/components/ResourceCard';
// import { FaThList, FaThLarge } from 'react-icons/fa';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// // Assuming we have a way to fetch the courses and subjects from UploadForm
// const fetchCoursesAndSubjects = () => {
//   // This should be replaced with actual logic to fetch from UploadForm
//   return {
//     courses: ['MCA', 'MBA', 'AI/ML', 'BCA', 'BBA', 'Other'],
//     subjects: ['React', 'Python', 'Machine Learning', 'SQL', 'AWS', 'Flutter', 'Cybersecurity', 'Data Visualization', 'Agile Methodologies', 'Blockchain']
//   };
// };

// const { courses, subjects } = fetchCoursesAndSubjects();
// const mockResources = [
//   { id: 1, title: 'Introduction to React', type: 'PDF', date: '2023-08-01', popularity: 100, views: 500, downloads: 200, shares: 50, rating: 4.5, reviews: 30, fileSize: 2.5, author: 'John Doe', contentType: 'Tutorial', bookmarks: 80, course: 'Web Development', subject: 'React', tags: ['frontend', 'javascript'] },
  
//   { id: 2, title: 'Advanced Python Programming', type: 'DOCX', date: '2023-07-15', popularity: 85, views: 420, downloads: 180, shares: 40, rating: 4.2, reviews: 25, fileSize: 1.8, author: 'Jane Smith', contentType: 'Article', bookmarks: 65, course: 'Computer Science', subject: 'Python', tags: ['backend', 'data-science'] },
  
//   { id: 3, title: 'Machine Learning Fundamentals', type: 'PDF', date: '2023-09-05', popularity: 120, views: 600, downloads: 250, shares: 70, rating: 4.8, reviews: 40, fileSize: 3.2, author: 'Alex Johnson', contentType: 'Case Study', bookmarks: 95, course: 'Data Science', subject: 'Machine Learning', tags: ['AI', 'statistics'] },
  
//   { id: 4, title: 'Database Design Best Practices', type: 'XLSX', date: '2023-06-20', popularity: 90, views: 450, downloads: 190, shares: 45, rating: 4.0, reviews: 20, fileSize: 1.5, author: 'Emily Brown', contentType: 'Tutorial', bookmarks: 70, course: 'Database Management', subject: 'SQL', tags: ['database', 'backend'] },
  
//   { id: 5, title: 'Cloud Computing Essentials', type: 'PDF', date: '2023-08-20', popularity: 110, views: 550, downloads: 220, shares: 60, rating: 4.6, reviews: 35, fileSize: 2.8, author: 'Michael Wilson', contentType: 'Article', bookmarks: 85, course: 'Cloud Technologies', subject: 'AWS', tags: ['cloud', 'DevOps'] },
  
//   { id: 6, title: 'Mobile App Development with Flutter', type: 'DOCX', date: '2023-07-30', popularity: 95, views: 480, downloads: 200, shares: 55, rating: 4.3, reviews: 28, fileSize: 2.0, author: 'Sarah Lee', contentType: 'Tutorial', bookmarks: 75, course: 'Mobile Development', subject: 'Flutter', tags: ['mobile', 'cross-platform'] },
  
//   { id: 7, title: 'Cybersecurity Fundamentals', type: 'PDF', date: '2023-09-10', popularity: 105, views: 520, downloads: 210, shares: 65, rating: 4.7, reviews: 38, fileSize: 3.0, author: 'David Chen', contentType: 'Case Study', bookmarks: 90, course: 'Information Security', subject: 'Cybersecurity', tags: ['security', 'networking'] },
  
//   { id: 8, title: 'Data Visualization Techniques', type: 'XLSX', date: '2023-06-25', popularity: 88, views: 440, downloads: 185, shares: 42, rating: 4.1, reviews: 22, fileSize: 1.7, author: 'Olivia Taylor', contentType: 'Article', bookmarks: 68, course: 'Data Analytics', subject: 'Data Visualization', tags: ['analytics', 'BI'] },
  
//   { id: 9, title: 'Agile Project Management', type: 'PDF', date: '2023-08-15', popularity: 98, views: 490, downloads: 205, shares: 58, rating: 4.4, reviews: 32, fileSize: 2.3, author: 'Robert Martinez', contentType: 'Tutorial', bookmarks: 78, course: 'Project Management', subject: 'Agile Methodologies', tags: ['agile', 'scrum'] },
  
//   { id: 10, title: 'Blockchain Technology Overview', type: 'DOCX', date: '2023-07-05', popularity: 92, views: 460, downloads: 195, shares: 48, rating: 4.2, reviews: 26, fileSize: 1.9, author: 'Lisa Wang', contentType: 'Article', bookmarks: 72, course: 'Emerging Technologies', subject: 'Blockchain', tags: ['blockchain', 'cryptocurrency'] }
// ];

// export default function SearchResourcesPage() {
//   const [resources, setResources] = useState(mockResources);
//   const [view, setView] = useState<'grid' | 'list'>('grid');
//   const [sortBy, setSortBy] = useState<string>('relevance');
//   const [filters, setFilters] = useState({ 
//     type: '', 
//     dateRange: '',
//     course: '',
//     subject: '',
//     tag: '',
//     contentType: ''
//   });
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [savedSearches, setSavedSearches] = useState<string[]>([])

//   useEffect(() => {
//     // Simulating API call with filters and sorting
//     let filteredResources = mockResources.filter(resource => 
//       (filters.type ? resource.type === filters.type : true) &&
//       (filters.dateRange ? resource.date >= filters.dateRange : true) &&
//       (filters.course ? resource.course === filters.course : true) &&
//       (filters.subject ? resource.subject === filters.subject : true) &&
//       (filters.tag ? resource.tags.some(tag => tag.toLowerCase().includes(filters.tag.toLowerCase())) : true) &&
//       (filters.contentType ? resource.contentType === filters.contentType : true)
//     );

//     filteredResources.sort((a, b) => {
//       switch (sortBy) {
//         case 'mostViewed': return b.views - a.views;
//         case 'mostDownloaded': return b.downloads - a.downloads;
//         case 'mostShared': return b.shares - a.shares;
//         case 'highestRated': return b.rating - a.rating;
//         case 'mostReviewed': return b.reviews - a.reviews;
//         case 'aToZ': return a.title.localeCompare(b.title);
//         case 'zToA': return b.title.localeCompare(a.title);
//         case 'largestFirst': return b.fileSize - a.fileSize;
//         case 'smallestFirst': return a.fileSize - b.fileSize;
//         case 'authorAZ': return a.author.localeCompare(b.author);
//         case 'mostBookmarked': return b.bookmarks - a.bookmarks;
//         default: return 0; // relevance (no change)
//       }
//     });

//     setResources(filteredResources.slice(0, page * 10));
//     setHasMore(filteredResources.length > page * 10);
//   }, [filters, sortBy, page]);

//   const handleSearch = (query: string) => {
//     // Implement search logic here
//     console.log('Searching for:', query);
//     toast.info(`Searching for: ${query}`);
//   };
  
//   const handleFilterChange = (newFilters: typeof filters) => {
//     setFilters(newFilters);
//     setPage(1);
//   };

//   const handleSortChange = (newSort: string) => {
//     setSortBy(newSort);
//     setPage(1);
//   };

//   const loadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   const saveSearch = (query: string) => {
//     setSavedSearches(prev => [...prev, query]);
//     toast.success(`Search saved: ${query}`);
//   };
//   // Placeholder functions for ResourceCard props
//   const handleEdit = (id: number) => {
//     console.log('Editing resource:', id);
//     toast.info(`Editing resource: ${id}`);
//   };

//   const handleDelete = (id: number) => {
//     setResources(resources => resources.filter(r => r.id !== id));
//     toast.success(`Resource ${id} deleted`);
//   };

//   const handleArchive = (id: number) => {
//     console.log('Archiving resource:', id);
//     toast.info(`Archiving resource: ${id}`);
//   };

//   const handleShare = (id: number) => {
//     console.log('Sharing resource:', id);
//     toast.info(`Sharing resource: ${id}`);
//   };

//   const handleDownload = (id: number) => {
//     console.log('Downloading resource:', id);
//     toast.success(`Downloading resource: ${id}`);
//   };


//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-3xl font-bold mb-6">Search Resources</h2>
//       <SearchBar onSearch={handleSearch} onSave={saveSearch} />

//       <div className="flex flex-wrap justify-between items-center my-4">
//         <div className="flex flex-wrap items-center space-x-2 mb-2">
//           <select 
//             onChange={(e) => handleFilterChange({ ...filters, type: e.target.value })}
//             className="p-2 border rounded"
//           >
//             <option value="">All Types</option>
//             <option value="PDF">PDF</option>
//             <option value="DOCX">DOCX</option>
//             <option value="XLSX">XLSX</option>
//           </select>
//           <select 
//             onChange={(e) => handleFilterChange({ ...filters, course: e.target.value })}
//             className="p-2 border rounded"
//           >
//             <option value="">All Courses</option>
//             {courses.map((course, index) => (
//               <option key={index} value={course}>{course}</option>
//             ))}
//           </select>
//           <select 
//             onChange={(e) => handleFilterChange({ ...filters, subject: e.target.value })}
//             className="p-2 border rounded"
//           >
//             <option value="">All Subjects</option>
//             {subjects.map((subject, index) => (
//               <option key={index} value={subject}>{subject}</option>
//             ))}
//           </select>
//           <input 
//             type="text" 
//             placeholder="Filter by tag"
//             onChange={(e) => handleFilterChange({ ...filters, tag: e.target.value.toLowerCase() })}
//             className="p-2 border rounded"
//           />
//           <select 
//             onChange={(e) => handleFilterChange({ ...filters, contentType: e.target.value })}
//             className="p-2 border rounded"
//           >
//             <option value="">All Content Types</option>
//             <option value="Article">Article</option>
//             <option value="Tutorial">Tutorial</option>
//             <option value="Case Study">Case Study</option>
//           </select>
//         </div>
//         <div className="flex items-center space-x-2 mb-2">
//           <select 
//             onChange={(e) => handleSortChange(e.target.value)}
//             className="p-2 border rounded"
//           >
//             <optgroup label="Relevance">
//               <option value="relevance">Relevance</option>
//               <option value="mostViewed">Most Viewed</option>
//               <option value="mostDownloaded">Most Downloaded</option>
//               <option value="mostShared">Most Shared</option>
//               <option value="highestRated">Highest Rated</option>
//               <option value="mostReviewed">Most Reviewed</option>
//               <option value="aToZ">A to Z</option>
//               <option value="zToA">Z to A</option>
//               <option value="largestFirst">Largest First</option>
//               <option value="smallestFirst">Smallest First</option>
//               <option value="authorAZ">Author A-Z</option>
//               <option value="mostBookmarked">Most Bookmarked</option>
//             </optgroup>
//           </select>
//           <input 
//             type="date" 
//             onChange={(e) => handleFilterChange({ ...filters, dateRange: e.target.value })}
//             className="p-2 border rounded"
//           />
//           <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'text-blue-500' : ''}`}>
//             <FaThLarge />
//           </button>
//           <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'text-blue-500' : ''}`}>
//             <FaThList />
//           </button>
//         </div>
//       </div>

//       <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
//         {resources.map(resource => (
//           <ResourceCard 
//             key={resource.id} 
//             resource={resource}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//             onArchive={handleArchive}
//             onShare={handleShare}
//             onDownload={handleDownload}
//           />
//         ))}
//       </div>

//       {hasMore && (
//         <button 
//           onClick={loadMore} 
//           className="mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//         >
//           Load More
//         </button>
//       )}

//       {savedSearches.length > 0 && (
//         <div className="mt-8">
//           <h3 className="text-xl font-bold mb-2">Saved Searches</h3>
//           <ul>
//             {savedSearches.map((search, index) => (
//               <li key={index} className="mb-1">
//                 <button 
//                   onClick={() => handleSearch(search)}
//                   className="text-blue-500 hover:underline"
//                 >
//                   {search}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <ToastContainer position="bottom-right" />
//     </div>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import ResourceCard from '@/components/ResourceCard';
import { FaThList, FaThLarge } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the Resource type
interface Resource {
  _id: string;
  title: string;
  uploaderName: string;
  course: string;
  subject: string;
  fileType: string;
  uploadDate: string;
  tags: string[];
  fileUrl: string;
  views: number;
  downloads: number;
  shares: number;
  rating: number;
  reviews: number;
  fileSize: number;
  bookmarks: number;
}

export default function SearchResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [filters, setFilters] = useState({
    type: '',
    dateRange: '',
    course: '',
    subject: '',
    tag: ''
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);

  useEffect(() => {
    fetchCoursesAndSubjects();
    fetchResources();
  }, [filters, sortBy, page]);

  const fetchCoursesAndSubjects = async () => {
    try {
      const coursesResponse = await fetch('/api/courses');
      if (!coursesResponse.ok) {
        throw new Error('Failed to fetch courses');
      }
      const coursesData = await coursesResponse.json();
      setCourses(coursesData.map((course: { name: string }) => course.name));

      const subjectsResponse = await fetch('/api/subjects');
      if (!subjectsResponse.ok) {
        throw new Error('Failed to fetch subjects');
      }
      const subjectsData = await subjectsResponse.json();
      setSubjects(subjectsData);

    } catch (error) {
      console.error('Error fetching courses and subjects:', error);
      toast.error('Failed to fetch courses and subjects');
    }
  };

  const fetchResources = async () => {
    try {
      const response = await fetch('/api/material/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          filters: {
            ...filters,
            type: filters.type.toLowerCase()  // Convert to lowercase for case-insensitive comparison
          }, 
          sortBy, 
          page 
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch resources');
      }
      const data = await response.json();
      setResources(prevResources => page === 1 ? data.resources : [...prevResources, ...data.resources]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching resources:', error);
      toast.error('Failed to fetch resources');
    }
  };

  const handleSearch = async (query: string) => {
    try {
      const response = await fetch('/api/material/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query, 
          filters: {
            ...filters,
            type: filters.type.toLowerCase()  // Convert to lowercase for case-insensitive comparison
          }, 
          sortBy, 
          page: 1 
        }),
      });
      const data = await response.json();
      setResources(data.resources);
      setHasMore(data.hasMore);
      setPage(1);
    } catch (error) {
      console.error('Error searching resources:', error);
      toast.error('Search failed');
    }
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const saveSearch = (query: string) => {
    setSavedSearches(prev => [...prev, query]);
    toast.success(`Search saved: ${query}`);
  };

  const handleDownload = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileUrl.split('/').pop() || 'download';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      toast.success('Download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const handleShare = (fileUrl: string) => {
    navigator.clipboard.writeText(fileUrl).then(() => {
      toast.success('Link copied to clipboard');
    }, () => {
      toast.error('Failed to copy link');
    });
  };

  const handleBookmark = (resourceId: string) => {
    // Add your bookmark logic here
    toast.success('Resource bookmarked');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Search Resources</h2>
      <SearchBar onSearch={handleSearch} onSave={saveSearch} />

      <div className="flex flex-wrap justify-between items-center my-4">
        <div className="flex flex-wrap items-center space-x-2 mb-2">
          <select 
            onChange={(e) => handleFilterChange({ ...filters, type: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
            <option value="xlsx">XLSX</option>
          </select>
          <select 
            onChange={(e) => handleFilterChange({ ...filters, course: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">All Courses</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
          <select 
            onChange={(e) => handleFilterChange({ ...filters, subject: e.target.value })}
            className="p-2 border rounded"
          >
            <option value="">All Subjects</option>
            {subjects.map((subject, index) => (
              <option key={index} value={subject}>{subject}</option>
            ))}
          </select>
          <input 
            type="text" 
            placeholder="Filter by tag"
            onChange={(e) => handleFilterChange({ ...filters, tag: e.target.value.toLowerCase() })}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <select 
            onChange={(e) => handleSortChange(e.target.value)}
            className="p-2 border rounded"
          >
            <optgroup label="Relevance">
              <option value="relevance">Relevance</option>
              <option value="mostViewed">Most Viewed</option>
              <option value="mostDownloaded">Most Downloaded</option>
              <option value="mostShared">Most Shared</option>
              <option value="highestRated">Highest Rated</option>
              <option value="mostReviewed">Most Reviewed</option>
              <option value="aToZ">A to Z</option>
              <option value="zToA">Z to A</option>
              <option value="largestFirst">Largest First</option>
              <option value="smallestFirst">Smallest First</option>
              <option value="authorAZ">Author A-Z</option>
              <option value="mostBookmarked">Most Bookmarked</option>
            </optgroup>
          </select>
          <input 
            type="date" 
            onChange={(e) => handleFilterChange({ ...filters, dateRange: e.target.value })}
            className="p-2 border rounded"
          />
          <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'text-blue-500' : ''}`}>
            <FaThLarge />
          </button>
          <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'text-blue-500' : ''}`}>
            <FaThList />
          </button>
        </div>
      </div>

      <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
        {resources.map(resource => (
          <ResourceCard 
            key={resource._id} 
            resource={resource}
            onDownload={handleDownload}
            onShare={handleShare}
            onBookmark={handleBookmark} // Pass onBookmark prop
          />
        ))}
      </div>

      {hasMore && (
        <button 
          onClick={loadMore} 
          className="mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Load More
        </button>
      )}

      {savedSearches.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-2">Saved Searches</h3>
          <ul>
            {savedSearches.map((search, index) => (
              <li key={index} className="mb-1">
                <button 
                  onClick={() => handleSearch(search)}
                  className="text-blue-500 hover:underline"
                >
                  {search}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
}
