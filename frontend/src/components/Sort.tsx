import { useState, ChangeEvent } from 'react';

interface SortProps {
  onSort: (sortOrder: string) => void;
}

function Sort({ onSort }: SortProps) {
  const [sortOrder, setSortOrder] = useState<string>('desc'); // Alapértelmezett érték: asc

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = event.target.value;
    setSortOrder(newSortOrder);
    onSort(newSortOrder);
  };

  return (
    <div className="relative inline-flex">
      <select
        value={sortOrder}
        onChange={handleSortChange}
        className="appearance-none w-full text-content-light  border border-border-dark  py-2 px-4 pr-8 rounded shadow leading-tight focus:outline-none focus:border-primary"
      >
        <option value="desc">Legújabb elöl</option>
        <option value="asc">Régebbi elöl</option>
      </select>
    </div>
  );
}

export default Sort;
