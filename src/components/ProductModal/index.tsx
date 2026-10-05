import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import type { Product } from "../../types/catalog";
import "./ProductModal.css";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

function ProductModal({ product, onClose }: ProductModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isAvailable = product.disponivel !== false;
  const formattedPrice = product.preco.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return createPortal(
    <div className="product-modal-backdrop" onMouseDown={onClose}>
      <section
        aria-labelledby="product-modal-title"
        aria-modal="true"
        className={`product-modal${isAvailable ? "" : " is-unavailable"}`}
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <button
          aria-label="Fechar detalhes do produto"
          className="product-modal-close"
          onClick={onClose}
          ref={closeButtonRef}
          type="button"
        >
          <X aria-hidden="true" size={22} />
        </button>

        <div className="product-modal-image">
          <img alt={product.titulo} src={product.imagem} />
          {!isAvailable && <span>Esgotado</span>}
        </div>

        <div className="product-modal-content">
          <p className="product-modal-section">{product.secao}</p>
          <h2 id="product-modal-title">{product.titulo}</h2>
          <p className="product-modal-description">
            {product.descricao || "Sem descrição disponível."}
          </p>

          <div className="product-modal-summary">
            <strong>{formattedPrice}</strong>
            <span className={`product-modal-status${isAvailable ? "" : " is-unavailable"}`}>
              <i aria-hidden="true" />
              {isAvailable ? "Disponível hoje" : "Esgotado hoje"}
            </span>
          </div>

          <footer className="product-modal-footer">
            <button className="product-modal-dismiss" onClick={onClose} type="button">
              Fechar detalhes
            </button>
          </footer>
        </div>
      </section>
    </div>,
    document.body,
  );
}

export default ProductModal;
