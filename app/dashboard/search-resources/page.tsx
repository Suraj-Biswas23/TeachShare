'use client';

import SearchBar from '@/components/SearchBar'
import ResourceCard from '@/components/ResourceCard'

export default function SearchResourcesPage() {
  // Mock data for demonstration
  const resources = [
    { id: 1, title: 'Introduction to React', type: 'PDF' },
    { id: 2, title: 'Advanced JavaScript Techniques', type: 'DOCX' },
    // Add more mock resources as needed
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Search Resources</h2>
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {resources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  )
}