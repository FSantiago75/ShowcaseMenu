import { useMemo, useState } from "react";
import CategoryNavigation from "./components/CategoryNavigation";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import SearchBar from "./components/SearchBar";
import StorySection from "./components/StorySection";
import { menuItems } from "./data/menuItems";
import { normalizeText } from "./utils/normalizeText";

const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm);

    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === "All" || item.category === activeCategory;
      const searchableContent = normalizeText(`${item.name} ${item.description} ${item.category}`);
      return matchesCategory && searchableContent.includes(normalizedSearch);
    });
  }, [activeCategory, searchTerm]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <StorySection />
        <section className="menu" id="menu">
          <div className="menu__heading page-shell reveal">
            <p className="eyebrow">Seasonal selection · 01</p>
            <h2>Food worth<br /><em>slowing down for.</em></h2>
            <p className="menu__intro">Small plates, open-fire cooking and generous mains. Our menu changes with the season, while the reason behind it stays the same: honest ingredients, handled well.</p>
          </div>
          <div className="menu__controls page-shell">
            <CategoryNavigation categories={categories} activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>
          <MenuSection items={filteredItems} />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default App;
