<template>
  <div class="w-full max-w-7xl mx-auto p-4 md:p-6">
    <h1 class="text-3xl md:text-4xl font-extrabold text-(--dark-blue) text-center mb-5">
      Nos produits
    </h1>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- COLONNE GAUCHE (4/12) : Filtres / Menu latéral -->
      <div class="lg:col-span-4 w-full bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        
        <div class="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100">Catégories</h2>
          <SlidersHorizontal :size="18" class="text-slate-400" />
        </div>

        <!-- Accordéon des catégories -->
        <div class="space-y-2">
          <div
            v-for="item in listProduct"
            :key="item.title"
            class="rounded-xl border border-transparent transition-all overflow-hidden"
            :class="{
              'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700': selectedCategory === item.title
            }"
          >
            <!-- En-tête de catégorie -->
            <button
              @click="toggleCategory(item)"
              class="w-full flex items-center justify-between p-3.5 text-left font-semibold text-sm transition-colors cursor-pointer group"
              :class="
                selectedCategory === item.title
                  ? 'text-(--orange) font-bold'
                  : 'text-slate-700 dark:text-slate-200 hover:text-(--orange)'
              "
            >
              <span>{{ item.title }}</span>
              <ChevronDown
                :size="18"
                class="transition-transform duration-300 text-slate-400 group-hover:text-(--orange)"
                :class="{ 'rotate-180 text-(--orange)': openCategory === item.title }"
              />
            </button>

            <!-- Sous-titres / Sous-catégories -->
            <div
              v-if="openCategory === item.title && item.subtitles.length > 0"
              class="px-4 pb-3 space-y-1.5 animate-fade-in"
            >
              <button
                v-for="sub in item.subtitles"
                :key="sub"
                @click="selectSubcategory(item.title, sub)"
                class="w-full text-left py-1.5 px-3 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-2"
                :class="
                  selectedSubcategory === sub && selectedCategory === item.title
                    ? 'bg-(--orange) text-white font-semibold'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
                "
              >
                <span class="w-1.5 h-1.5 rounded-full" :class="selectedSubcategory === sub ? 'bg-white' : 'bg-slate-400'"></span>
                {{ sub }}
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- COLONNE DROITE (8/12) : Grille de catalogue -->
      <CatalogDetails
        class="lg:col-span-8"
        :selected-category="selectedCategory"
        :selected-subcategory="selectedSubcategory"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { SlidersHorizontal, ChevronDown } from "lucide-vue-next";
import CatalogDetails from "../components/CatalogDetails.vue";

const listProduct = [
  { title: "Éléments de base système Alarme", subtitles: ["La Centrale", "Les Sirènes", "Les Éléments de commande"] },
  { title: "Détection intérieure", subtitles: ["Volumétrique", "Périmétrique"] },
  { title: "Détection extérieure", subtitles: ["Les Radars", "Les Caméras"] },
  { title: "Détection technique", subtitles: ["Incendie", "Innondation"] },
  { title: "Protection à la personne", subtitles: ["SOS"] },
  { title: "Protection des biens de valeur", subtitles: ["La centrale"] },
  { title: "Domotique", subtitles: [] },
];

// Sélection par défaut sur la 1ère catégorie
const selectedCategory = ref(listProduct[0].title);
const selectedSubcategory = ref("");
const openCategory = ref(listProduct[0].title);

const toggleCategory = (item) => {
  selectedCategory.value = item.title;
  selectedSubcategory.value = ""; // Réinitialise la sous-catégorie lors du changement de dossier principal

  if (openCategory.value === item.title) {
    openCategory.value = null;
  } else {
    openCategory.value = item.title;
  }
};

const selectSubcategory = (categoryTitle, sub) => {
  selectedCategory.value = categoryTitle;
  selectedSubcategory.value = sub;
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>