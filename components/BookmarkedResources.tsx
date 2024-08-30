import ResourceCard from './ResourceCard';

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
  description?: string;
}

interface BookmarkedResourcesProps {
  resources: Resource[];
  onDownload: (fileUrl: string) => void;
  onShare: (fileUrl: string) => void;
  onBookmark: (resourceId: string) => void;
}

export default function BookmarkedResources({
  resources,
  onDownload,
  onShare,
  onBookmark
}: BookmarkedResourcesProps) {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-bold mb-4">My Bookmarks</h3>
      {resources.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map(resource => (
            <ResourceCard
              key={resource._id}
              resource={resource}
              onDownload={onDownload}
              onShare={onShare}
              onBookmark={onBookmark}
            />
          ))}
        </div>
      ) : (
        <p>No bookmarked resources yet.</p>
      )}
    </div>
  );
}