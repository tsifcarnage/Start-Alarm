<template>
  <!-- VUE 1 : Cartes d'origine (masquées si activeStep est défini) -->
  <template v-if="!activeStep">
    <div
      v-for="step in steps"
      :key="step.number"
      @click="selectStep(step)"
      :class="[
        'step-card relative bg-slate-50/50 cursor-pointer transition-all duration-300 rounded-xl border-2 p-6 flex flex-col items-center text-center pt-8 hover:scale-105 hover:bg-slate-100',
        `border-(--${step.color})`,
      ]"
    >
      <div
        :class="[
          'absolute -top-5 w-10 h-10 rounded-full text-white font-bold flex items-center justify-center shadow-sm',
          `bg-(--${step.color})`,
        ]"
      >
        {{ step.number }}
      </div>
      <div
        class="h-40 w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg"
      >
        <img
          :src="step.src"
          alt="Pose facile"
          class="max-h-full object-contain rounded-md"
        />
      </div>
      <h3 :class="['text-lg font-bold mb-2', `text-(--${step.color})`]">
        {{ step.title }}
      </h3>
      <p class="text-xs text-slate-600 leading-relaxed">
        {{ step.description }}
      </p>
    </div>
  </template>

  <!-- VUE 2 : Affichage de la vidéo en plein écran -->
  <div
    v-else
    class="fixed inset-0 z-50 bg-white flex items-center justify-center p-4"
  >
    <!-- Bouton X au dessus à gauche -->
    <button
      @click="closeVideo"
      class="absolute top-6 left-6 text-slate-700 hover:text-black font-bold text-3xl cursor-pointer z-20"
    >
      ✕
    </button>

    <video
      ref="videoRef"
      :src="activeStep.videos[currentVideoIndex]"
      autoplay
      muted
      playsinline
      controls
      :loop="activeStep.videos.length === 1"
      @ended="playNextVideo"
      :class="[
        'w-full h-full max-w-none object-contain rounded-xl cursor-pointer',
        { 'hide-controls': isPlaying }
      ]"
    >
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";

const activeStep = ref(null);
const currentVideoIndex = ref(0);
const videoRef = ref(null);
const isPlaying = ref(true);

function selectStep(step) {
  activeStep.value = step;
  currentVideoIndex.value = 0;
  isPlaying.value = true;
}

function closeVideo() {
  activeStep.value = null;
  currentVideoIndex.value = 0;
  isPlaying.value = false;
}

function playNextVideo() {
  if (!activeStep.value) return;

  if (currentVideoIndex.value < activeStep.value.videos.length - 1) {
    currentVideoIndex.value++;
  } else {
    currentVideoIndex.value = 0;
  }

  nextTick(() => {
    if (videoRef.value) {
      videoRef.value.play();
      isPlaying.value = true;
    }
  });
}

function handleKeyDown(event) {
  if (!activeStep.value || !videoRef.value) return;

  if (event.code === "Space") {
    event.preventDefault();
    if (videoRef.value.paused) {
      videoRef.value.play();
      isPlaying.value = true;
    } else {
      videoRef.value.pause();
      isPlaying.value = false;
    }
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});

const steps = [
  {
    color: "dark-blue",
    number: 1,
    src: "/src/assets/img/dessinPlan.png",
    videos: [
      "/src/assets/videos/plan/planMurAnim.mp4",
      "/src/assets/videos/plan/porteFenetre.mp4",
      "/src/assets/videos/plan/tauxVulnerabilité.mp4",
      "/src/assets/videos/plan/tauxEfficacité.mp4",
    ],
    title: "Concevez sur plan",
    description:
      "Dessinez votre logement, placez vos capteurs et visualisez la zone couverte.",
  },
  {
    color: "light-blue",
    number: 2,
    src: "/src/assets/img/preparation.png",
    videos: ["/src/assets/videos/preparation/preparationAnimation.mp4"],
    title: "Préparation",
    description: "Nous préprogrammons tout en atelier avant l'envoi.",
  },
  {
    color: "orange",
    number: 3,
    src: "/src/assets/img/installation.png",
    videos: ["/src/assets/videos/poseFacile/poseFacile.mp4"],
    title: "Pose facile",
    description:
      "Livraison, installation par vous-même ou faites appel à un pro.",
  },
];
</script>

<style scoped>
/* Badge 'Vidéo démo' au survol */
.step-card {
  overflow: visible;
}

/* Texte du badge avec ::after */
.step-card::after {
  content: "Vidéo démo";
  position: absolute;
  top: 12px;
  left: 12px;
  background-color: rgba(59, 63, 73, 0.85); /* Slate 900 sombre */
  color: #ffffff;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 4px 8px;
  border-radius: 5px;
  opacity: 0;
  transform: translateY(-4px);
  transition: all 0.25s ease-in-out;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

/* Petite lueur/point de distinction avec ::before */
.step-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius:10px;
  box-shadow: inset 0 0 0 2px rgba(59, 130, 246, 0.3); /* highlight bleu au survol */
  opacity: 0;
  transition: opacity 0.25s ease-in-out;
  pointer-events: none;
}

/* Affichage au survol */
.step-card:hover::after {
  opacity: 1;
  transform: translateY(0);
}

.step-card:hover::before {
  opacity: 1;
}

/* Masque les contrôles natifs de la vidéo */
video.hide-controls::-webkit-media-controls {
  display: none !important;
}
video.hide-controls::-webkit-media-controls-enclosure {
  display: none !important;
}
video.hide-controls::-moz-media-controls {
  display: none !important;
}
</style>