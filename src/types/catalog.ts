export interface Product {
  secao: string;
  titulo: string;
  descricao?: string;
  preco: number;
  imagem: string;
  disponivel?: boolean;
}

export interface Catalog {
  restaurante: string;
  url: string;
  geradoEm: string;
  precoMaximo: number;
  quantidade: number;
  produtos: Product[];
}
