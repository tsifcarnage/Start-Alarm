<template>
  <div
    class="relative p-6 bg-slate-50 dark:bg-slate-900/60 rounded-xl border-2 border-(--orange)/30 shadow-md animate-fade-in space-y-4"
  >
    <!-- Bouton Fermer (X) -->
    <button
      @click="emit('close')"
      class="absolute top-4 right-4 text-slate-400 hover:text-(--orange) bg-white dark:bg-slate-800 p-1.5 rounded-full shadow hover:scale-110 transition-all cursor-pointer z-10"
      title="Fermer"
    >
      <X :size="20" />
    </button>

    <!-- Titre -->
    <h2 class="text-2xl md:text-3xl font-extrabold text-(--orange) pr-8">
      {{ title }}
    </h2>

    <!-- Contenu dynamique selon le titre -->
    <p
      class="text-(--color) text-sm md:text-base leading-relaxed whitespace-pre-line"
    >
      {{ advantageDescription }}
    </p>

    <!-- CAS SPÉCIAL : Carte de France avec pointer interactif -->
    <div
      v-if="title === 'Des experts près de chez vous'"
      class="relative w-full rounded-md"
    >
      <img
        :src="advantageMedia"
        :alt="title"
        class="w-full rounded-md object-cover block"
      />

      <!-- POINTEUR PERPIGNAN -->
      <div
        class="group absolute left-[49%] top-[87%] -translate-x-1/2 -translate-y-1/2 cursor-pointer z-30"
      >
        <!-- SVG Pointer clignotant Orange/Rouge -->
        <svg
          class="w-8 h-8 pulse-orange-red drop-shadow-lg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            d="M12 0C7.58 0 4 3.58 4 8c0 5.25 7 13 8 16 1 0 8-10.75 8-16 0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"
          />
        </svg>

        <!-- POPUP LOREM IPSUM AU SURVOL -->
        <div
          class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col w-48 p-3 bg-white dark:bg-slate-800 rounded-lg shadow-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 z-40 pointer-events-none"
        >
          <div class="font-bold text-(--orange) border-b border-slate-200 dark:border-slate-700 pb-1 mb-1.5">
            Perpignan
          </div>
          <p class="text-slate-600 dark:text-slate-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
      </div>
    </div>

    <!-- Média dynamique classique pour les autres cas -->
    <template v-else>
      <video
        v-if="isVideo"
        :src="advantageMedia"
        autoplay
        muted
        loop
        class="w-full rounded-md object-cover"
      ></video>
      <img
        v-else
        :src="advantageMedia"
        :alt="title"
        class="w-full rounded-md object-cover"
      />
    </template>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { MoveLeft, X } from "lucide-vue-next";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const descriptions = {
  "Configuration gratuite":
    "Avec START-ALARM, créer votre plan d'habitation et tester sa vulnérabilité gratuitement.",
  "Testez avant d'acheter":
    "Fini d'acheter sans savoir à l'avance. Avec START-ALARM, notre configuration vous préconise l'installation idéale et vous donne ses taux d'éfficacité.",
  "100% personnalisé":
    "Fini d'acheter un 'PACK STANDARD', car chaque habitation est différente et a besoin d'un système cohérent par rapport à son niveau de vulnérabilité.",
  "Sans abonnement":
    "Fini de payer des services dont vous n'avez pas besoin. Chez START-ALARM, on n'impose pas le service 'Télésurveillance'. Vous y souscrivez que si vous le désirez. ",
  "Livré, prêt à fonctionner":
    "Chez START-ALARM, vous ne recevez pas un colis avec du matériel inerte !\n\n Tous les éléments sont configurés et programmés en fonction de votre habitation et de vos choix.\n\n  → Vous n'avez qu'à le poser. (un simple tournevis suffit)\n → Le matériel est prêt à fonctionner.",
  "Des experts près de chez vous":
    "Avec START-ALARM, fini les « Ramenez le matériel au magasin » ou « Nous allons récupérer le matériel » !\n\n START-ALARM, c'est un réseau d'installateurs experts indépendants, présents partout en France.\n\n Votre installateur connaît parfaitement votre système, puisqu'il a programmé votre alarme. En cas de besoin, vous bénéficiez ainsi de l'assistance d'un expert qui connaît votre installation.",
};

const media = {
  "Configuration gratuite": "/src/assets/img/detailAdv/creationPlan.png",
  "Testez avant d'acheter": "/src/assets/img/detailAdv/tauxEfficacité.png",
  "100% personnalisé": "/src/assets/img/detailAdv/personnalisation.png",
  "Sans abonnement": "/src/assets/img/detailAdv/sansAbo.mp4",
  "Livré, prêt à fonctionner": "/src/assets/img/detailAdv/livraison.png",
  "Des experts près de chez vous": "/src/assets/img/detailAdv/carteFrance.png",
};

const advantageMedia = computed(() => {
  return media[props.title] || "/src/assets/img/detailAdv/default.png";
});

const isVideo = computed(() => {
  return /\.(mp4|webm|ogg)$/i.test(advantageMedia.value);
});

const advantageDescription = computed(() => {
  return (
    descriptions[props.title] ||
    "Découvrez comment cette fonctionnalité sécurise votre logement facilement."
  );
});
</script>

<style scoped>
@keyframes pulseOrangeRed {
  0%, 100% {
    color: #f97316;
    transform: scale(1);
  }
  50% {
    color: #ef4444;
    transform: scale(1.25);
  }
}

.pulse-orange-red {
  animation: pulseOrangeRed 1.2s infinite ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>