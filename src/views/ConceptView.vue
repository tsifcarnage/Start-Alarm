<template>
  <section class="max-w-5xl mx-auto px-4 text-slate-800 ">
    <!-- Titre Principal -->
    <div class="text-center mb-12">
      <h2 class="flex flex-col text-3xl md:text-4xl font-extrabold text-(--dark-blue)">
        <span>Votre alarme sur-mesure en</span>
        <span class="text-(--light-blue)">3 étapes simples.</span>   
      </h2>
    </div>

    <!-- Grille des 3 étapes -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
     <Steps/>
    </div>

    <!-- Pied de section : Texte d'aide & Bouton d'action -->
    <div class="flex flex-col md:flex-row items-center justify-between gap-4 mt-6">
      
      <!-- Texte de support -->
      <div class="flex items-center text-xs font-semibold text-slate-600 dark:text-(--text-secondary)">
        <span class="mr-1.5 text-amber-500 text-sm"><Lightbulb :size="15" /></span>
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
        <span><Pencil :size="15"/></span>
        <span>Tester sur mon plan</span>
        <MoveRight :size="20" class="pt-1" />
      </button>

    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Steps from '../components/Steps.vue';
import { Lightbulb, MoveRight, Pencil } from 'lucide-vue-next';

const router = useRouter()
</script>

<style scoped>
</style>