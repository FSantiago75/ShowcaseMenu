export interface Product {
  id: number;
  secao: string;
  titulo: string;
  descricao?: string;
  preco: number;
  imagem: string;
  disponivel?: boolean;
}
