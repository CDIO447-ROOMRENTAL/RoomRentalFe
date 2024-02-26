import React from 'react';
import "./Pagination.css";

function Pagination({ totalPages, currentPage, onPageChange }) {
  const maxDisplayedPages = 7; // Maximum number of pages to display
  const sidePages = Math.floor(maxDisplayedPages / 2);

  const handlePrevClick = () => {
    if (currentPage > 0) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages - 1) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      onPageChange(newPage);
    }
  };

  // Calculate the range of pages to display
  let startPage = Math.max(0, currentPage - sidePages);
  let endPage = Math.min(totalPages - 1, startPage + maxDisplayedPages - 1);

  // Adjust the range if it's too close to the beginning or end
  if (endPage - startPage < maxDisplayedPages - 1) {
    if (currentPage < sidePages) {
      endPage = Math.min(totalPages - 1, startPage + maxDisplayedPages - 1);
    } else {
      startPage = Math.max(0, endPage - maxDisplayedPages + 1);
    }
  }

  return (
    <div className='pagination-container'>
      <button onClick={handlePrevClick} disabled={currentPage === 0}>
        Prev
      </button>
      <div className='number-pages'>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <button
            key={startPage + i + 1}
            style={{ backgroundColor: currentPage === startPage + i ? '#ff4500' : 'initial' }}
            onClick={() => handlePageClick(startPage + i)}
          >
            {startPage + i + 1}
          </button>
        ))}
      </div>
      <button onClick={handleNextClick} disabled={currentPage === totalPages - 1}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
