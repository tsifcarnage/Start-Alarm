<template>
  <aside 
    :class="[
      'bg-white border-r border-slate-200 flex flex-col justify-between p-4 shadow-sm select-none transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-64'
    ]"
  >
    <div>
      <!-- Logo Start Alarm -->
      <RouterLink to="/" class="mb-6 px-2 py-1 flex justify-center items-center h-20 overflow-hidden">
        <img 
          src="/src/assets/img/logoStartAlarm.svg" 
          alt="Start Alarm" 
          class="
            'object-contain transition-all duration-300'
          " 
        />
      </RouterLink>

      <!-- Section Titre Menu + Bouton Flèche -->
      <div class="flex items-center justify-between mb-4 px-3 text-slate-800 font-bold">
        <span v-if="!isCollapsed" class="text-base">Menu:</span>
        <button 
          @click="isCollapsed = !isCollapsed" 
          class="p-1 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
          :class="{ 'mx-auto': isCollapsed }"
          :title="isCollapsed ? 'Agrandir' : 'Réduire'"
        >
          <svg 
            class="w-5 h-5 transform transition-transform duration-300" 
            :class="{ 'rotate-180': isCollapsed }" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
        </button>
      </div>

      <!-- Navigation principale -->
      <nav class="space-y-1">
        <RouterLink to="/" exact class="nav-item" :class="{ 'justify-center px-0': isCollapsed }" title="accueil">
          <svg class="w-5 h-5 shrink-0" :class="{ 'mr-3': !isCollapsed }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
          <span v-if="!isCollapsed">Accueil</span>
        </RouterLink>

        <RouterLink to="/concept" class="nav-item" :class="{ 'justify-center px-0': isCollapsed }" title="concepts">
          <svg class="w-5 h-5 shrink-0" :class="{ 'mr-3': !isCollapsed }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
          <span v-if="!isCollapsed">Les concepts</span>
        </RouterLink>

        <RouterLink to="/avantages" class="nav-item" :class="{ 'justify-center px-0': isCollapsed }" title="avantages">
          <svg class="w-5 h-5 shrink-0" :class="{ 'mr-3': !isCollapsed }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          <span v-if="!isCollapsed">Nos avantages</span>
        </RouterLink>

        <RouterLink to="/produits" class="nav-item" :class="{ 'justify-center px-0': isCollapsed }" title="produits">
          <svg class="w-5 h-5 shrink-0" :class="{ 'mr-3': !isCollapsed }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>
          <span v-if="!isCollapsed">Nos produits</span>
        </RouterLink>

        <RouterLink to="/carte" class="nav-item" :class="{ 'justify-center px-0': isCollapsed }" title="carte">
          <svg class="w-5 h-5 shrink-0" :class="{ 'mr-3': !isCollapsed }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
          <span v-if="!isCollapsed">Carte</span>
        </RouterLink>
      </nav>
    </div>

    <!-- Bouton de connexion -->
    <div class="pt-4 border-t border-slate-100">
      <button 
        @click="navigateToLogin"
        class="w-full flex items-center justify-center gap-2 py-2.5 px-3 bg-[#003B71] hover:bg-[#00284f] text-white font-semibold rounded shadow-sm transition-colors"
        :title="isCollapsed ? 'Se connecter' : ''"
      >
        <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
        <span v-if="!isCollapsed">Se connecter</span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router'
const isCollapsed = ref(false)
</script>

<style scoped>

</style>