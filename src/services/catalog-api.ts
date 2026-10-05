import type { Product } from "../types/catalog";

const CATALOG_API_URL =
  import.meta.env.VITE_CATALOG_API_URL || "https://dummyjson.com/recipes?limit=50";

interface RecipeApiItem {
  id: number;
  name: string;
  ingredients: string[];
  image: string;
  cuisine: string;
  mealType: string[];
}

interface RecipeApiResponse {
  recipes: RecipeApiItem[];
}

const sectionByMealType: Record<string, string> = {
  appetizer: "Entradas",
  breakfast: "Café da manhã",
  dessert: "Sobremesas",
  snack: "Lanches",
  side: "Acompanhamentos",
  beverage: "Bebidas",
  drink: "Bebidas",
};

function getSection(mealTypes: string[]) {
  const matchedType = mealTypes.find((type) => sectionByMealType[type.toLowerCase()]);
  return matchedType ? sectionByMealType[matchedType.toLowerCase()] : "Pratos principais";
}

function getPrice(id: number, section: string) {
  const basePrice = section === "Sobremesas" || section === "Bebidas" ? 14 : 24;
  return basePrice + ((id * 7) % 31) + 0.9;
}

function getDescription(recipe: RecipeApiItem) {
  const ingredients = recipe.ingredients.slice(0, 5).join(", ");
  return `Especialidade da culinária ${recipe.cuisine}, preparada com ${ingredients}.`;
}

function mapRecipeToProduct(recipe: RecipeApiItem): Product {
  const section = getSection(recipe.mealType);

  return {
    id: recipe.id,
    secao: section,
    titulo: recipe.name,
    descricao: getDescription(recipe),
    preco: getPrice(recipe.id, section),
    imagem: recipe.image,
    disponivel: recipe.id % 13 !== 0,
  };
}

export async function getCatalogProducts(signal?: AbortSignal) {
  const response = await fetch(CATALOG_API_URL, { signal });

  if (!response.ok) {
    throw new Error(`Não foi possível carregar o catálogo (${response.status}).`);
  }

  const data = (await response.json()) as RecipeApiResponse;

  if (!Array.isArray(data.recipes)) {
    throw new Error("A API retornou um catálogo inválido.");
  }

  return data.recipes.map(mapRecipeToProduct);
}
