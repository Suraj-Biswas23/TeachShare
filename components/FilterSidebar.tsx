import { useState } from "react";

const categories = ["All", "Notes", "Articles", "Course Plans", "Question Papers"];
const formats = ["PDF", "DOCX", "PPT"];

export default function FilterSidebar() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

  const toggleFormat = (format: string) => {
    if (selectedFormats.includes(format)) {
      setSelectedFormats(selectedFormats.filter(f => f !== format));
    } else {
      setSelectedFormats([...selectedFormats, format]);
    }
  };

  return (
    <aside className="w-1/5 bg-white p-4 shadow-md">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        <ul>
          {categories.map(category => (
            <li key={category} className="my-2">
              <button
                onClick={() => setSelectedCategory(category)}
                className={`text-gray-700 hover:text-blue-600 focus:outline-none ${
                  selectedCategory === category ? "font-bold" : ""
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Formats</h2>
        <ul>
          {formats.map(format => (
            <li key={format} className="my-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedFormats.includes(format)}
                  onChange={() => toggleFormat(format)}
                  className="mr-2"
                />
                {format}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
