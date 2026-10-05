import { useMemo, useState } from "react";
import BackToTop from "../BackToTop";
import CatalogHeader from "../CatalogHeader";
import CategoryNavigation from "../CategoryNavigation";
import MenuSection from "../MenuSection";
import SearchBar from "../SearchBar";
import { useAnimatedCategory } from "../../hooks/useAnimatedCategory";
import { useCatalog } from "../../hooks/useCatalog";
import { normalizeText } from "../../utils/normalizeText";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, isLoading, error, reload } = useCatalog();
  const { activeCategory, selectedCategory, isChangingCategory, changeCategory } =
    useAnimatedCategory("Todos");
  const categories = useMemo(
    () => ["Todos", ...new Set(products.map((item) => item.secao))],
    [products],
  );

  const filteredItems = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    return products.filter((item) => {
      const matchesCategory = activeCategory === "Todos" || item.secao === activeCategory;
      const searchableContent = normalizeText(`${item.titulo} ${item.descricao} ${item.secao}`);
      return matchesCategory && searchableContent.includes(normalizedSearch);
    });
  }, [activeCategory, products, searchTerm]);

  return (
    <>
      <CatalogHeader />
      <main className="catalog-shell">
        <div className="catalog-meta">
          <p>
            <strong>{filteredItems.length}</strong> de {products.length} produtos
          </p>
        </div>

        <div className="catalog-tools">
          <SearchBar value={searchTerm} onChange={setSearchTerm} />
          <CategoryNavigation
            categories={categories}
            activeCategory={selectedCategory}
            onCategoryChange={changeCategory}
          />
        </div>

        <div className={`catalog-results${isChangingCategory ? " is-changing" : ""}`}>
          {isLoading && <p className="catalog-state">Carregando catálogo...</p>}
          {error && (
            <div className="catalog-state is-error" role="alert">
              <p>{error}</p>
              <button onClick={reload} type="button">
                Tentar novamente
              </button>
            </div>
          )}
          {!isLoading && !error && <MenuSection items={filteredItems} />}
        </div>
      </main>
      <BackToTop />
    </>
  );
}

export default App;
