import React, { useState } from 'react';

function Pagination({ totalPages, handleClick }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
    handleClick(currentPage + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPage(currentPage - 1);
    handleClick(currentPage - 1);
  };

  const handlePageClick = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
    handleClick(pageNumber);
  };

  const getPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`${currentPage === i ? 'active' : ''}`}>
          <div className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="#" onClick={(event) => handlePageClick(event, i)}>
            {i}
          </div>
        </li>
      );
    }

    return pageNumbers;
  };

  return (
    <nav>
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li className={`${currentPage === 1 ? 'disabled' : ''}`}>
          <div className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="#" onClick={handlePreviousClick}>
            <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
            </svg>
          </div>
        </li>
        {getPageNumbers()}
        <li className={`${currentPage === totalPages ? 'disabled' : ''}`}>
          <div className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" href="#" onClick={handleNextClick}>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
            </svg>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
