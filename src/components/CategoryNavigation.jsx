function CategoryNavigation({ categories, activeCategory, onCategoryChange }) {
  return (
    <nav className="category-navigation" aria-label="Menu categories">
      {categories.map((category, index) => (
        <button className={category === activeCategory ? "is-active" : ""} key={category} onClick={() => onCategoryChange(category)} type="button"><span>{String(index + 1).padStart(2, "0")}</span>{category}</button>
      ))}
    </nav>
  );
}

export default CategoryNavigation;
