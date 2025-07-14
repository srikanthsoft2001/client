import React from 'react';

interface PaginatedListProps<T> {
  items: T[];
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
}

function PaginatedList<T>({
  items,
  itemsPerPage,
  currentPage,
  setCurrentPage,
  renderItem,
}: PaginatedListProps<T>) {
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {currentItems.map((item, index) => renderItem(item, index))}
      </div>

      <div className="flex justify-center items-center mt-10 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          ◀ Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => goToPage(index + 1)}
            className={`px-4 py-2 border rounded ${
              currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-white hover:bg-gray-100'
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border rounded disabled:opacity-50 hover:bg-gray-100"
        >
          Next ▶
        </button>
      </div>
    </>
  );
}

export default PaginatedList;
