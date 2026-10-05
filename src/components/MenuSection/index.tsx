import { useRef, useState } from "react";
import MenuItem from "../MenuItem";
import ProductModal from "../ProductModal";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import type { Product } from "../../types/catalog";
import "./MenuSection.css";

interface MenuSectionProps {
  items: Product[];
}

function MenuSection({ items }: MenuSectionProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  useScrollReveal(listRef, items);

  if (!items.length) {
    return (
      <div className="menu-empty" role="status">
        <p>Nenhum produto encontrado</p>
        <span>Tente outro termo ou selecione uma categoria diferente.</span>
      </div>
    );
  }

  return (
    <>
      <div className="menu-grid" aria-live="polite" ref={listRef}>
        {items.map((item) => (
          <MenuItem
            item={item}
            key={`${item.secao}-${item.titulo}`}
            onSelect={setSelectedProduct}
          />
        ))}
      </div>
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </>
  );
}

export default MenuSection;
