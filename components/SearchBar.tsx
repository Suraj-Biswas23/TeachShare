// // components/SearchBar.tsx
// import { useState } from "react";
// import { Input } from "@/components/ui/input";

// interface SearchBarProps {
//   onSearch: (query: string) => void;
//   onSave?: (query: string) => void;
// }

// export default function SearchBar({ onSearch, onSave }: SearchBarProps) {
//   const [query, setQuery] = useState("");

//   const handleSearch = () => {
//     onSearch(query);
//   };

//   const handleSave = () => {
//     if (onSave) {
//       onSave(query);
//     }
//   };

//   return (
//     <div className="flex items-center space-x-4">
//       <Input
//         type="text"
//         placeholder="Search for materials..."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         className="flex-1"
//       />
//       <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//         Search
//       </button>
//       {onSave && (
//         <button onClick={handleSave} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
//           Save Search
//         </button>
//       )}
//     </div>
//   );
// }


// components/SearchBar.tsx
import { useState, KeyboardEvent } from "react";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onSave?: (query: string) => void;
}

export default function SearchBar({ onSearch, onSave }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  const handleSave = () => {
    if (onSave && query.trim()) {
      onSave(query);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Input
        type="text"
        placeholder="Search for materials..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-1"
        aria-label="Search query"
      />
      <button 
        onClick={handleSearch} 
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        aria-label="Search"
      >
        Search
      </button>
      {onSave && (
        <button 
          onClick={handleSave} 
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          aria-label="Save search"
        >
          Save Search
        </button>
      )}
    </div>
  );
}