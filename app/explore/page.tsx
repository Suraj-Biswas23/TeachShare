"use client";

import { useState, useEffect } from 'react';
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import MaterialCard from "@/components/MaterialCard";
import { FaThList, FaThLarge } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Material {
  id: number;
  title: string;
  preview: string;
  category: string;
  format: string;
  date: string;
  course: string;
  subject: string;
  tags: string[];
  contentType: string;
  views: number;
  likes: number;
  bookmarked: boolean;
  author: string;
}

// Define the type for filters
interface Filters {
  category: string;
  formats: string[];
  dateRange: string;
  course: string;
  subject: string;
  tag: string;
  contentType: string;
}

// Initial materials data with updated categories and content types
const initialMaterials: Material[] = [
  {
    id: 1,
    title: "Introduction to React",
    preview: "Learn the basics of React, a popular JavaScript library for building user interfaces.",
    category: "Notes",
    format: "DOCX",
    date: "2023-05-12",
    course: "MCA",
    subject: "React",
    tags: ["react", "javascript", "frontend"],
    contentType: "Tutorial",
    views: 1200,
    likes: 300,
    bookmarked: false,
    author: "John Doe"
  },
  {
    id: 2,
    title: "Advanced Angular Concepts",
    preview: "Deep dive into advanced features of Angular for building scalable web applications.",
    category: "Articles",
    format: "PDF",
    date: "2023-06-25",
    course: "MBA",
    subject: "Angular",
    tags: ["angular", "javascript", "frontend"],
    contentType: "Article",
    views: 950,
    likes: 250,
    bookmarked: false,
    author: "Jane Doe"
  },
  {
    id: 3,
    title: "Mastering Python for Data Science",
    preview: "Learn how to apply Python to solve complex data science problems.",
    category: "Course Plans",
    format: "PDF",
    date: "2023-07-10",
    course: "AI/ML",
    subject: "Python",
    tags: ["python", "data-science", "backend"],
    contentType: "Case Study",
    views: 1200,
    likes: 320,
    bookmarked: false,
    author: "Alice Smith"
  },
  {
    id: 4,
    title: "Database Design Patterns",
    preview: "Explore best practices and design patterns for effective database management.",
    category: "Question Papers",
    format: "DOCX",
    date: "2023-06-30",
    course: "BCA",
    subject: "SQL",
    tags: ["database", "backend", "sql"],
    contentType: "Tutorial",
    views: 800,
    likes: 210,
    bookmarked: false,
    author: "John Roe"
  },
  {
    id: 5,
    title: "AWS Cloud Practitioner Essentials",
    preview: "Understand the core services and solutions provided by AWS Cloud.",
    category: "Notes",
    format: "PPT",
    date: "2023-08-22",
    course: "BBA",
    subject: "AWS",
    tags: ["cloud", "aws", "devops"],
    contentType: "Article",
    views: 1100,
    likes: 280,
    bookmarked: false,
    author: "Michael Brown"
  },
  {
    id: 6,
    title: "Building Mobile Apps with Flutter",
    preview: "Learn how to create cross-platform mobile applications using Flutter.",
    category: "Articles",
    format: "PDF",
    date: "2023-07-28",
    course: "Other",
    subject: "Flutter",
    tags: ["flutter", "mobile", "cross-platform"],
    contentType: "Tutorial",
    views: 980,
    likes: 240,
    bookmarked: false,
    author: "Sarah Lee"
  },
  {
    id: 7,
    title: "Introduction to Cybersecurity",
    preview: "Get started with the fundamentals of cybersecurity and protect your systems.",
    category: "Course Plans",
    format: "DOCX",
    date: "2023-09-12",
    course: "MCA",
    subject: "Cybersecurity",
    tags: ["security", "networking", "cybersecurity"],
    contentType: "Case Study",
    views: 1050,
    likes: 300,
    bookmarked: false,
    author: "David Chen"
  },
  {
    id: 8,
    title: "Getting Started with Vue.js",
    preview: "Learn the basics of Vue.js, a progressive JavaScript framework for building user interfaces.",
    category: "Question Papers",
    format: "PPT",
    date: "2023-08-05",
    course: "MBA",
    subject: "Vue",
    tags: ["vue", "javascript", "frontend"],
    contentType: "Article",
    views: 850,
    likes: 230,
    bookmarked: false,
    author: "Laura White"
  },
  {
    id: 9,
    title: "Data Structures and Algorithms in Java",
    preview: "Master the fundamental data structures and algorithms using Java.",
    category: "Notes",
    format: "PDF",
    date: "2023-06-15",
    course: "BCA",
    subject: "Java",
    tags: ["java", "data-structures", "algorithms"],
    contentType: "Tutorial",
    views: 1200,
    likes: 320,
    bookmarked: false,
    author: "Brian King"
  },
  {
    id: 10,
    title: "Introduction to Machine Learning with Python",
    preview: "Learn the core concepts of machine learning and how to implement them using Python.",
    category: "Articles",
    format: "PDF",
    date: "2023-07-20",
    course: "AI/ML",
    subject: "Machine Learning",
    tags: ["machine-learning", "python", "data-science"],
    contentType: "Case Study",
    views: 1400,
    likes: 380,
    bookmarked: false,
    author: "Sophia Moore"
  },
  {
    id: 11,
    title: "DevOps Best Practices with AWS",
    preview: "Learn how to apply DevOps principles using AWS cloud services.",
    category: "Course Plans",
    format: "PPT",
    date: "2023-09-01",
    course: "BBA",
    subject: "AWS",
    tags: ["devops", "cloud", "aws"],
    contentType: "Article",
    views: 950,
    likes: 260,
    bookmarked: false,
    author: "Emily Johnson"
  },
  {
    id: 12,
    title: "Full-Stack Web Development with Node.js",
    preview: "Become a full-stack developer by mastering Node.js and building scalable applications.",
    category: "Question Papers",
    format: "DOCX",
    date: "2023-06-22",
    course: "Other",
    subject: "Node.js",
    tags: ["nodejs", "javascript", "full-stack"],
    contentType: "Tutorial",
    views: 1300,
    likes: 340,
    bookmarked: false,
    author: "James Brown"
  },
  {
    id: 13,
    title: "Introduction to Kubernetes",
    preview: "Learn the fundamentals of Kubernetes for container orchestration.",
    category: "Notes",
    format: "DOCX",
    date: "2023-07-25",
    course: "Other",
    subject: "Kubernetes",
    tags: ["kubernetes", "cloud", "devops"],
    contentType: "Case Study",
    views: 1100,
    likes: 290,
    bookmarked: false,
    author: "Alice Taylor"
  },
  {
    id: 14,
    title: "Building RESTful APIs with Express",
    preview: "Learn how to create RESTful APIs using Express.js, a minimal and flexible Node.js web application framework.",
    category: "Articles",
    format: "PDF",
    date: "2023-08-10",
    course: "Other",
    subject: "Express.js",
    tags: ["express", "nodejs", "api"],
    contentType: "Tutorial",
    views: 950,
    likes: 260,
    bookmarked: false,
    author: "Chris Green"
  },
  {
    id: 15,
    title: "Introduction to Blockchain Development",
    preview: "Get started with blockchain development and learn how to create decentralized applications.",
    category: "Course Plans",
    format: "DOCX",
    date: "2023-09-05",
    course: "Other",
    subject: "Blockchain",
    tags: ["blockchain", "cryptocurrency", "development"],
    contentType: "Case Study",
    views: 1150,
    likes: 310,
    bookmarked: false,
    author: "Lisa Wang"
  }
];

const ITEMS_PER_PAGE = 10;

export default function ExplorePage() {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [filteredMaterials, setFilteredMaterials] = useState<Material[]>(initialMaterials);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [filters, setFilters] = useState<Filters>({
    category: 'All',
    formats: [],
    dateRange: '',
    course: '',
    subject: '',
    tag: '',
    contentType: ''
  });
  const [savedSearches, setSavedSearches] = useState<string[]>([]);

  useEffect(() => {
    // Apply filters and sorting
    let result = materials.filter(material =>
      (searchQuery === "" || material.title.toLowerCase().includes(searchQuery.toLowerCase()) || material.preview.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (filters.category === 'All' || material.category === filters.category) &&
      (filters.formats.length === 0 || filters.formats.some(format => material.format.includes(format))) &&
      (filters.dateRange === '' || new Date(material.date) >= new Date(filters.dateRange)) &&
      (filters.course === '' || material.course === filters.course) &&
      (filters.subject === '' || material.subject === filters.subject) &&
      (filters.tag === '' || material.tags.some(tag => tag.toLowerCase().includes(filters.tag.toLowerCase()))) &&
      (filters.contentType === '' || material.contentType === filters.contentType)
    );

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case 'mostViewed': return b.views - a.views;
        case 'mostLiked': return b.likes - a.likes;
        case 'mostRecent': return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'aToZ': return a.title.localeCompare(b.title);
        case 'zToA': return b.title.localeCompare(a.title);
        default: return 0; // relevance (no change)
      }
    });

    setFilteredMaterials(result);
    setCurrentPage(1);
  }, [materials, searchQuery, filters, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    toast.info(`Searching for: ${query}`);
  };

  const handleSaveSearch = (query: string) => {
    setSavedSearches(prev => [...prev, query]);
    toast.success(`Search saved: ${query}`);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSort: string) => {
    setSortBy(newSort);
  };

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const currentMaterials = filteredMaterials.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMore = filteredMaterials.length > currentPage * ITEMS_PER_PAGE;

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
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          <div className="flex flex-col flex-1 p-6">
            <div className="w-full max-w-3xl mx-auto">
              <SearchBar onSearch={handleSearch} onSave={handleSaveSearch} />
            </div>
            <div className="flex justify-between items-center mt-4">
              <select 
                onChange={(e) => handleSortChange(e.target.value)}
                className="p-2 border rounded"
              >
                <option value="relevance">Relevance</option>
                <option value="mostViewed">Most Viewed</option>
                <option value="mostLiked">Most Liked</option>
                <option value="mostRecent">Most Recent</option>
                <option value="aToZ">A to Z</option>
                <option value="zToA">Z to A</option>
              </select>
              <div>
                <button onClick={() => setView('grid')} className={`p-2 ${view === 'grid' ? 'text-blue-500' : ''}`}>
                  <FaThLarge />
                </button>
                <button onClick={() => setView('list')} className={`p-2 ${view === 'list' ? 'text-blue-500' : ''}`}>
                  <FaThList />
                </button>
              </div>
            </div>
            <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6" : "space-y-4 mt-6"}>
              {currentMaterials.map(material => (
                <MaterialCard key={material.id} material={material} />
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



