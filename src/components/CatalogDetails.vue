<template>
  <div class="w-full space-y-6">
    <!-- En-tête de la catégorie sélectionnée -->
    <div
      class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4"
    >
      <div>
        <h2 class="text-xl md:text-2xl font-extrabold text-(--orange)">
          {{ selectedCategory || "Tous les produits" }}
        </h2>
        <p
          v-if="selectedSubcategory"
          class="text-sm text-slate-500 dark:text-slate-400 italic mt-1"
        >
          Sous-catégorie : {{ selectedSubcategory }}
        </p>
      </div>
      <span
        class="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-3 py-1.5 rounded-full"
      >
        {{ filteredProducts.length }} produit(s) trouvé(s)
      </span>
    </div>

    <!-- Grille des produits -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in filteredProducts"
        :key="item.id"
        class="group bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative"
      >
        <!-- Bouton Favoris / Icône
        <button
          class="absolute top-6 right-6 p-2 rounded-full bg-white dark:bg-slate-800 text-slate-400 hover:text-rose-500 shadow-sm transition-colors cursor-pointer"
        >
          <Heart :size="18" />
        </button> -->

        <!-- Image du produit (Placeholder) -->
        <div
          class="w-full h-48 bg-slate-200/60 dark:bg-slate-800 rounded-xl mb-4 flex items-center justify-center overflow-hidden group-hover:scale-[1.02] transition-transform duration-300"
        >
          <ShieldAlert :size="56" class="text-slate-400/50" />
        </div>

        <!-- Infos produit -->
        <div class="space-y-2">
          <h3
            class="font-bold text-slate-800 dark:text-slate-100 group-hover:text-(--orange) transition-colors"
          >
            {{ item.title }}
          </h3>
          <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
            {{ item.description }}
          </p>
        </div>

        <!-- Prix et action -->
        <div
          class="flex items-center justify-between pt-4 mt-2 border-t border-slate-200/60 dark:border-slate-800"
        >
          <span class="text-lg font-black text-(--dark-blue) dark:text-white">
            {{ item.price }} €
          </span>
          <button
            class="p-2.5 bg-(--orange) hover:bg-[#d64d00] text-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <ShoppingBag :size="18" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { Heart, ShoppingBag, ShieldAlert } from "lucide-vue-next";

const props = defineProps({
  selectedCategory: {
    type: String,
    default: "",
  },
  selectedSubcategory: {
    type: String,
    default: "",
  },
});

// Liste réaliste des produits avec leurs catégories respectives
const products = [
  // 1. Éléments de base système Alarme
  {
    id: 1,
    title: "Centrale d'Alarme Smart-Hub 4G",
    category: "Éléments de base système Alarme",
    subcategory: "La Centrale",
    description:
      "Unité centrale multi-réseaux avec batterie de secours et transmission 4G sécurisée.",
    price: "299.00",
  },
  {
    id: 2,
    title: "Sirène Intérieure 110 dB",
    category: "Éléments de base système Alarme",
    subcategory: "Les Sirènes",
    description:
      "Puissante sirène d'alerte avec flash lumineux dissuasif à fort impact sonore.",
    price: "89.90",
  },
  {
    id: 3,
    title: "Clavier de Commande Tactile",
    category: "Éléments de base système Alarme",
    subcategory: "Les Éléments de commande",
    description:
      "Lecteur de badge RFID et code PIN pour armement/désarmement simplifié.",
    price: "69.00",
  },

  // 2. Détection intérieure
  {
    id: 4,
    title: "Détecteur de Mouvement PIR",
    category: "Détection intérieure",
    subcategory: "Volumétrique",
    description:
      "Infrarouge haute précision compatible animaux de compagnie jusqu'à 25 kg.",
    price: "45.00",
  },
  {
    id: 5,
    title: "Détecteur d'Ouverture Magnétique",
    category: "Détection intérieure",
    subcategory: "Périmétrique",
    description:
      "Protection discrète pour portes et fenêtres avec alerte immédiate avant intrusion.",
    price: "32.00",
  },

  // 3. Détection extérieure
  {
    id: 6,
    title: "Barrière Infrarouge Extérieure",
    category: "Détection extérieure",
    subcategory: "Les Radars",
    description:
      "Double faisceau étanche longue portée spécial jardins et terrasses.",
    price: "159.00",
  },
  {
    id: 7,
    title: "Caméra Extérieure Pro 4K",
    category: "Détection extérieure",
    subcategory: "Les Caméras",
    description:
      "Vision nocturne couleur, projecteur LED et détection d'humains intelligente.",
    price: "189.90",
  },

  // 4. Détection technique
  {
    id: 8,
    title: "Détecteur de Fumée Connecté",
    category: "Détection technique",
    subcategory: "Incendie",
    description:
      "Alarme optique de fumée autonome conforme à la norme NF EN 14604.",
    price: "55.00",
  },
  {
    id: 9,
    title: "Sonde Anti-Inondation",
    category: "Détection technique",
    subcategory: "Innondation",
    description:
      "Détecte instantanément la présence de liquide en cas de fuite ou surverse.",
    price: "42.00",
  },

  // 5. Protection à la personne
  {
    id: 10,
    title: "Bouton Anti-Agression SOS",
    category: "Protection à la personne",
    subcategory: "SOS",
    description:
      "Télécommande de détresse portable pour déclencher l'alerte silencieuse d'urgence.",
    price: "29.90",
  },

  // 6. Protection des biens de valeur
  {
    id: 11,
    title: "Détecteur de Choc & Séismique",
    category: "Protection des biens de valeur",
    subcategory: "La centrale",
    description:
      "Capteur de vibrations spécifique pour coffre-fort et vitrines de valeur.",
    price: "79.00",
  },

  // 7. Domotique
  {
    id: 12,
    title: "Prise Connectée Intelligente",
    category: "Domotique",
    subcategory: "",
    description:
      "Permet de simuler une présence et de contrôler vos appareils à distance.",
    price: "24.90",
  },
];

// Filtrage dynamique selon la sélection
const filteredProducts = computed(() => {
  return products.filter((product) => {
    // Si une sous-catégorie est sélectionnée
    if (props.selectedSubcategory) {
      return (
        product.category === props.selectedCategory &&
        product.subcategory === props.selectedSubcategory
      );
    }
    // Si seule la catégorie principale est sélectionnée
    if (props.selectedCategory) {
      return product.category === props.selectedCategory;
    }
    // Sinon, retourne tous les produits
    return true;
  });
});
</script>
