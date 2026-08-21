<template>
  <Teleport to="body">
    <div
      v-if="product"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      @click.self="$emit('close')"
    >
      <div
        class="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden grid grid-cols-1 md:grid-cols-2 animate-scale-up"
      >
        <!-- Bouton Fermer -->
        <button
          @click="$emit('close')"
          class="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-(--orange) transition-colors cursor-pointer"
        >
          <X :size="20" />
        </button>

        <!-- COLONNE GAUCHE : Image -->
        <div class="bg-slate-100 dark:bg-slate-800/50 p-8 flex items-center justify-center relative min-h-65">
          <img :src="[`/src/assets/img/produits/${product.img}`]" alt="">
          <span
            v-if="product.subcategory"
            class="absolute top-4 left-4 text-xs font-semibold px-3 py-1 bg-white/80 dark:bg-slate-900/80 rounded-full text-slate-600 dark:text-slate-300 backdrop-blur-sm"
          >
            {{ product.subcategory }}
          </span>
        </div>

        <!-- COLONNE DROITE : Détails & Actions -->
        <div class="p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div class="space-y-4">
            <span class="text-xs font-bold uppercase tracking-wider text-(--orange)">
              {{ product.category }}
            </span>

            <h2 class="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {{ product.title }}
            </h2>

            <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {{ product.description }}
            </p>
          </div>

          <div class="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div class="flex items-baseline justify-between">
              <span class="text-xs text-slate-400">Prix unitaire</span>
              <span class="text-3xl font-black text-(--dark-blue) dark:text-white">
                {{ product.price }} €
              </span>
            </div>

            <!-- Redirection / Action vers la fiche produit -->
            <button
              @click="goToProductPage"
              class="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-(--orange) hover:bg-[#d64d00] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <span>Ajoutez au panier</span>
              <ShoppingBag :size="18" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { X, ShieldAlert, ShoppingBag } from "lucide-vue-next";

const props = defineProps({
  product: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["close"]);

const goToProductPage = () => {
  // Remplace par ta route vers la page dédiée si nécessaire (ex: router.push(`/produit/${props.product.id}`))
  alert(`Redirection vers la page détaillée du produit : ${props.product.title}`);
  emit("close");
};
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleUp {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}

.animate-scale-up {
  animation: scaleUp 0.25s ease-out forwards;
}
</style>