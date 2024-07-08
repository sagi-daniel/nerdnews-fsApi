import { useState, ChangeEvent, FormEvent } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchBarProps {
  searchText: string;
  setSearchText: (query: string) => void;
}

function SearchBar({ searchText, setSearchText }: SearchBarProps) {
  const [queryText, setQueryText] = useState<string>(searchText);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQueryText(event.target.value);
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchText(queryText);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleClearInput = () => {
    setQueryText('');
    setSearchText('');
  };

  return (
    <form onSubmit={handleFormSubmit} className="relative flex items-center mb-3">
      <input
        type="text"
        value={queryText}
        placeholder="Keresés"
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
        className={`transition-all duration-300 rounded-full py-[5px] px-4 bg-border-dark text-content-dark focus:outline-none focus:ring focus:ring-primary box-border pl-10 w-full' `}
      />
      <FiSearch className="absolute left-3 text-xl text-primary" />
      {queryText && <FiX className="absolute right-3 text-xl text-primary cursor-pointer" onClick={handleClearInput} />}
    </form>
  );
}

export default SearchBar;
