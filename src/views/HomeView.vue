<template>
  <!-- Contenu texte et CTA à gauche -->
  <div class="flex-1 space-y-6">
    <div class="flex mb-4 w-full overflow-hidden bg-(--colorFocus)">
      <p
        class="inline-block whitespace-nowrap py-2 text-base sm:text-xl md:text-3xl font-bold font-['Mona_Sans'] text-white animate-marquee"
      >
        Le 1er configurateur & simulateur d'ALARME
      </p>
    </div>

    <h1
      class=" flex flex-col justify-start items-start text-6xl md:text-5xl font-extrabold text-(--orange) leading-tight"
    >
      <span>Concevez,</span>
      <span class="self-center"> Installez </span>
    </h1>

    <p class="flex flex-col text-2xl md:text-3xl font-bold text-(--dark-blue)">
      <span>Votre système d'alarme vous-même</span>
      <span class="text-(--light-blue) self-center"> en quelques clics.</span>
    </p>

    <p class="text-(--color) text-sm md:text-base leading-relaxed">
      Dessinez votre plan, testez votre couverture en direct et recevez votre
      matériel prêt à poser.<br />
      Programmé par nos experts, installé facilement par vous-même !
    </p>
    <section class="flex items-center justify-between">
      <div class=" flex flex-col gap-2">
        <div class="pt-2">
          <button
            class="flex cursor-pointer items-center justify-center gap-2 px-6 py-3.5 bg-(--orange) hover:bg-[#d64d00] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <span><Pencil :size="20" /></span>
            <span>Créer mon plan de protection </span>
            <MoveRight :size="20" class="pt-1" />
          </button>
        </div>
    
        <div class="pt-2">
          <a
            href="tel:0000000000"
            class="inline-flex items-center gap-2 text-xs text-slate-500 dark:text-(--text-secondary) hover:text-(--light-blue) transition-colors"
          >
            <span class="text-red-500"><Phone :size="15" /></span> Besoin d'aide ?
            Parler à un conseiller
          </a>
        </div>
      </div>

      <div class="bg-(--colorFocus) text-white dark:text-(--text-primary) py-4 px-8 rounded-full text-center -rotate-10 font-semibold">
        <span class="text-lg"><span class="text-2xl font-black">100%</span><br>adapté<br> à votre <br>habitation</span>
      </div>
    </section>

  </div>

  <!-- Visuel à droite -->
  <div class="w-full md:w-1/2 flex justify-end">
    <img
      src="/src/assets/img/houseAlarm.png"
      alt="Carte de couverture"
      class="w-full max-w-lg object-contain"
    />
  </div>
</template>

<script setup>
import { MoveRight, Pencil, Phone } from "lucide-vue-next";
</script>

<style scoped>
.animate-marquee {
  animation: marquee 12s linear infinite;
}

@keyframes marquee {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(-100%);
  }
}
</style>
