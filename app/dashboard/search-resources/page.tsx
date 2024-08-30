'use client';

import { useState, useEffect, useCallback } from 'react';
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]); // Update with appropriate type for reviews

  useEffect(() => {
    fetchCoursesAndSubjects();
  }, []);

  useEffect(() => {
    fetchResources();
  }, [filters, sortBy, page, searchQuery]);

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

  const fetchResources = useCallback(async () => {
    try {
      const response = await fetch('/api/material/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: searchQuery,
          filters: {
            ...filters,
            type: filters.type.toLowerCase()
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
  }, [filters, sortBy, page, searchQuery]);

  const fetchReviews = useCallback(async (materialId: string) => {
    try {
      const response = await fetch(`/api/material/reviews?materialId=${materialId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data.reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      toast.error('Failed to fetch reviews');
    }
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
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

  const handleViewReviews = (materialId: string) => {
    fetchReviews(materialId);
    setSelectedMaterialId(materialId);
  };

  const closePopup = () => {
    setSelectedMaterialId(null);
    setReviews([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Search Resources</h2>
      <SearchBar onSearch={handleSearch} onSave={saveSearch} initialValue={searchQuery} />

      <div className="flex flex-wrap justify-between items-center my-4">
        <div className="flex flex-wrap items-center space-x-2 mb-2">
          <select 
            onChange={(e) => handleFilterChange({ ...filters, type: e.target.value })}
            value={filters.type}
            className="p-2 border rounded"
          >
            <option value="">All Types</option>
            <option value="pdf">PDF</option>
            <option value="docx">DOCX</option>
            <option value="xlsx">XLSX</option>
          </select>
          <select 
            onChange={(e) => handleFilterChange({ ...filters, course: e.target.value })}
            value={filters.course}
            className="p-2 border rounded"
          >
            <option value="">All Courses</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>{course}</option>
            ))}
          </select>
          <select 
            onChange={(e) => handleFilterChange({ ...filters, subject: e.target.value })}
            value={filters.subject}
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
            value={filters.tag}
            onChange={(e) => handleFilterChange({ ...filters, tag: e.target.value.toLowerCase() })}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <select 
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortBy}
            className="p-2 border rounded"
          >
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
          </select>
          <input 
            type="date" 
            value={filters.dateRange || ''}
            onChange={(e) => handleFilterChange({ ...filters, dateRange: e.target.value})}
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
            onBookmark={handleBookmark}
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

      {selectedMaterialId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded max-w-lg w-full">
            <h3 className="text-xl font-bold mb-4">Reviews</h3>
            <button onClick={closePopup} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
              &times;
            </button>
            <div className="overflow-y-auto max-h-80">
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 mb-2 pb-2">
                    <p className="font-semibold">{review.reviewerName}</p>
                    <p className="text-yellow-500">{'★'.repeat(review.rating)}</p>
                    <p>{review.reviewText}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available</p>
              )}
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" />
    </div>
  );
}
