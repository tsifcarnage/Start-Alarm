<template>
  <div class="w-full max-w-7xl mx-auto p-4 md:p-6">
    <!-- GRILLE 2 COLONNES : Gauche = Carte | Droite = Détails -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- COLONNE GAUCHE (7/12) : Carte SVG -->
      <div class="lg:col-span-7 relative flex flex-col items-center">
        <h1 class="mb-4 text-center text-2xl md:text-3xl font-bold text-(--dark-blue)">
          Carte des départements français
        </h1>

        <!-- TOOLTIP AU SURVOL (suit ou se place au survol) -->
        <div
          v-if="hoveredDepartment"
          class="mb-2 px-3 py-1 bg-slate-800 text-white text-xs font-semibold rounded shadow-md animate-fade-in"
        >
          {{ hoveredDepartment }}
        </div>
        <div v-else class="mb-2 h-6 text-xs text-slate-400 italic">
          Survolez un département pour voir son nom
        </div>

        <div class="w-full max-w-lg scale-100">
          <svg
            :viewBox="france.viewBox"
            xmlns="http://www.w3.org/2000/svg"
            class="mx-auto h-auto w-full"
          >
            <path
              v-for="department in france.locations"
              :key="department.id"
              :d="department.path"
              :name="department.name"
              @mouseenter="hoveredDepartment = department.name"
              @mouseleave="hoveredDepartment = null"
              @click="selectDepartment(department)"
              class="cursor-pointer stroke-white transition-colors duration-200"
              :class="[
                selectedDepartment?.id === department.id
                  ? 'fill-(--orange)'
                  : 'fill-blue-400 hover:fill-blue-600'
              ]"
            />
          </svg>
        </div>
      </div>

      <!-- COLONNE DROITE (5/12) : Panneau de Détails -->
      <div class="lg:col-span-5 w-full sticky top-6">
        
        <!-- Bloc Affiché quand un département est cliqué -->
        <div
          v-if="selectedDepartment"
          class="relative p-6 bg-slate-50 dark:bg-slate-900/60 rounded-xl border-2 border-(--orange)/30 shadow-md animate-fade-in space-y-4"
        >
          <!-- Bouton Fermer (X) -->
          <button
            @click="selectedDepartment = null"
            class="absolute top-4 right-4 text-slate-400 hover:text-(--orange) bg-white dark:bg-slate-800 p-1.5 rounded-full shadow hover:scale-110 transition-all cursor-pointer"
            title="Fermer"
          >
            <X :size="20" />
          </button>

          <h2 class="text-2xl md:text-3xl font-extrabold text-(--orange) pr-8">
            {{ selectedDepartment.name }}
          </h2>

          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Code département : {{ selectedDepartment.id }}
          </p>

          <hr class="border-slate-200 dark:border-slate-800" />

          <div class="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <p class="font-bold text-(--dark-blue) dark:text-slate-100">Informations :</p>
            <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
              <li>Lorem ipsum dolor sit amet</li>
              <li>Consectetur adipiscing elit</li>
              <li>Sed do eiusmod tempor incididunt</li>
            </ul>
          </div>
        </div>

        <!-- Bloc d'incitation avec BORDER-DASHED si aucun département cliqué -->
        <div
          v-else
          class="p-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-center text-slate-400 space-y-3"
        >
          <MapPin :size="48" class="text-slate-300 dark:text-slate-600" />
          <p class="text-base font-medium">
            Cliquez sur un département de la carte pour consulter ses détails.
          </p>
        </div>

      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import france from "@svg-maps/france.departments";
import { X, MapPin } from "lucide-vue-next";

const hoveredDepartment = ref(null);
const selectedDepartment = ref(null);

const selectDepartment = (dept) => {
  selectedDepartment.value = dept;
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.25s ease-out forwards;
}
</style>
