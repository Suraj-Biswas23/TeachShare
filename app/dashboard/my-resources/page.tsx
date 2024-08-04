'use client';

import { useState } from 'react';
import ResourceCard from '@/components/ResourceCard';
import { FaPlus, FaFolder } from 'react-icons/fa';

export default function MyResourcesPage() {
  const [myResources, setMyResources] = useState([
    { id: 1, title: 'My Study Notes', type: 'PDF', date: '2023-08-01', views: 50, downloads: 20, shares: 5, rating: 4.5, reviews: 10, fileSize: 1.5, author: 'Me', contentType: 'Notes', bookmarks: 3, course: 'Computer Science', subject: 'Algorithms', tags: ['study', 'notes'] },
    { id: 2, title: 'Project Presentation', type: 'PPTX', date: '2023-07-15', views: 30, downloads: 15, shares: 3, rating: 4.0, reviews: 5, fileSize: 5.2, author: 'Me', contentType: 'Presentation', bookmarks: 2, course: 'Business', subject: 'Project Management', tags: ['project', 'presentation'] },
  ]);

  const [collections, setCollections] = useState([
    { id: 1, name: 'Study Materials', resourceIds: [1] },
    { id: 2, name: 'Project Files', resourceIds: [2] },
  ]);

  const handleEdit = (id: number) => {
    // Implement edit functionality
    console.log('Editing resource:', id);
  };

  const handleDelete = (id: number) => {
    setMyResources(resources => resources.filter(r => r.id !== id));
  };

  const handleArchive = (id: number) => {
    // Implement archive functionality
    console.log('Archiving resource:', id);
  };

  const handleShare = (id: number) => {
    // Implement share functionality
    console.log('Sharing resource:', id);
  };

  const handleCreateCollection = () => {
    // Implement create collection functionality
    console.log('Creating new collection');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Resources</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Collections</h3>
        <div className="flex space-x-2">
          {collections.map(collection => (
            <button key={collection.id} className="flex items-center bg-gray-200 px-3 py-2 rounded">
              <FaFolder className="mr-2" />
              {collection.name}
            </button>
          ))}
          <button onClick={handleCreateCollection} className="flex items-center bg-blue-500 text-white px-3 py-2 rounded">
            <FaPlus className="mr-2" />
            New Collection
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myResources.map(resource => (
          <ResourceCard 
            key={resource.id} 
            resource={resource}
            onEdit={() => handleEdit(resource.id)}
            onDelete={() => handleDelete(resource.id)}
            onArchive={() => handleArchive(resource.id)}
            onShare={() => handleShare(resource.id)}
          />
        ))}
      </div>
    </div>
  );
}