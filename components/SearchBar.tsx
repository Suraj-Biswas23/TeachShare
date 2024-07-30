import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // Handle search logic here
    console.log(query);
  };

  return (
    <div className="flex items-center space-x-4">
      <Input
        type="text"
        placeholder="Search for materials..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1"
      />
      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Search
      </button>
    </div>
  );
}
