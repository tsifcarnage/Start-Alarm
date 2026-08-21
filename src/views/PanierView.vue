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
          Mon Panier
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Gérez les articles que vous souhaitez commander.
        </p>
      </div>

      <span
        v-if="cart.length > 0"
        class="absolute right-0 text-xs font-bold text-(--orange) bg-(--orange)/10 px-3 py-1.5 rounded-full"
      >
        {{ cart.length }} article(s)
      </span>
    </div>

    <!-- ÉTAT VIDE : Si aucun produit dans le panier -->
    <div
      v-if="cart.length === 0"
      class="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 space-y-4"
    >
      <div
        class="p-4 bg-orange-50 dark:bg-orange-950/30 text-(--orange) rounded-full"
      >
        <ShoppingBag :size="48" />
      </div>
      <div class="space-y-1">
        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-200">
          Votre panier est vide
        </h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
          Vous n'avez pas encore ajouté de produit. Explorez nos produits pour commencer vos achats.
        </p>
      </div>
      <RouterLink
        to="/produits"
        class="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-(--orange) hover:bg-[#d64d00] text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer"
      >
        <span>Découvrir le catalogue</span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { ShoppingBag } from "lucide-vue-next";

// Tableau local temporaire
const cart = ref([]);
</script>