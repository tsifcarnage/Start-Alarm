<template>
  <div class="w-full max-w-7xl mx-auto p-4 md:p-6">
    <!-- GRILLE DEUX COLONNES : Gauche = Menu | Droite = Résultat -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <!-- COLONNE GAUCHE (5/12) : Liste interactive des avantages -->
      <div class="lg:col-span-5 flex flex-col w-full space-y-4">
        <h3 class="text-xl md:text-2xl font-bold text-(--dark-blue)">
          Concevez votre alarme en ligne, nous vous guidons à chaque étape !
        </h3>

        <p
          class="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 italic"
        >
          <Lightbulb :size="16" class="text-yellow-400 shrink-0" />
          <span>Cliquez sur un avantage pour afficher son détail</span>
        </p>

        <img
          class="w-full max-w-sm object-contain self-center my-2"
          src="/src/assets/img/avantageImg1.png"
          alt="Avantages START-ALARM"
        />

        <!-- Liste des boutons d'Avantages -->
        <div
          class="flex flex-col gap-2 p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800"
        >
          <button
            v-for="(text, index) in advantages"
            :key="text"
            @click="selectAdvantage(text)"
            class="group relative flex items-center justify-between p-3.5 rounded-lg border-2 transition-all duration-300 text-left cursor-pointer overflow-hidden"
            :class="[
              selectedAdvantage === text
                ? 'border-(--orange) bg-orange-100 dark:bg-orange-950/40 shadow-md scale-[1.01]'
                : activeIndex === index && !selectedAdvantage
                  ? 'border-(--orange)/60 bg-orange-50/50 dark:bg-orange-950/20'
                  : 'border-transparent bg-white dark:bg-slate-800/80 hover:border-(--light-blue) hover:shadow-sm',
            ]"
          >
            <div class="flex items-center gap-3">
              <!-- Flèche animée -->
              <span
                class="transition-opacity duration-300"
                :class="[
                  (activeIndex === index && !selectedAdvantage) ||
                  selectedAdvantage === text
                    ? 'opacity-100 text-(--orange) animate-bounce-horizontal'
                    : 'opacity-30 group-hover:opacity-100 text-slate-400 group-hover:animate-bounce-horizontal',
                ]"
              >
                <ChevronRight :size="22" />
              </span>

              <span
                class="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-(--orange) transition-colors"
              >
                {{ text }}
              </span>
            </div>

            <span
              class="text-xs font-bold text-(--orange) px-2 py-1 rounded transition-opacity"
              :class="[
                selectedAdvantage === text
                  ? 'opacity-100 bg-orange-200/60 dark:bg-orange-900/60'
                  : 'opacity-0 group-hover:opacity-100 bg-orange-100 dark:bg-orange-900/40',
              ]"
            >
              {{ selectedAdvantage === text ? "Sélectionné" : "Voir" }}
            </span>
          </button>
        </div>
      </div>

      <!-- COLONNE DROITE (7/12) : Contenu de détail dynamique -->
      <div class="lg:col-span-7 w-full sticky top-6">
        <AdvantageDetail
          v-if="selectedAdvantage"
          :title="selectedAdvantage"
          @close="selectedAdvantage = null"
        />

        <!-- Bloc d'incitation si aucun avantage sélectionné -->
        <div
          v-else
          class="p-12 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl flex flex-col items-center justify-center text-center text-slate-400 space-y-3"
        >
          <Lightbulb :size="48" class="text-slate-300 dark:text-slate-600" />
          <p class="text-base font-medium">
            Sélectionnez un avantage sur la gauche pour consulter les détails.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { ChevronRight, Lightbulb, MoveLeft } from "lucide-vue-next";
import AdvantageDetail from "../components/AdvantageDetail.vue";

const advantages = [
  "Configuration gratuite",
  "Testez avant d'acheter",
  "100% personnalisé",
  "Sans abonnement",
  "Livré, prêt à fonctionner",
  "Des experts près de chez vous",
];

// Définit le premier avantage sélectionné par défaut
const selectedAdvantage = ref(null);
const activeIndex = ref(0);
let timer = null;

// Animation du focus automatique si l'utilisateur ne clique pas
onMounted(() => {
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % advantages.length;
  }, 1500);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const selectAdvantage = (title) => {
  selectedAdvantage.value = title;
};
</script>

<style scoped>
@keyframes bounce-horizontal {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(5px);
  }
}

.animate-bounce-horizontal {
  animation: bounce-horizontal 0.8s infinite;
}
</style>
