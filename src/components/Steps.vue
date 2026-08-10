<template>
  <div
    class="relative bg-slate-50/50 rounded-xl border-2 border-(--dark-blue) p-6 flex flex-col items-center text-center pt-8"
  >
    <!-- Pastille Numéro -->
    <div
      class="absolute -top-5 w-10 h-10 rounded-full bg-(--dark-blue) text-white font-bold flex items-center justify-center shadow-sm"
    >
      1
    </div>
    <!-- Image / Illustration -->
    <div
      class="h-40 w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg"
    >
      <img
        src="/src/assets/img/dessinPlan.png"
        alt="Concevez sur plan"
        class="max-h-full object-contain"
      />
    </div>
    <!-- Titre & Description -->
    <h3 class="text-lg font-bold text-[#003B71] mb-2">Concevez sur plan</h3>
    <p class="text-xs text-slate-600 leading-relaxed">
      Dessinez votre logement, placez vos capteurs et visualisez la zone
      couverte.
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
];
</script>
