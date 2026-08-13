<template>
  <div
    class="relative p-6 bg-slate-50 dark:bg-slate-900/60 rounded-xl border-2 border-(--orange)/30 shadow-md animate-fade-in space-y-4"
  >
    <!-- Bouton Fermer (X) -->
    <button
      @click="emit('close')"
      class="absolute top-4 right-4 text-slate-400 hover:text-(--orange) bg-white dark:bg-slate-800 p-1.5 rounded-full shadow hover:scale-110 transition-all cursor-pointer"
      title="Fermer"
    >
      <X :size="20" />
    </button>

    <!-- Titre -->
    <h2 class="text-2xl md:text-3xl font-extrabold text-(--orange) pr-8">
      {{ title }}
    </h2>

    <!-- Contenu dynamique selon le titre -->
    <p
      class="text-(--color) text-sm md:text-base leading-relaxed whitespace-pre-line"
    >
      {{ advantageDescription }}
    </p>

    <!-- Bouton Retour -->
    <button
      @click="emit('close')"
      class="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-(--orange) underline cursor-pointer pt-2"
    >
      <MoveLeft :size="14" />
      <span>Revenir à la présentation</span>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { MoveLeft, X } from "lucide-vue-next";

// Propriétés
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});

// Événement pour fermer
const emit = defineEmits(["close"]);

// Dictionnaire de contenus spécifiques selon le titre
const descriptions = {
  "Configuration gratuite":
    "Avec START-ALARM, créer votre plan d'habitation et tester sa vulnérabilité gratuitement.",
  "Testez avant d'acheter":
    "Fini d'acheter sans savoir à l'avance. Avec START-ALARM, notre configuration vous préconise l'installation idéale et vous donne ses taux d'éfficacité.",
  "100% personnalisé":
    "Fini d'acheter un 'PACK STANDARD', car chaque habitation est différente et a besoin d'un système cohérente par rapport à son niveau de vulnérabilité.",
  "Sans abonnement":
    "Chez START-ALARM, on n'impose pas le service 'Télésurveillance'. Vous y surveillez que si vous le désirez. Fini de payer des services dont vous n'avez pas besoin",
  "Livré prêt à fonctionner":
    "Chez START-ALARM, vous ne recevez pas un colis avec du matériel inerte !\n\n Tous les éléments sont configurés et programmés en fonction de votre habitation et de vos choix.\n\n  → Vous n'avez qu'à le poser.(un simple tournevis suffit)\n → Le matériel est prêt à facturé.",
  "Des experts près de chez vous":
    "Avec START-ALARM, fini les « Ramenez le matériel au magasin » ou « Nous allons récupérer le matériel » !\n\n START-ALARM, c'est un réseau d'installateurs experts indépendants, présents partout en France.\n\n Votre installateur connaît parfaitement votre système, puisqu'il a programmé votre alarme. En cas de besoin, vous bénéficiez ainsi de l'assistance d'un expert qui connaît votre installation.",
};

// Récupère la description associée ou un texte par défaut si non trouvée
const advantageDescription = computed(() => {
  return (
    descriptions[props.title] ||
    "Découvrez comment cette fonctionnalité sécurise votre logement facilement."
  );
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}
</style>
