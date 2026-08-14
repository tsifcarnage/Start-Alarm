<script setup>
import { RouterView } from "vue-router";
import Sidebar from "./Sidebar.vue";
import Header from "./Header.vue";
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-(--bg-secondary) font-sans antialiased">
    <!-- Sidebar / Menu à gauche (fixe) -->
    <Sidebar />

    <!-- Contenu principal à droite -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Header (fixe) -->
      <Header />

      <!-- Zone de contenu défilable -->
      <main class="flex-1 overflow-y-auto p-6">
        <div
          class="mx-auto flex min-h-full flex-col items-center justify-between gap-12 rounded-xl bg-(--bg-primary) p-8 shadow-sm min-[1408px]:flex-row min-[1408px]:items-start"
        >
          <RouterView />
        </div>
      </main>
    </div>
  </div>
</template>