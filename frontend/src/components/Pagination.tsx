import { useEffect } from 'react';

interface PaginationProps {
  page: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: string) => void;
}

function Pagination({ page, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPage = Math.min(Math.max(page, 1), totalPages);

  useEffect(() => {
    if (page !== currentPage) {
      onPageChange('1');
    }
  }, [page, currentPage, onPageChange]);

  const handlePageChange = (page: number) => {
    onPageChange(page.toString());
  };

  const activeStyle = 'text-primary-content bg-primary';
  const style = 'text-content-light bg-border-light dark:bg-border-dark dark:text-content-dark focus:outline-none';

  return (
    <div className="flex flex-wrap gap-2 justify-center items-end my-10">
      {[...Array(totalPages).keys()].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`${currentPage === index + 1 ? activeStyle : style} px-3 py-1 mx-1 rounded `}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
