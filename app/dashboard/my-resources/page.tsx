// app/dashboard/my-resources/page.tsx

'use client';

import { useState } from 'react';
import ResourceCard from '@/components/ResourceCard';
import { FaPlus, FaFolder, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface Resource {
  id: number;
  title: string;
  type: string;
  date: string;
  views: number;
  downloads: number;
  shares: number;
  rating: number;
  reviews: number;
  fileSize: number;
  author: string;
  contentType: string;
  bookmarks: number;
  course: string;
  subject: string;
  tags: string[];
  fileUrl?: string;
}

interface Collection {
  id: number;
  name: string;
  resourceIds: number[];
}

export default function MyResourcesPage() {
  const [myResources, setMyResources] = useState<Resource[]>([
    { id: 1, title: 'My Study Notes', type: 'PDF', date: '2023-08-01', views: 50, downloads: 20, shares: 5, rating: 4.5, reviews: 10, fileSize: 1.5, author: 'Me', contentType: 'Notes', bookmarks: 3, course: 'Computer Science', subject: 'Algorithms', tags: ['study', 'notes'], fileUrl: 'https://example.com/study-notes.pdf' },
    { id: 2, title: 'Project Presentation', type: 'PPTX', date: '2023-07-15', views: 30, downloads: 15, shares: 3, rating: 4.0, reviews: 5, fileSize: 5.2, author: 'Me', contentType: 'Presentation', bookmarks: 2, course: 'Business', subject: 'Project Management', tags: ['project', 'presentation'] },
  ]);

  const [collections, setCollections] = useState<Collection[]>([
    { id: 1, name: 'Study Materials', resourceIds: [1] },
    { id: 2, name: 'Project Files', resourceIds: [2] },
  ]);

  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);

  const handleEdit = (id: number) => {
    // Implement edit functionality
    toast.info(`Editing resource: ${id}`);
  };

  const handleDelete = (id: number) => {
    setMyResources(resources => resources.filter(r => r.id !== id));
    setCollections(collections => 
      collections.map(collection => ({
        ...collection,
        resourceIds: collection.resourceIds.filter(resourceId => resourceId !== id)
      }))
    );
    toast.success("Resource deleted successfully");
  };

  const handleArchive = (id: number) => {
    // Implement archive functionality
    toast.info(`Archiving resource: ${id}`);
  };

  const handleShare = (id: number) => {
    // Implement share functionality
    toast.info(`Sharing resource: ${id}`);
  };

  const handleDownload = (id: number) => {
    const resource = myResources.find(r => r.id === id);
    if (resource && resource.fileUrl) {
      // Implement actual download logic here
      toast.success(`Downloading ${resource.title}`);
    } else {
      toast.error("No files found for download.");
    }
  };

  const handleCreateCollection = () => {
    const newCollectionId = collections.length + 1;
    const newCollection: Collection = {
      id: newCollectionId,
      name: `New Collection ${newCollectionId}`,
      resourceIds: []
    };
    setCollections([...collections, newCollection]);
    toast.success("New collection created");
  };

  const handleOpenCollection = (collectionId: number) => {
    const collection = collections.find(c => c.id === collectionId);
    if (collection) {
      setActiveCollection(collection);
      toast.info(`Opened collection: ${collection.name}`);
    }
  };

  const handleCloseCollection = () => {
    setActiveCollection(null);
  };

  const handleAddToCollection = (resourceId: number, collectionId: number) => {
    setCollections(collections => 
      collections.map(collection => 
        collection.id === collectionId && !collection.resourceIds.includes(resourceId)
          ? { ...collection, resourceIds: [...collection.resourceIds, resourceId] }
          : collection
      )
    );
    toast.success("Resource added to collection");
  };

  const handleRemoveFromCollection = (resourceId: number, collectionId: number) => {
    setCollections(collections => 
      collections.map(collection => 
        collection.id === collectionId
          ? { ...collection, resourceIds: collection.resourceIds.filter(id => id !== resourceId) }
          : collection
      )
    );
    toast.success("Resource removed from collection");
  };

  const handleRenameCollection = (collectionId: number, newName: string) => {
    setCollections(collections => 
      collections.map(collection => 
        collection.id === collectionId
          ? { ...collection, name: newName }
          : collection
      )
    );
    toast.success("Collection renamed");
  };

  const handleDeleteCollection = (collectionId: number) => {
    setCollections(collections => collections.filter(c => c.id !== collectionId));
    if (activeCollection?.id === collectionId) {
      setActiveCollection(null);
    }
    toast.success("Collection deleted");
  };

  const displayedResources = activeCollection
    ? myResources.filter(resource => activeCollection.resourceIds.includes(resource.id))
    : myResources;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Resources</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Collections</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {collections.map(collection => (
            <button 
              key={collection.id} 
              className={`flex items-center px-3 py-2 rounded ${activeCollection?.id === collection.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => handleOpenCollection(collection.id)}
            >
              <FaFolder className="mr-2" />
              {collection.name}
            </button>
          ))}
          <button onClick={handleCreateCollection} className="flex items-center bg-green-500 text-white px-3 py-2 rounded">
            <FaPlus className="mr-2" />
            New Collection
          </button>
        </div>
        {activeCollection && (
          <div className="bg-gray-100 p-4 rounded mb-4">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">{activeCollection.name}</h4>
              <button onClick={handleCloseCollection} className="text-gray-500 hover:text-gray-700">
                <FaTimes />
              </button>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  const newName = prompt("Enter new name for collection:", activeCollection.name);
                  if (newName) handleRenameCollection(activeCollection.id, newName);
                }}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
              >
                Rename
              </button>
              <button 
                onClick={() => handleDeleteCollection(activeCollection.id)}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Delete Collection
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedResources.map(resource => (
          <ResourceCard 
            key={resource.id} 
            resource={resource}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onArchive={handleArchive}
            onShare={handleShare}
            onDownload={handleDownload}
            onAddToCollection={handleAddToCollection}
            onRemoveFromCollection={handleRemoveFromCollection}
            collections={collections}
          />
        ))}
      </div>
    </div>
  );
}