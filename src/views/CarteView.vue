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
          <MapPin :size="16" class="text-(--light-blue)" />
          <span>Survolez un département pour voir son nom</span>
        </div>

        <div class="relative w-full">
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
              :class="getDepartmentClass(department.id)"
            />
          </svg>

          <!-- CARTOUCHE ZOOM : Paris / Petite Couronne -->
          <div
            class=" hidden md:block absolute -bottom-10 -left-10 w-28 sm:w-40 md:w-44 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg border-2 border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden z-10"
          >
            <p
              class="text-[9px] sm:text-[10px] font-bold text-center text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1 truncate"
            >
              Zoom Paris & Petite Couronne
            </p>

            <div
              class="w-full h-20 sm:h-28 overflow-hidden relative rounded border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900"
            >
              <svg
                :viewBox="france.viewBox"
                xmlns="http://www.w3.org/2000/svg"
                class="w-full h-full scale-[14] sm:scale-[20] origin-[51%_23.5%] transition-transform duration-200"
              >
                <path
                  v-for="department in idfDepartments"
                  :key="'zoom-' + department.id"
                  :d="department.path"
                  :name="department.name"
                  @mouseenter="hoveredDepartment = department.name"
                  @mouseleave="hoveredDepartment = null"
                  @click="selectDepartment(department)"
                  class="cursor-pointer stroke-white stroke-[0.2] sm:stroke-[0.3] transition-colors duration-200"
                  :class="getDepartmentClass(department.id)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- COLONNE DROITE : Détails via le composant enfant -->
      <CarteDetails
        class="lg:col-span-5"
        :selected-department="selectedDepartment"
        :department-info="currentDepartmentInfo"
        @close="selectedDepartment = null"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import france from "@svg-maps/france.departments";
import { MapPin } from "lucide-vue-next";
import CarteDetails from "../components/CarteDetails.vue";

const hoveredDepartment = ref(null);
const selectedDepartment = ref(null);

// ID Petite Couronne pour le zoom
const idfIds = ["75", "92", "93", "94"];
const idfDepartments = computed(() => {
  return france.locations.filter((dept) => idfIds.includes(dept.id));
});

// BASE DE DONNÉES DES DÉPARTEMENTS
const departmentsData = ref({
  11: {
    statut: "pris",
    details: [
      "Aude (11) - Secteur réservé",
      "Équipe locale déjà installée",
      "Aucun emplacement disponible",
    ],
  },
  66: {
    statut: "pris",
    details: [
      "Pyrénées-Orientales (66) - Secteur réservé",
      "Partenariat exclusif en cours",
      "Indisponible à la réservation",
    ],
  },
});

// Info du département sélectionné
const currentDepartmentInfo = computed(() => {
  if (!selectedDepartment.value) return null;

  const id = selectedDepartment.value.id;
  const customData = departmentsData.value[id];

  if (customData) {
    return customData;
  }

  return {
    statut: "libre",
    details: [
      "Département disponible en attente d'un expert",
      "Opportunités de développement ouvertes",
    ],
  };
});

// Classe CSS des couleurs selon le statut
const getDepartmentClass = (deptId) => {
  const isSelected = selectedDepartment.value?.id === deptId;
  if (isSelected) return "fill-(--orange)";

  const isPris = departmentsData.value[deptId]?.statut === "pris";
  if (isPris) return "fill-rose-400 hover:fill-rose-600";

  return "fill-blue-400 hover:fill-blue-600";
};

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