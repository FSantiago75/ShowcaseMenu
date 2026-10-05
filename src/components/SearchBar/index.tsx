import "./SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="search-bar">
      <span aria-hidden="true">⌕</span>
      <input
        aria-label="Pesquisar produtos"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Pesquisar no catálogo..."
        type="search"
        value={value}
      />
    </label>
  );
}

export default SearchBar;
