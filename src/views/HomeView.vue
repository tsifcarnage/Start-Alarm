<template>
    <!-- Contenu texte et CTA à gauche -->
    <div class="flex-1 space-y-6">
      <h1
        class=" max-w-[82%] flex flex-col text-6xl md:text-5xl font-extrabold text-(--orange) leading-tight"
      >
        <span>Concevez,</span>
        <span class="self-end "> Installez </span>
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

      <div class="pt-2">
        <button
          class="cursor-pointer inline-flex items-center gap-2 px-6 py-3.5 bg-(--orange) hover:bg-[#d64d00] text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <span>✏️</span> Créer mon plan de protection &rarr;
        </button>
      </div>

      <div class="pt-2">
        <a
          href="tel:0000000000"
          class="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-[#003B71] transition-colors"
        >
          <span>📞</span> Besoin d'aide ? Parler à un conseiller
        </a>
      </div>
    </div>

    <!-- Visuel à droite -->
    <div class="w-full md:w-1/2 flex justify-center">
      <img
        src="/src/assets/img/franceCarte.png"
        alt="Carte de couverture"
        class="w-full max-w-sm object-contain"
      />
    </div>
</template>

<script setup></script>
