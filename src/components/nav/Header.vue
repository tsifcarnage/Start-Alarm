<template>
  <header class="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-end gap-4">
    <!-- Notifications -->
    <button class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
    </button>

    <!-- Theme Toggle -->
    <button class="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"/></svg>
    </button>

    <!-- Badge Invité -->
    <div class="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full text-slate-700 text-sm font-medium">
      <div class="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center text-xs">
        👤
      </div>
      <span>Invité</span>
    </div>
  </header>
</template>
