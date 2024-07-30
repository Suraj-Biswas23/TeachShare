import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (currentPage + delta >= totalPages - 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <nav className="flex justify-center items-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>
      {getPageNumbers().map((number, index) => (
        <React.Fragment key={index}>
          {number === '...' ? (
            <span className="px-3 py-2">...</span>
          ) : (
            <button
              onClick={() => onPageChange(number as number)}
              className={`px-3 py-2 rounded-md ${
                currentPage === number
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {number}
            </button>
          )}
        </React.Fragment>
      ))}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    </nav>
  );
}