'use client';

import { useState, useEffect, useCallback } from 'react';
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import ExploreResourceCard from "@/components/ExploreResourceCard";
import { FaThList, FaThLarge } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import { useUser } from "@clerk/nextjs";

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
  bookmarks: number;
  fileSize: number;
  description?: string;
}

interface Filters {
  type: string;
  dateRange: string;
  course: string;
  subject: string;
  tag: string;
}

export default function ExplorePage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [filters, setFilters] = useState<Filters>({
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

  const router = useRouter();
  const { isSignedIn } = useUser();

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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleFilterChange = (newFilters: Filters) => {
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

  const handleInteraction = useCallback(() => {
    if (!isSignedIn) {
      router.push('/sign-in');
    } else {
      router.push('/dashboard/search-resources');
    }
  }, [isSignedIn, router]);

  return (
    <>
      <Head>
        <title>Explore Resources - TeachShare</title>
        <meta name="description" content="Explore a wide variety of educational materials on TeachShare." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-6">Explore Resources</h2>
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
              <ExploreResourceCard
                key={resource._id}
                resource={resource}
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
        </main>
        <Footer />
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}