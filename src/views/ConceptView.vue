<template>
  <section class="max-w-5xl mx-auto px-4 text-slate-800">
    <!-- Titre Principal -->
    <div class="text-center mb-12">
      <h2 class="flex flex-col text-3xl md:text-4xl font-extrabold text-(--dark-blue)">
        <span>Votre alarme sur-mesure en</span>
        <span class="text-(--light-blue)">3 étapes simples.</span>   
      </h2>
    </div>

    <!-- Grille des 3 étapes -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      
      <!-- Étape 1 -->
      <div class="relative bg-slate-50/50 rounded-xl border-2 border-(--dark-blue) p-6 flex flex-col items-center text-center pt-8">
        <!-- Pastille Numéro -->
        <div class="absolute -top-5 w-10 h-10 rounded-full bg-(--dark-blue) text-white font-bold flex items-center justify-center shadow-sm">
          1
        </div>
        <!-- Image / Illustration -->
        <div class="h-40 w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg">
          <img src="/src/assets/img/dessinPlan.png" alt="Concevez sur plan" class="max-h-full object-contain" />
        </div>
        <!-- Titre & Description -->
        <h3 class="text-lg font-bold text-[#003B71] mb-2">Concevez sur plan</h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Dessinez votre logement, placez vos capteurs et visualisez la zone couverte.
        </p>
      </div>

      <!-- Étape 2 -->
      <div class="relative bg-slate-50/50 rounded-xl border-2 border-(--light-blue) p-6 flex flex-col items-center text-center pt-8">
        <!-- Pastille Numéro -->
        <div class="absolute -top-5 w-10 h-10 rounded-full bg-(--light-blue) text-white font-bold flex items-center justify-center shadow-sm">
          2
        </div>
        <!-- Image / Illustration -->
        <div class="h-40 w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg">
          <img src="/src/assets/img/preparation.png" alt="Préparation" class="max-h-full object-contain" />
        </div>
        <!-- Titre & Description -->
        <h3 class="text-lg font-bold text-[#003B71] mb-2">Préparation</h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Nous préprogrammons tout en atelier avant l'envoi.
        </p>
      </div>

      <!-- Étape 3 -->
      <div class="relative bg-slate-50/50 rounded-xl border-2 border-(--orange) p-6 flex flex-col items-center text-center pt-8">
        <!-- Pastille Numéro -->
        <div class="absolute -top-5 w-10 h-10 rounded-full bg-(--orange) text-white font-bold flex items-center justify-center shadow-sm">
          3
        </div>
        <!-- Image / Illustration -->
        <div class="h-40 w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg">
          <img src="/src/assets/img/installation.png" alt="Pose facile" class="max-h-full object-contain" />
        </div>
        <!-- Titre & Description -->
        <h3 class="text-lg font-bold text-[#003B71] mb-2">Pose facile</h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Livraison, installation par vous-même ou faites appel à un pro.
        </p>
      </div>

    </div>

    <!-- Pied de section : Texte d'aide & Bouton d'action -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
      
      <!-- Texte de support -->
      <div class="flex items-center text-xs font-semibold text-slate-600">
        <span class="mr-1.5 text-amber-500 text-sm">👈</span>
        <span>Besoin d'aide pendant votre création ?</span>
        <a href="#" class="ml-1 text-[#00A3E0] hover:underline">
          Nos conseillers peuvent vous accompagner
        </a>
      </div>

      <!-- Bouton d'action -->
      <button 
        @click="goToPlan"
        class="flex items-center gap-2 px-5 py-2.5 bg-[#F25900] hover:bg-[#d94f00] text-white font-bold text-sm rounded-lg shadow transition-colors"
      >
        <span>✏️</span>
        <span>Tester sur mon plan</span>
        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToPlan = () => {
  // Redirige vers la page souhaitée
  router.push('/carte') 
}
</script>

<style scoped>
</style>