import { useCallback, useEffect, useState } from "react";
import { getCatalogProducts } from "../../services/catalog-api";
import type { Product } from "../../types/catalog";

export function useCatalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);

  const reload = useCallback(() => {
    setRequestVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setError(null);

    getCatalogProducts(controller.signal)
      .then(setProducts)
      .catch((requestError: unknown) => {
        if (requestError instanceof DOMException && requestError.name === "AbortError") return;
        setError(
          requestError instanceof Error ? requestError.message : "Erro ao carregar o catálogo.",
        );
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [requestVersion]);

  return { products, isLoading, error, reload };
}
