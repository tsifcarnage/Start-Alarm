<template>
  <!-- Contenu texte et CTA à gauche -->
  <div class="flex-1 space-y-6 w-full">
    <div
      class="flex mb-4 w-full overflow-hidden bg-(--colorFocus) min-[1408px]:flex-col"
    >
      <p
        class="inline-block whitespace-nowrap py-2 text-base sm:text-xl md:text-3xl font-bold font-['Mona_Sans'] text-white animate-marquee"
      >
        Le 1er configurateur & simulateur d'ALARME
      </p>
    </div>

    <h1
      class="flex flex-col justify-start items-start text-6xl md:text-5xl font-extrabold text-(--orange) leading-tight"
    >
      <span>Concevez,</span>
      <span class="self-center"> Installez...</span>
    </h1>

    <p class="flex flex-col text-2xl md:text-3xl font-bold text-(--dark-blue)">
      <span>...Votre système d'alarme vous-même</span>
      <span class="self-center"> en quelques clics.</span>
    </p>

    <p class="text-(--color) text-sm md:text-base leading-relaxed">
      Dessinez votre plan, testez votre couverture en direct et recevez votre
      matériel prêt à poser.<br />
      Programmé par nos experts, installé facilement par vous-même !
    </p>

    <section class="flex items-center justify-between flex-wrap">
      <div class="flex flex-col gap-2">
        <div class="pt-2">
          <button
            class="flex cursor-pointer items-center justify-center gap-2 px-6 py-3.5 bg-(--orange) hover:bg-[#d64d00] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <span><Pencil :size="20" /></span>
            <span>Créer mon plan de protection </span>
            <MoveRight :size="20" class="pt-1" />
          </button>
        </div>

        <div class="pt-2">
          <a
            href="tel:0000000000"
            class="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-(--text-secondary) hover:text-(--light-blue) transition-colors"
          >
            <span class="text-red-500"><Phone :size="15" /></span> Besoin d'aide
            ? Parler à un conseiller
          </a>
        </div>
      </div>

      <!-- Badge 100% adapté -->
      <div
        class="bg-(--circleColor) dark:bg-(--colorFocus) text-(--dark-blue) dark:text-(--text-primary) py-6 px-8 rounded-full text-center -rotate-10 font-bold font-['Mona_Sans']"
      >
        <span class="text-lg leading-tight"
          ><span class="text-3xl font-black">100%</span><br />adapté<br />
          à votre <br />habitation</span
        >
      </div>
    </section>
  </div>

  <!-- Visuel à droite -->
  <div v-if="!openSolution" class="flex flex-col w-full md:w-1/2 justify-end">
    <img
      src="/src/assets/img/houseAlarm.png"
      alt="Carte de couverture"
      class="w-full max-w-lg object-contain self-center"
    />
    <button
      @click="openSolution = !openSolution"
      class="cursor-pointer flex gap-1 self-center border-2 border-(--dark-blue) text-(--dark-blue) dark:text-(--text-primary) font-semibold py-4 px-6 rounded-md animate-button-pulse hover:bg-(--dark-blue) hover:text-(--bg-primary)"
    >
      <span>Avantages de notre solution</span>
      <ScanEye class="mt-0.5" />
    </button>
  </div>

  <!-- Section Avantages interactive -->
  <div v-else class="flex flex-col w-full md:w-1/2">
    <h3 class="text-2xl font-bold text-(--dark-blue) pb-2 text-center">
      Concevez vous-même votre système d'alarme en ligne, nous vous guidons à
      chaque étape !
    </h3>

    <p class="text-xs text-center text-slate-500 dark:text-slate-400 mb-3 italic">
      💡 Cliquez sur un avantage pour en savoir plus
    </p>

    <img
      class="w-full max-w-xs object-contain self-center mb-2"
      src="/src/assets/img/avantageImg1.png"
      alt="Avantages"
    />

    <!-- Liste d'Avantages Interactifs -->
    <div class="flex flex-col gap-2 p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-200 dark:border-slate-800">
      <button
        v-for="(text, index) in advantages"
        :key="text"
        @click="openModal(text)"
        class="group relative flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-300 text-left cursor-pointer overflow-hidden"
        :class="[
          activeIndex === index
            ? 'border-(--orange) bg-orange-50 dark:bg-orange-950/20 shadow-md scale-[1.02]'
            : 'border-transparent bg-white dark:bg-slate-800/80 hover:border-(--light-blue) hover:shadow-sm hover:translate-x-1'
        ]"
      >
        <div class="flex items-center gap-3">
          <!-- Flèche guidante animée -->
          <span 
            class="transition-opacity duration-300"
            :class="activeIndex === index ? 'opacity-100 text-(--orange) animate-bounce-horizontal' : 'opacity-30 group-hover:opacity-100 text-slate-400'"
          >
            <ChevronRight :size="22" />
          </span>

          <span class="font-semibold text-slate-800 dark:text-slate-100 group-hover:text-(--orange) transition-colors">
            {{ text }}
          </span>
        </div>

        <!-- Tag discret "Voir +" -->
        <span class="text-xs font-bold text-(--orange) opacity-0 group-hover:opacity-100 transition-opacity bg-orange-100 dark:bg-orange-900/40 px-2 py-1 rounded">
          En savoir +
        </span>
      </button>
    </div>

    <button
      @click="openSolution = !openSolution"
      class="cursor-pointer flex items-center gap-1 self-end mt-4 border-2 border-(--dark-blue) text-(--dark-blue) dark:text-(--text-primary) py-1.5 px-3 rounded-md hover:bg-(--dark-blue) hover:text-(--bg-primary) transition-colors text-sm font-semibold"
    >
      <MoveLeft :size="16" />
      <span>Retour</span>
    </button>
  </div>
</template>

<script setup>
import { MoveLeft, MoveRight, Pencil, Phone, ScanEye, ChevronRight } from "lucide-vue-next";
import { ref, onMounted, onUnmounted } from "vue";

const openSolution = ref(false);

const advantages = [
  "Configuration gratuite",
  "Testez avant d'acheter",
  "100% personnalisé",
  "Sans abonnement",
  "Livré prêt à fonctionner",
  "Un expert près de chez vous"
];

// Gestion de la flèche descendante animée (index de la liste)
const activeIndex = ref(0);
let timer = null;

onMounted(() => {
  // La flèche descend d'un élément toutes me 1.8 secondes
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % advantages.length;
  }, 1800);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});

// Fonction d'ouverture de la future popup
const openModal = (item) => {
  console.log("Ouvrir la popup pour :", item);
  // Vos futures instructions de modal ici
};
</script>

<style scoped>
.animate-marquee {
  animation: marquee 12s linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes button-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.animate-button-pulse {
  animation: button-pulse 1.8s ease-in-out infinite;
}

/* Animation personnalisée pour la flèche indicative */
@keyframes bounce-horizontal {
  0%, 100% {
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