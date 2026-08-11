<template>
  <div v-for="step in steps" :key="step.number"
    :class="['relative bg-slate-50/50 cursor-pointer transition-all duration-300 rounded-xl border-2  p-6 flex flex-col items-center text-center pt-8 hover:scale-105 hover:bg-slate-100', `border-(--${step.color})`]"
  >
    <div
      :class="['absolute -top-5 w-10 h-10 rounded-full text-white font-bold flex items-center justify-center shadow-sm',` bg-(--${step.color})`]"
    >
      {{ step.number }}
    </div>
    <div
      class="h-40 w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg"
    >
      <img
        :src="step.src"
        alt="Pose facile"
        class="max-h-full object-contain rounded-md"
      />
    </div>
    <h3 :class="['text-lg font-bold mb-2',`text-(--${step.color})`]">{{ step.title }}</h3>
    <p class="text-xs text-slate-600 leading-relaxed">
      {{ step.description }}
    </p>
  </div>
</template>
<script setup>
const steps = [
  {
    color: "dark-blue",
    number: 1,
    src: "/src/assets/img/dessinPlan.png",
    title: "Concevez sur plan",
    description:
      "Dessinez votre logement, placez vos capteurs et visualisez la zone couverte.",
  },
  {
    color: "light-blue",
    number: 2,
    src: "/src/assets/img/preparation.png",
    title: "Préparation",
    description: "Nous préprogrammons tout en atelier avant l'envoi.",
  },
  {
    color: "orange",
    number: 3,
    src: "/src/assets/img/installation.png",
    title: "Pose facile",
    description: "Livraison, installation par vous-même ou faites appel à un pro.",
  },
];
</script>
