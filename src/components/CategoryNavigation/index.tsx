import "./CategoryNavigation.css";

interface CategoryNavigationProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

function CategoryNavigation({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryNavigationProps) {
  return (
    <nav className="category-navigation" aria-label="Categorias do catálogo">
      {categories.map((category) => (
        <button
          className={category === activeCategory ? "is-active" : ""}
          key={category}
          onClick={() => onCategoryChange(category)}
          type="button"
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

export default CategoryNavigation;
