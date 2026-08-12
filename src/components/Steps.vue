<template>
  <!-- VUE 1 : Cartes d'origine -->
  <template v-if="!activeStep">
    <div
      v-for="step in steps"
      :key="step.number"
      @click="selectStep(step)"
      class="step-card relative bg-slate-50/50 dark:bg-(--bg-primary) cursor-pointer transition-all duration-300 rounded-xl border-2 p-6 flex flex-col items-center text-center pt-8 hover:scale-105 hover:bg-slate-100 dark:hover:bg-(--colorFocus)"
      :style="{ borderColor: `var(--${step.color})` }"
    >
      <!-- Pastille numéro -->
      <div
        class="absolute -top-5 w-10 h-10 rounded-full text-white font-bold flex items-center justify-center shadow-sm"
        :style="{ backgroundColor: `var(--${step.color})` }"
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

      <!-- Titre de l'étape -->
      <h3
        class="text-lg font-bold mb-2"
        :style="{ color: `var(--${step.color})` }"
      >
        {{ step.title }}
      </h3>

      <p class="text-xs text-slate-600 dark:text-(--text-primary) leading-relaxed">
        {{ step.description }}
      </p>
    </div>
  </template>

  <!-- VUE 2 : Slider de vidéos -->
  <div
    v-else
    class="relative border-3 border-(--color) w-full h-88 md:col-span-3 flex items-center justify-center rounded-xl overflow-hidden p-1 group"
    :style="{ borderColor: `var(--${activeStep.color})` }"
  >
    <!-- Bouton Fermer (X) -->
    <button
  type="button"
  @click="closeVideo"
  class="close-button absolute top-4 left-4 border-3 font-bold text-2xl cursor-pointer z-30 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
  :style="{
    '--step-color': `var(--${activeStep.color})`
  }"
  aria-label="Fermer la vidéo"
>
  ✕
</button>




    <!-- Lecteur Vidéo (Clic = Play / Pause) -->
    <video
      ref="videoRef"
      :src="activeStep.videos[currentVideoIndex]"
      autoplay
      muted
      playsinline
      controls
      loop
      @click="togglePlayPause"
      :class="[
        'w-full h-full max-h-126 object-contain rounded-lg cursor-pointer',
        { 'hide-controls': isPlaying },
      ]"
    >
      Votre navigateur ne supporte pas la lecture de vidéos.
    </video>

    <!-- Barre de contrôle alignée en bas (Flèche Gauche - Puces - Flèche Droite) -->
    <div
      v-if="activeStep.videos.length > 1"
      class="absolute bottom-1 right-1 flex items-center gap-3 z-30 bg-[#0f172b99] p-2 rounded-xl backdrop-blur-sm shadow-lg"
    >
      <!-- Flèche Précédent -->
      <button
        type="button"
        @click="prevVideo"
        class="text-white/80 hover:text-white transition-colors cursor-pointer text-sm font-bold flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/10"
        aria-label="Vidéo précédente"
      >
        ❮
      </button>

      <!-- Puces d'indicateur -->
      <div class="flex items-center gap-2">
        <button
          type="button"
          v-for="(_, index) in activeStep.videos"
          :key="index"
          @click="goToVideo(index)"
          :class="[
            'w-2.5 h-2.5 rounded-full transition-all cursor-pointer',
            currentVideoIndex === index
              ? 'bg-white scale-125'
              : 'bg-white/40 hover:bg-white/70',
          ]"
          :aria-label="`Aller à la vidéo ${index + 1}`"
        />
      </div>

      <!-- Flèche Suivant -->
      <button
        type="button"
        @click="nextVideo"
        class="text-white/80 hover:text-white transition-colors cursor-pointer text-sm font-bold flex items-center justify-center w-6 h-6 rounded-full hover:bg-white/10"
        aria-label="Vidéo suivante"
      >
        ❯
      </button>
    </div>
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

function togglePlayPause() {
  if (!videoRef.value) return;

  if (videoRef.value.paused) {
    const playPromise = videoRef.value.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }
    isPlaying.value = true;
  } else {
    videoRef.value.pause();
    isPlaying.value = false;
  }
}

function nextVideo() {
  if (!activeStep.value) return;
  if (currentVideoIndex.value < activeStep.value.videos.length - 1) {
    currentVideoIndex.value++;
  } else {
    currentVideoIndex.value = 0;
  }
  playCurrentVideo();
}

function prevVideo() {
  if (!activeStep.value) return;
  if (currentVideoIndex.value > 0) {
    currentVideoIndex.value--;
  } else {
    currentVideoIndex.value = activeStep.value.videos.length - 1;
  }
  playCurrentVideo();
}

function goToVideo(index) {
  if (index === currentVideoIndex.value) return;
  currentVideoIndex.value = index;
  playCurrentVideo();
}

function playCurrentVideo() {
  isPlaying.value = true;
  nextTick(() => {
    if (videoRef.value) {
      const playPromise = videoRef.value.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    }
  });
}

function handleKeyDown(event) {
  if (!activeStep.value || !videoRef.value) return;

  if (event.code === "ArrowRight") {
    nextVideo();
  } else if (event.code === "ArrowLeft") {
    prevVideo();
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
.close-button {
  border-color: var(--step-color);
  color: var(--step-color);
}

.close-button:hover {
  background-color: var(--step-color);
  color: white;
}

/* Empêche le navigateur de recaler le scroll quand la vidéo
   change de taille/état pendant le chargement */
.step-card,
video {
  overflow-anchor: none;
}

/* Masque les contrôles natifs pendant la lecture */
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