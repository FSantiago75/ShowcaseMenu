import { useMemo, useState } from "react";
import BackToTop from "../BackToTop";
import CatalogHeader from "../CatalogHeader";
import CategoryNavigation from "../CategoryNavigation";
import MenuSection from "../MenuSection";
import SearchBar from "../SearchBar";
import catalogData from "../../data/catalog.json";
import { useAnimatedCategory } from "../../hooks/useAnimatedCategory";
import { normalizeText } from "../../utils/normalizeText";
import type { Catalog } from "../../types/catalog";
import "./App.css";

const catalog = catalogData as Catalog;
const categories = ["Todos", ...new Set(catalog.produtos.map((item) => item.secao))];

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const { activeCategory, selectedCategory, isChangingCategory, changeCategory } =
    useAnimatedCategory("Todos");

  const filteredItems = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    return catalog.produtos.filter((item) => {
      const matchesCategory = activeCategory === "Todos" || item.secao === activeCategory;
      const searchableContent = normalizeText(`${item.titulo} ${item.descricao} ${item.secao}`);
      return matchesCategory && searchableContent.includes(normalizedSearch);
    });
  }, [activeCategory, searchTerm]);

  return (
    <>
      <CatalogHeader />
      <main className="catalog-shell">
        <div className="catalog-meta">
          <p>
            <strong>{filteredItems.length}</strong> de {catalog.produtos.length} produtos
          </p>
          <p>
            <strong>Disponibilidade atualizada</strong>
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
          <MenuSection items={filteredItems} />
        </div>
      </main>
      <BackToTop />
    </>
  );
}

export default App;
