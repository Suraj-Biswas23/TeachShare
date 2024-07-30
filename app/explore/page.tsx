"use client";

import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import MaterialCard from "@/components/MaterialCard";
import Pagination from "@/components/Pagination";
import { useState } from "react";

const materials = [
  { id: 1, title: "Material 1", preview: "This is a preview of material 1", likes: 10, bookmarked: false },
  { id: 2, title: "Material 2", preview: "This is a preview of material 2", likes: 20, bookmarked: false},
  { id: 3, title: "Material 2", preview: "This is a preview of material 2", likes: 20, bookmarked: false },
  { id: 4, title: "Material 2", preview: "This is a preview of material 2", likes: 20, bookmarked: false },
  { id: 5, title: "Material 2", preview: "This is a preview of material 2", likes: 20, bookmarked: false },
  { id: 6, title: "Material 2", preview: "This is a preview of material 2", likes: 20, bookmarked: false },
  { id: 7, title: "Material 2", preview: "This is a preview of material 2", likes: 20, bookmarked: false },
  { id: 8, title: "Material 2", preview: "This is a preview of material 2", likes: 20, bookmarked: false },
  { id: 9, title: "Material 2", preview: "This is a preview of material 2", likes: 20, bookmarked: false },
  { id: 10, title: "Material 2", preview: "This is a preview of material 2", likes: 20, bookmarked: false },
  { id: 11, title: "Material 2", preview: "This is a preview of material 2", likes: 20, bookmarked: false },
  // Add more dummy data as needed
];

const ITEMS_PER_PAGE = 10;

export default function ExplorePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(materials.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMaterials = materials.slice(startIndex, endIndex);

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
              <SearchBar />
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