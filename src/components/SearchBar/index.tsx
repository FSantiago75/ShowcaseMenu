import { useRef } from "react";
import { Search, X } from "lucide-react";
import "./SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const clearSearch = () => {
    onChange("");
    inputRef.current?.focus();
  };

  return (
    <div className="search-bar">
      <Search aria-hidden="true" className="search-bar-icon" size={18} />
      <input
        aria-label="Pesquisar produtos"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Pesquisar no catálogo..."
        ref={inputRef}
        type="search"
        value={value}
      />
      {value && (
        <button aria-label="Limpar pesquisa" onClick={clearSearch} type="button">
          <X aria-hidden="true" size={18} />
        </button>
      )}
    </div>
  );
}

export default SearchBar;
