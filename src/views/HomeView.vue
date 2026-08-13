<template>
  <!-- Contenu texte et CTA à gauche -->
  <div class="flex-1 space-y-6 w-full">
    <div
      class="flex mb-4 w-full overflow-hidden bg-(--colorFocus) min-[1408px]:flex-col"
    >
      <p
        class="inline-block whitespace-nowrap py-2 text-base sm:text-xl md:text-3xl font-bold font-['Mona_Sans'] text-white animate-marquee"
      >
        Le 1er configurateur & simulateur d'ALARME
      </p>
    </div>

    <h1
      class="flex flex-col justify-start items-start text-6xl md:text-5xl font-extrabold text-(--orange) leading-tight"
    >
      <span>Concevez,</span>
      <span class="self-center"> Installez...</span>
    </h1>

    <p class="flex flex-col text-2xl md:text-3xl font-bold text-(--dark-blue)">
      <span>...Votre système d'alarme vous-même</span>
      <span class="self-center"> en quelques clics.</span>
    </p>

    <p class="text-(--color) text-sm md:text-base leading-relaxed">
      Dessinez votre plan, testez votre couverture en direct et recevez votre
      matériel prêt à poser.<br />
      Programmé par nos experts, installé facilement par vous-même !
    </p>
    <section class="flex items-center justify-between flex-wrap">
      <div class="flex flex-col gap-2">
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
            <span class="text-red-500"><Phone :size="15" /></span> Besoin d'aide
            ? Parler à un conseiller
          </a>
        </div>
      </div>
      <!-- circle adaptation -->
      <div
        class="bg-(--circleColor) dark:bg-(--colorFocus) text-(--dark-blue) dark:text-(--text-primary) py-6 px-8 rounded-full text-center -rotate-10 font-bold font-['Mona_Sans']"
      >
        <span class="text-lg leading-tight"
          ><span class="text-3xl font-black">100%</span><br />adapté<br />
          à votre <br />habitation</span
        >
      </div>
    </section>
  </div>

  <!-- Visuel à droite -->
  <div v-if="!openSolution" class="flex flex-col w-full md:w-1/2 justify-end">
    <img
      src="/src/assets/img/houseAlarm.png"
      alt="Carte de couverture"
      class="w-full max-w-lg object-contain self-center"
    />
    <button
    @click="openSolution = !openSolution"
      class="cursor-pointer flex gap-1 self-center border-2 border-(--dark-blue) text-(--dark-blue) dark:text-(--text-primary) font-semibold py-4 px-6 rounded-md animate-button-pulse hover:bg-(--dark-blue) hover:text-(--bg-primary)"
    >
      <span>Avantages de notre solution</span>
      <ScanEye class="mt-0.5"/>
    </button>
  </div>
  <div v-else class="flex flex-col">
    <h3 class="text-2xl font-bold text-(--dark-blue) pb-4 text-center">Concevez vous-même votre système d'alarme en ligne, nous vous guidons à chaque étape !</h3>
    <img class="w-full max-w-md object-contain self-center " src="/src/assets/img/avantageImg1.png" alt="">
    <ul class="text-xl max-w-100 m-auto pt-6 text-(--light-blue)">
      <li><i>‣</i> Configuration gratuite</li>
      <li><i>‣</i> Testez avant d'acheter</li>
      <li><i>‣</i> 100% personnalisé</li>
      <li><i>‣</i> Sans abonnement</li>
      <li><i>‣</i> Livré prêt à fonctionner</li>
    </ul>
    <button
    @click="openSolution = !openSolution"
      class="cursor-pointer flex gap-1 self-center border-2 border-(--dark-blue) text-(--dark-blue) dark:text-(--text-primary) font-semibold py-4 px-6 rounded-md animate-button-pulse hover:bg-(--dark-blue) hover:text-(--bg-primary)"
    >
      <span>Illustration des caméras</span>
      <ScanEye class="mt-0.5"/>
    </button>
  </div>
</template>

<script setup>
import { MoveRight, Pencil, Phone, ScanEye } from "lucide-vue-next";
import { ref } from "vue";
const openSolution = ref(false)
</script>

<style scoped>
i{
  color: red;
}
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
@keyframes button-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.10);
  }
}

.animate-button-pulse {
  animation: button-pulse 1.8s ease-in-out infinite;
}
</style>
