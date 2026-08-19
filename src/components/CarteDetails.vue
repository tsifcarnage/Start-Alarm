<template>
  <div class="w-full sticky top-6">
    <div
      v-if="selectedDepartment"
      class="relative p-6 bg-slate-50 dark:bg-slate-900/60 rounded-xl border-2 border-(--orange)/30 shadow-md animate-fade-in space-y-4"
    >
      <button
        @click="$emit('close')"
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

      <div
        v-if="departmentInfo?.statut === 'pris'"
        class="flex justify-between"
      >
        <h2 class="text-xl text-center font-bold self-center">
          Votre expert <br />Acti-Protec
        </h2>
        <img src="/src/assets/img/ActiProtecLogo.png" alt="" class="w-50" />
      </div>

      <!-- Affichage du Statut -->
      <div class="flex items-center gap-2">
        <span class="text-sm font-bold text-slate-700 dark:text-slate-200">
          Statut :
        </span>
        <span
          class="px-2.5 py-1 text-xs font-bold rounded-full"
          :class="
            departmentInfo?.statut === 'pris'
              ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300'
          "
        >
          {{
            departmentInfo?.statut === "pris"
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
        <ul class="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-300">
          <li
            v-for="(info, index) in departmentInfo?.details"
            :key="index"
          >
            {{ info }}
          </li>
        </ul>
      </div>

      <!-- Faire une reservation -->
      <div v-if="departmentInfo?.statut === 'libre'">
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
</template>

<script setup>
import { X, MapPin } from "lucide-vue-next";

defineProps({
  selectedDepartment: {
    type: Object,
    default: null,
  },
  departmentInfo: {
    type: Object,
    default: null,
  },
});

defineEmits(["close"]);

// Réservation e-mail
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