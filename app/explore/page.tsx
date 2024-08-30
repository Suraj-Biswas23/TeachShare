'use client';

import { useState, useEffect, useCallback } from 'react';
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import ResourceCard from "@/components/ResourceCard";
import { FaThList, FaThLarge } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';

interface Material {
  _id: string;
  title: string;
  description: string;
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
}

interface Filters {
  formats: string[];
  course: string;
  subject: string;
  tag: string;
  dateRange: string;
  sortBy: string;
}

export default function ExplorePage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState<Filters>({
    formats: [],
    course: '',
    subject: '',
    tag: '',
    dateRange: '',
    sortBy: 'relevance'
  });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [savedSearches, setSavedSearches] = useState<string[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    fetchCoursesAndSubjects();
    fetchMaterials();
  }, [filters, page]);

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

  const fetchMaterials = useCallback(async () => {
    try {
      const response = await fetch('/api/material/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filters, page }),
      });
      if (!response.ok) {
        throw new Error('Failed to fetch materials');
      }
      const data = await response.json();
      setMaterials(prevMaterials => page === 1 ? data.resources : [...prevMaterials, ...data.resources]);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast.error('Failed to fetch materials');
    }
  }, [filters, page]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setPage(1);
    if (!query) {
      await fetchMaterials();
      return;
    }
    try {
      const response = await fetch('/api/material/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, filters, page: 1 }),
      });
      if (!response.ok) {
        throw new Error('Search failed');
      }
      const data = await response.json();
      setMaterials(data.resources);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Error searching materials:', error);
      toast.error('Search failed');
    }
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setPage(1);
    setSearchQuery('');
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const saveSearch = (query: string) => {
    setSavedSearches(prev => [...prev, query]);
    toast.success(`Search saved: ${query}`);
  };

  const handleDownload = () => {
    router.push('/sign-in');
  };

  const handleShare = () => {
    router.push('/sign-in');
  };

  const handleReview = () => {
    router.push('/sign-in');
  };

  const handleBookmark = () => {
    router.push('/sign-in');
  };

  return (
    <>
      <Head>
        <title>Explore Resources - TeachShare</title>
        <meta name="description" content="Explore a wide variety of educational materials on TeachShare." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1">
          <FilterSidebar 
            filters={filters} 
            onFilterChange={handleFilterChange}
            courses={courses}
            subjects={subjects}
          />
          <div className="flex-1 container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-6">Explore Resources</h2>
            <SearchBar onSearch={handleSearch} onSave={saveSearch} initialValue={searchQuery} />

            <div className="flex justify-end items-center my-4">
              <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'text-blue-500' : ''}`}>
                <FaThLarge />
              </button>
              <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'text-blue-500' : ''}`}>
                <FaThList />
              </button>
            </div>

            <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
              {materials.map(material => (
                <ResourceCard 
                  key={material._id} 
                  resource={material}
                  onDownload={handleDownload}
                  onShare={handleShare}
                  onReview={handleReview}
                  onBookmark={handleBookmark}
                />
              ))}
            </div>

            {hasMore && (
              <button 
                onClick={loadMore} 
                className="mt-8 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mx-auto block"
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
          </div>
        </main>
        <Footer />
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}