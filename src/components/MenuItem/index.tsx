import type { Product } from "../../types/catalog";
import "./MenuItem.css";

interface MenuItemProps {
  item: Product;
  onSelect: (item: Product) => void;
}

function MenuItem({ item, onSelect }: MenuItemProps) {
  const formattedPrice = item.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  const isAvailable = item.disponivel !== false;

  return (
    <article
      aria-label={`Ver detalhes de ${item.titulo}`}
      className={`product-card${isAvailable ? "" : " is-unavailable"}`}
      data-reveal
      onClick={() => onSelect(item)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(item);
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div className="product-card-image">
        <img alt={item.titulo} loading="lazy" src={item.imagem} />
      </div>
      <div className="product-card-body">
        <p className="product-card-section">{item.secao}</p>
        <h2>{item.titulo}</h2>
        <p className="product-card-description">{item.descricao || "Sem descrição disponível."}</p>
        <div className="product-card-footer">
          <strong className="product-card-price">{formattedPrice}</strong>
          <span className={`product-card-status${isAvailable ? "" : " is-unavailable"}`}>
            <i aria-hidden="true" />
            {isAvailable ? "Disponível hoje" : "Esgotado hoje"}
          </span>
        </div>
      </div>
    </article>
  );
}

export default MenuItem;
