// components/SearchBar.tsx
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSave?: (query: string) => void;
}

export default function SearchBar({ onSearch, onSave }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(query);
    }
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
      {onSave && (
        <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save Search
        </button>
      )}
    </div>
  );
}