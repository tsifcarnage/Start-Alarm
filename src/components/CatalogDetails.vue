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
        @click="openModal(item)"
        class="group bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative cursor-pointer"
      >
        <!-- Bouton Favoris synchronisé avec la page Favoris -->
        <button
          @click.stop="toggleFavorite(item)"
          class="absolute top-6 right-6 z-10 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-400 hover:text-rose-500 shadow-md transition-all cursor-pointer hover:scale-110"
          title="Mettre en favoris"
        >
          <Heart
            :size="18"
            :class="{ 'fill-rose-500 text-rose-500': isFavorite(item.id) }"
          />
        </button>

        <!-- Image du produit -->
        <div class="w-full h-48 bg-slate-200/60 dark:bg-slate-800 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
          <img
            v-if="item.img"
            :src="`/src/assets/img/produits${item.img}`"
            :alt="item.title"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <ShieldAlert v-else :size="56" class="text-slate-400/50" />
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
            @click.stop="openModal(item)"
            class="p-2.5 bg-(--orange) hover:bg-[#d64d00] text-white rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <ShoppingBag :size="18" />
          </button>
        </div>
      </div>
    </div>

    <!-- Composant Modal Popup -->
    <ProductModal
      :product="selectedProduct"
      @close="selectedProduct = null"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Heart, ShoppingBag, ShieldAlert } from "lucide-vue-next";
import ProductModal from "./ProductModal.vue";
import { useFavorites } from "../composables/useFavorites";

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

// Récupération des méthodes du store réactif de favoris
const { toggleFavorite, isFavorite } = useFavorites();

// État de la modal
const selectedProduct = ref(null);

const openModal = (product) => {
  selectedProduct.value = product;
};

// Liste des produits
const products = [
  {
    id: 1,
    title: "Centrale d'Alarme Smart-Hub 4G",
    category: "Éléments de base système Alarme",
    subcategory: "La Centrale",
    description:
      "Unité centrale multi-réseaux avec batterie de secours et transmission 4G sécurisée.",
    price: "299.00",
    img: "/centrale.png"
  },
  {
    id: 2,
    title: "Sirène Intérieure 110 dB",
    category: "Éléments de base système Alarme",
    subcategory: "Les Sirènes",
    description:
      "Puissante sirène d'alerte avec flash lumineux dissuasif à fort impact sonore.",
    price: "89.90",
    img: ""
  },
  {
    id: 3,
    title: "Clavier de Commande Tactile",
    category: "Éléments de base système Alarme",
    subcategory: "Les Éléments de commande",
    description:
      "Lecteur de badge RFID et code PIN pour armement/désarmement simplifié.",
    price: "69.00",
    img: ""
  },
  {
    id: 4,
    title: "Détecteur de Mouvement PIR",
    category: "Détection intérieure",
    subcategory: "Volumétrique",
    description:
      "Infrarouge haute précision compatible animaux de compagnie jusqu'à 25 kg.",
    price: "45.00",
    img: ""
  },
  {
    id: 5,
    title: "Détecteur d'Ouverture Magnétique",
    category: "Détection intérieure",
    subcategory: "Périmétrique",
    description:
      "Protection discrète pour portes et fenêtres avec alerte immédiate avant intrusion.",
    price: "32.00",
    img: ""
  },
  {
    id: 6,
    title: "Barrière Infrarouge Extérieure",
    category: "Détection extérieure",
    subcategory: "Les Radars",
    description:
      "Double faisceau étanche longue portée spécial jardins et terrasses.",
    price: "159.00",
    img: ""
  },
  {
    id: 7,
    title: "Caméra Extérieure Pro 4K",
    category: "Détection extérieure",
    subcategory: "Les Caméras",
    description:
      "Vision nocturne couleur, projecteur LED et détection d'humains intelligente.",
    price: "189.90",
    img: ""
  },
  {
    id: 8,
    title: "Détecteur de Fumée Connecté",
    category: "Détection technique",
    subcategory: "Incendie",
    description:
      "Alarme optique de fumée autonome conforme à la norme NF EN 14604.",
    price: "55.00",
    img: ""
  },
  {
    id: 9,
    title: "Sonde Anti-Inondation",
    category: "Détection technique",
    subcategory: "Innondation",
    description:
      "Détecte instantanément la présence de liquide en cas de fuite ou surverse.",
    price: "42.00",
    img: ""
  },
  {
    id: 10,
    title: "Bouton Anti-Agression SOS",
    category: "Protection à la personne",
    subcategory: "SOS",
    description:
      "Télécommande de détresse portable pour déclencher l'alerte silencieuse d'urgence.",
    price: "29.90",
    img: ""
  },
  {
    id: 11,
    title: "Détecteur de Choc & Séismique",
    category: "Protection des biens de valeur",
    subcategory: "La centrale",
    description:
      "Capteur de vibrations spécifique pour coffre-fort et vitrines de valeur.",
    price: "79.00",
    img: ""
  },
  {
    id: 12,
    title: "Prise Connectée Intelligente",
    category: "Domotique",
    subcategory: "",
    description:
      "Permet de simuler une présence et de contrôler vos appareils à distance.",
    price: "24.90",
    img: ""
  },
];

// Filtrage dynamique selon la sélection
const filteredProducts = computed(() => {
  return products.filter((product) => {
    if (props.selectedSubcategory) {
      return (
        product.category === props.selectedCategory &&
        product.subcategory === props.selectedSubcategory
      );
    }
    if (props.selectedCategory) {
      return product.category === props.selectedCategory;
    }
    return true;
  });
});
</script>