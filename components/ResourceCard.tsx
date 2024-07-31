interface ResourceCardProps {
    resource: {
      id: number
      title: string
      type: string
    }
  }
  
  export default function ResourceCard({ resource }: ResourceCardProps) {
    return (
      <div className="border rounded p-4 shadow-sm">
        <h3 className="font-bold mb-2">{resource.title}</h3>
        <p className="text-sm text-gray-600">Type: {resource.type}</p>
        <button className="mt-4 bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">
          Download
        </button>
      </div>
    )
  }