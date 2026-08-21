<script setup lang="ts">
import { ref, onMounted } from "vue";
import { CircleUser, Heart, Moon, ShoppingBag, Sun } from "lucide-vue-next";
import { RouterLink } from "vue-router";

const isDark = ref(false);

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  localStorage.setItem("theme", dark ? "dark" : "light");
}

function toggleTheme() {
  isDark.value = !isDark.value;
  applyTheme(isDark.value);
}

onMounted(() => {
  const saved = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  isDark.value = saved ? saved === "dark" : prefersDark;
  applyTheme(isDark.value);
});
</script>

<template>
  <header
    class="h-16 bg-(--bg-primary) border-b border-(--border-color) px-6 flex items-center justify-end gap-4 transition-colors"
  >
    <!-- Favoris -->
    <RouterLink
      to="/favoris"
      class="cursor-pointer p-2 rounded-full transition-colors"
      :class="
        $route.path === '/favoris'
          ? 'text-red-500 bg-red-100 dark:bg-red-900/30'
          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
      "
      title="Mes favoris"
    >
      <Heart
        :size="20"
        :fill="$route.path === '/favoris' ? 'currentColor' : 'none'"
      />
    </RouterLink>

    <!-- Panier -->
    <RouterLink
      to="/panier"
      class="cursor-pointer p-2 rounded-full transition-colors"
      :class="
        $route.path === '/panier'
          ? 'text-orange-500 bg-red-100 dark:bg-orange-900/30'
          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
      "
      title="Mon panier"
    >
      <ShoppingBag :size="20" />
    </RouterLink>

    <!-- Theme Toggle -->
    <button
      @click="toggleTheme"
      class="cursor-pointer p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
      :class="
        isDark
          ? 'text-purple-400 hover:text-purple-300'
          : 'text-amber-500 hover:text-amber-600'
      "
      :aria-label="isDark ? 'Passer en mode clair' : 'Passer en mode sombre'"
    >
      <Sun v-if="!isDark" />
      <Moon v-else />
    </button>

    <!-- Badge Invité -->
    <div
      class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full text-slate-700 dark:text-slate-200 text-sm font-medium transition-colors"
    >
      <CircleUser />
      <span>Invité</span>
    </div>
  </header>
</template>
