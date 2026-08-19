<template>
  <div class="w-full mx-auto p-4 md:p-5">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      
      <!-- COLONNE GAUCHE : Carte SVG -->
      <div class="lg:col-span-7 relative flex flex-col items-center">
        <h1 class="mb-4 text-center text-2xl md:text-3xl font-bold text-(--dark-blue)">
          Carte des départements français
        </h1>

        <!-- TOOLTIP AU SURVOL -->
        <div
          v-if="hoveredDepartment"
          class="mb-2 px-3 py-1 bg-slate-800 text-white text-xs font-semibold rounded shadow-md animate-fade-in"
        >
          {{ hoveredDepartment }}
        </div>
        <div v-else class="flex gap-2 mb-2 py-1 text-xs text-slate-400 italic">
          <MapPin :size="16" class="text-(--light-blue)"/><span>Survolez un département pour voir son nom</span>
        </div>

        <div class="relative w-full ">
          <!-- Carte Principale de la France -->
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
              class="cursor-pointer stroke-white transition-colors duration-200 scale-90"
              :class="[
                selectedDepartment?.id === department.id
                  ? 'fill-(--orange)'
                  : 'fill-blue-400 hover:fill-blue-600'
              ]"
            />
          </svg>

          <!-- CARTOUCHE ZOOM : Paris / Petite Couronne (Bas Droit) -->
          <div
            class="absolute bottom-20 -left-6 w-full max-w-36 sm:w-44 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-2 rounded-lg border-2 border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden z-10"
          >
            <p class="text-[10px] font-bold text-center text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
              Zoom Paris & Petite Couronne
            </p>
            
            <div class="w-full overflow-hidden relative rounded border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
              <svg
                :viewBox="france.viewBox"
                xmlns="http://www.w3.org/2000/svg"
                class="w-full h-full scale-2000 origin-[51%_23.5%] transition-transform duration-200"
              >
                <path
                  v-for="department in idfDepartments"
                  :key="'zoom-' + department.id"
                  :d="department.path"
                  :name="department.name"
                  @mouseenter="hoveredDepartment = department.name"
                  @mouseleave="hoveredDepartment = null"
                  @click="selectDepartment(department)"
                  class="cursor-pointer stroke-white stroke-[0.3] transition-colors duration-200"
                  :class="[
                    selectedDepartment?.id === department.id
                      ? 'fill-(--orange)'
                      : 'fill-blue-400 hover:fill-blue-600'
                  ]"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- COLONNE DROITE : Détails -->
      <div class="lg:col-span-5 w-full sticky top-6">
        <div
          v-if="selectedDepartment"
          class="relative p-6 bg-slate-50 dark:bg-slate-900/60 rounded-xl border-2 border-(--orange)/30 shadow-md animate-fade-in space-y-4"
        >
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
import { ref, computed } from "vue";
import france from "@svg-maps/france.departments";
import { X, MapPin } from "lucide-vue-next";

const hoveredDepartment = ref(null);
const selectedDepartment = ref(null);

// ID des 4 départements : Paris (75), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94)
const idfIds = ["75", "92", "93", "94"];
const idfDepartments = computed(() => {
  return france.locations.filter((dept) => idfIds.includes(dept.id));
});

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