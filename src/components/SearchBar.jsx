function SearchBar({ value, onChange }) {
  return <label className="search-bar"><span>Find a dish</span><input aria-label="Search menu" onChange={(event) => onChange(event.target.value)} placeholder="Type to search" type="search" value={value} /></label>;
}

export default SearchBar;
