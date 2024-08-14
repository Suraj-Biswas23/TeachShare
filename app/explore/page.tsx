"use client";

import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import MaterialCard from "@/components/MaterialCard";
import Pagination from "@/components/Pagination";
import { useState } from "react";

const initialMaterials = [
  { id: 1, title: "Material 1", preview: "This is a preview of material 1", likes: 10, bookmarked: false },
  { id: 2, title: "Material 2", preview: "This is a preview of material 2", likes: 20, bookmarked: false},
  { id: 3, title: "Material 3", preview: "This is a preview of material 3", likes: 15, bookmarked: false },
  { id: 4, title: "Material 4", preview: "This is a preview of material 4", likes: 25, bookmarked: false },
  { id: 5, title: "Material 5", preview: "This is a preview of material 5", likes: 30, bookmarked: false },
  { id: 6, title: "Material 6", preview: "This is a preview of material 6", likes: 18, bookmarked: false },
  { id: 7, title: "Material 7", preview: "This is a preview of material 7", likes: 22, bookmarked: false },
  { id: 8, title: "Material 8", preview: "This is a preview of material 8", likes: 12, bookmarked: false },
  { id: 9, title: "Material 9", preview: "This is a preview of material 9", likes: 28, bookmarked: false },
  { id: 10, title: "Material 10", preview: "This is a preview of material 10", likes: 35, bookmarked: false },
  { id: 11, title: "Material 11", preview: "This is a preview of material 11", likes: 19, bookmarked: false },
];

const ITEMS_PER_PAGE = 10;

export default function ExplorePage() {
  const [materials, setMaterials] = useState(initialMaterials);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMaterials = materials.filter(material =>
    material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    material.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredMaterials.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleSaveSearch = (query: string) => {
    // Implement save search functionality here
    console.log("Saving search:", query);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMaterials = filteredMaterials.slice(startIndex, endIndex);

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
          <FilterSidebar />
          <div className="flex flex-col flex-1 p-6">
            <div className="w-full max-w-3xl mx-auto">
              <SearchBar onSearch={handleSearch} onSave={handleSaveSearch} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {currentMaterials.map(material => (
                <MaterialCard key={material.id} material={material} />
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}