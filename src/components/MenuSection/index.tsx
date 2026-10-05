import { useRef } from "react";
import MenuItem from "../MenuItem";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import type { Product } from "../../types/catalog";
import "./MenuSection.css";

interface MenuSectionProps {
  items: Product[];
}

function MenuSection({ items }: MenuSectionProps) {
  const listRef = useRef<HTMLDivElement>(null);
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
    <div className="menu-grid" aria-live="polite" ref={listRef}>
      {items.map((item) => (
        <MenuItem item={item} key={`${item.secao}-${item.titulo}`} />
      ))}
    </div>
  );
}

export default MenuSection;
