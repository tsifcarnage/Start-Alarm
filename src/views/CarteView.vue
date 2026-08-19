<template>
  <div class="w-full mx-auto p-4 md:p-5">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- COLONNE GAUCHE : Carte SVG -->
      <div class="lg:col-span-7 relative flex flex-col items-center">
        <h1
          class="mb-4 text-center text-2xl md:text-3xl font-bold text-(--dark-blue)"
        >
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
          <MapPin :size="16" class="text-(--light-blue)" /><span
            >Survolez un département pour voir son nom</span
          >
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
            class="absolute bottom-2 left-2 w-28 sm:w-40 md:w-44 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm p-1.5 sm:p-2 rounded-lg border-2 border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden z-10"
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

          <p
            class="text-xs font-semibold text-slate-400 uppercase tracking-wider"
          >
            Code département : {{ selectedDepartment.id }}
          </p>

          <hr class="border-slate-200 dark:border-slate-800" />

          <div
            v-if="currentDepartmentInfo.statut === 'pris'"
            class="flex justify-between"
          >
            <h2 class="text-xl text-center font-bold self-center">
              Votre expert <br />Acti-Protec
            </h2>
            <img src="/src/assets/img/ActiProtecLogo.png" alt="" class="w-50" />
          </div>

          <!-- Affichage du Statut -->
          <div class="flex items-center gap-2">
            <span class="text-sm font-bold text-slate-700 dark:text-slate-200"
              >Statut :</span
            >
            <span
              class="px-2.5 py-1 text-xs font-bold rounded-full"
              :class="
                currentDepartmentInfo.statut === 'pris'
                  ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
                  : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
              "
            >
              {{
                currentDepartmentInfo.statut === "pris"
                  ? "Département réservé"
                  : "Département libre"
              }}
            </span>
          </div>

          <!-- Affichage des Informations spécifiques -->
          <div class="space-y-2 text-sm text-slate-700 dark:text-slate-200">
            <p class="font-bold text-(--dark-blue) dark:text-slate-100">
              Informations :
            </p>
            <ul
              class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300"
            >
              <li
                v-for="(info, index) in currentDepartmentInfo.details"
                :key="index"
              >
                {{ info }}
              </li>
            </ul>
          </div>

          <!-- Faire une reservation -->
          <div v-if="currentDepartmentInfo.statut === 'libre'">
            <button
              @click="faireReservation"
              class="cursor-pointer px-6 py-3 bg-(--orange) hover:bg-[#d64d00] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              Réservez votre département
            </button>
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

// ID Petite Couronne pour le zoom
const idfIds = ["75", "92", "93", "94"];
const idfDepartments = computed(() => {
  return france.locations.filter((dept) => idfIds.includes(dept.id));
});

// BASE DE DONNÉES DES DÉPARTEMENTS
// Tu peux ajouter d'autres champs/informations spécifiques par département ici
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

// Récupère les infos du département sélectionné (par défaut "libre")
const currentDepartmentInfo = computed(() => {
  if (!selectedDepartment.value) return null;

  const id = selectedDepartment.value.id;
  const customData = departmentsData.value[id];

  if (customData) {
    return customData;
  }

  // Configuration par défaut pour TOUS les autres départements libres
  return {
    statut: "libre",
    details: [
      "Département disponible en attente d'un expert",
      "Opportunités de développement ouvertes",
    ],
  };
});

// Gestion dynamique de la couleur sur la carte
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

//reservation email
const faireReservation = () => {
  const email = "contact@start-alarm.fr";
  const copie = "eric.peytavin@start-alarm.fr";

  const sujet = "Demande de réservation";

  const message = `Bonjour,

Je souhaite effectuer une réservation "option", pour plus d'informations.

━━━━━━━━━━━━━━━━━━━━
COORDONNÉES SOCIÉTÉ
━━━━━━━━━━━━━━━━━━━━

Société :
Adresse :
Code postal :
Ville :
Téléphone :
Adresse email :
Adresse site internet :

━━━━━━━━━━━━━━━━━━━━
COORDONNÉES CONTACT
━━━━━━━━━━━━━━━━━━━━

Nom :
Prénom :
Fonction :
Adresse email :
Téléphone :

Nombre de personnes :

Bien à vous.`;

  const url =
    `https://mail.google.com/mail/?view=cm` +
    `&to=${encodeURIComponent(email)}` +
    `&cc=${encodeURIComponent(copie)}` +
    `&su=${encodeURIComponent(sujet)}` +
    `&body=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
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
