import ResourceCard from '@/components/ResourceCard'

export default function MyResourcesPage() {
  // Mock data for demonstration
  const myResources = [
    { id: 1, title: 'My Study Notes', type: 'PDF' },
    { id: 2, title: 'Project Presentation', type: 'PPTX' },
    // Add more mock resources as needed
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {myResources.map(resource => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  )
}