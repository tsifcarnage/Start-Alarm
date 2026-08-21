<template>
  <div class="flex h-screen overflow-hidden bg-(--bg-secondary) font-sans antialiased">
    <!-- Skeleton Sidebar (à gauche) -->
    <aside class="hidden md:flex w-64 flex-col gap-6 p-6 border-r border-slate-200/60 dark:border-slate-800 bg-(--bg-primary) animate-pulse">
      <div class="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded-lg mb-4"></div>
      <div class="space-y-4">
        <div v-for="i in 6" :key="i" class="h-6 w-full bg-slate-200/80 dark:bg-slate-700/60 rounded-md"></div>
      </div>
    </aside>

    <!-- Contenu principal (à droite) -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <Header />

      <!-- Zone 404 -->
      <main class="flex-1 overflow-y-auto p-6">
        <div
          class="mx-auto flex min-h-full flex-col items-center justify-center gap-6 rounded-xl bg-(--bg-primary) p-8 shadow-sm text-center"
        >
          <!-- SVG 404 Animé -->
          <div class="relative w-72 h-48 md:w-96 md:h-64 flex items-center justify-center">
            <svg
              viewBox="0 0 500 250"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="w-full h-full"
            >
              <!-- Chiffre 4 de gauche -->
              <text
                x="50"
                y="170"
                font-size="140"
                font-weight="900"
                class="fill-(--dark-blue) dark:fill-white font-sans"
              >
                4
              </text>

              <!-- Zéro animé (Gyrophare / Bouclier flottant) -->
              <g class="animate-bounce-slow">
                <circle cx="250" cy="120" r="55" class="fill-(--orange)/10 stroke-(--orange)" stroke-width="12" />
                <path d="M250 85 V120 L270 140" class="stroke-(--orange)" stroke-width="8" stroke-linecap="round" />
              </g>

              <!-- Chiffre 4 de droite -->
              <text
                x="340"
                y="170"
                font-size="140"
                font-weight="900"
                class="fill-(--dark-blue) dark:fill-white font-sans"
              >
                4
              </text>
            </svg>
          </div>

          <!-- Message d'erreur -->
          <div class="space-y-2 max-w-md">
            <h1 class="text-2xl md:text-3xl font-extrabold text-(--dark-blue) dark:text-white">
              Page introuvable
            </h1>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Oups ! La page que vous recherchez n'existe pas ou a été déplacée vers un autre secteur.
            </p>
          </div>

          <!-- Bouton de retour -->
          <router-link
            to="/"
            class="mt-2 inline-flex items-center gap-2 px-6 py-3 bg-(--orange) hover:bg-[#d64d00] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <ArrowLeft :size="18" />
            <span>Retour à l'accueil</span>
          </router-link>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";
import { ArrowLeft } from "lucide-vue-next";
import Header from "../components/nav/Header.vue";
</script>

<style scoped>
@keyframes float {
  0%, 100% {
    transform: translateY(-8px);
  }
  50% {
    transform: translateY(8px);
  }
}

.animate-bounce-slow {
  animation: float 3s ease-in-out infinite;
  transform-origin: center;
}
</style>