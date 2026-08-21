import { ref, watch } from "vue";

export interface Product {
  id: number;
  title: string;
  category: string;
  subcategory?: string;
  description: string;
  price: string;
}

// Typage direct dans la fonction ref()
const favorites = ref<Product[]>(
  JSON.parse(localStorage.getItem("app_favorites") || "[]")
);

// Sauvegarde automatique dans le LocalStorage
watch(
  favorites,
  (newFavs: Product[]) => {
    localStorage.setItem("app_favorites", JSON.stringify(newFavs));
  },
  { deep: true }
);

export function useFavorites() {
  const toggleFavorite = (product: Product): void => {
    const index = favorites.value.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      favorites.value.splice(index, 1);
    } else {
      favorites.value.push(product);
    }
  };

  const removeFavorite = (productId: number): void => {
    favorites.value = favorites.value.filter((item) => item.id !== productId);
  };

  const isFavorite = (productId: number): boolean => {
    return favorites.value.some((item) => item.id === productId);
  };

  return {
    favorites,
    toggleFavorite,
    removeFavorite,
    isFavorite,
  };
}