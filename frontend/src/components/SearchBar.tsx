import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>('');
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <form onSubmit={handleFormSubmit} className="relative flex items-center">
      <input
        type="text"
        value={query}
        placeholder="Keresés"
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
        className={`transition-all duration-300 rounded-full py-[5px] px-4 dark:bg-border-dark bg-bg-dark text-content-dark focus:outline-none focus:ring focus:ring-primary box-border pl-10 ${
          isFocused ? 'w-64' : 'w-28'
        }`}
      />
      <FiSearch className="absolute left-3 text-xl text-primary" />
    </form>
  );
};

export default SearchBar;
