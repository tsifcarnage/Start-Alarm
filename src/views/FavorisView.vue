<template>
  <div class="w-full max-w-7xl mx-auto space-y-6">
    <!-- En-tête -->
    <div
      class="relative flex items-center justify-center border-b border-slate-200 dark:border-slate-800 pb-4"
    >
      <RouterLink 
        to="/produits" 
        class="absolute left-0 gap-2 py-2 px-3 bg-[#003a7194] hover:bg-[#00284f] text-white font-semibold rounded-md shadow-sm transition-colors"
      >
        ← Retour
      </RouterLink>

      <div class="text-center">
        <h1
          class="text-2xl my-4 md:text-3xl font-extrabold text-(--dark-blue) dark:text-white"
        >
          Mes Favoris
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Retrouvez tous les articles que vous avez mis de côté.
        </p>
      </div>

      <span
        v-if="favorites.length > 0"
        class="absolute right-0 text-xs font-bold text-(--orange) bg-(--orange)/10 px-3 py-1.5 rounded-full"
      >
        {{ favorites.length }} article(s) sauvegardé(s)
      </span>
    </div>

    <!-- ÉTAT VIDE : Si aucun favori -->
    <div
      v-if="favorites.length === 0"
      class="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 space-y-4"
    >
      <div
        class="p-4 bg-rose-50 dark:bg-rose-950/30 text-rose-500 rounded-full"
      >
        <HeartOff :size="48" />
      </div>
      <div class="space-y-1">
        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200">
          Aucun produit dans vos favoris
        </h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          Vous n'avez encore rien ajouté. Parcourez notre catalogue et cliquez
          sur le cœur pour mettre des articles de côté.
        </p>
      </div>
      <router-link
        to="/produits"
        class="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-(--orange) hover:bg-[#d64d00] text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
      >
        <span>Découvrir le catalogue</span>
      </router-link>
    </div>

    <!-- GRILLE DES FAVORIS -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in favorites"
        :key="item.id"
        class="group bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
      >
        <!-- Bouton Supprimer des favoris -->
        <button
          @click="removeFavorite(item.id)"
          class="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-rose-500 shadow-md transition-all cursor-pointer hover:scale-110"
          title="Retirer des favoris"
        >
          <Trash2 :size="18" />
        </button>

        <!-- Image -->
        <div
          class="relative w-full h-60 mb-4 rounded-xl bg-white dark:bg-slate-800 overflow-hidden flex items-center justify-center"
        >
          <img
            :src="`/src/assets/img/produits/${item.img}`"
            :alt="item.title"
            class="w-full h-full object-contain"
          />
        </div>

        <!-- Détails -->
        <div class="space-y-2">
          <span
            class="text-[10px] font-bold uppercase tracking-wider text-(--orange)"
          >
            {{ item.category }}
          </span>
          <h3 class="font-bold text-slate-800 dark:text-slate-100">
            {{ item.title }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {{ item.description }}
          </p>
        </div>

        <!-- Prix et Actions -->
        <div
          class="flex items-center justify-between pt-4 mt-4 border-t border-slate-200/60 dark:border-slate-800"
        >
          <span class="text-lg font-black text-(--dark-blue) dark:text-white">
            {{ item.price }} €
          </span>

          <button
            @click="addToCart(item)"
            class="flex items-center gap-2 px-4 py-2.5 bg-(--orange) hover:bg-[#d64d00] text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <ShoppingBag :size="16" />
            <span>Ajouter au panier</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { HeartOff, Trash2, ShoppingBag, ShieldAlert } from "lucide-vue-next";
import { useFavorites } from "../composables/useFavorites";

const { favorites, removeFavorite } = useFavorites();

const addToCart = (product) => {
  // Logique d'ajout au panier (ex: déclencher un store ou une alerte)
  alert(`Article "${product.title}" ajouté au panier !`);
};
</script>