<script setup>
import { RouterView } from 'vue-router'
import Sidebar from './Sidebar.vue'
import Header from './Header.vue'
</script>

<template>
  <div class="flex min-h-screen bg-slate-100 font-sans antialiased">
    <!-- Sidebar / Menu à gauche -->
    <Sidebar />

    <!-- Contenu principal à droite -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <Header />
      
      <main class="flex-1 overflow-y-auto p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>

