<template>
  <!-- BaseLoaderBar: Displays a loading indicator bar when data is being fetched -->
  <div v-if="loading" class="w-full">
    <div class="h-1.5 w-full bg-cyan-500 overflow-hidden">
      <!-- Animated progress bar with a gradient effect -->
      <div class="bg-green-500 h-full animate-progress"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

// Access the EpisodesStore
import { useEpisodesStore } from "@/store/episodesStore";
const episodesStore = useEpisodesStore();

// Access the 'loading' state from EpisodesStore
const loading = computed(() => episodesStore.loading);
</script>

<style scoped>
/* Progress bar animation */
@keyframes progress {
  0%,
  10% {
    transform: translateX(-100%) scaleX(0);
    background: linear-gradient(to right, #32db64 0%, #4cd964 50%, #32db64 100%);
  }
  20% {
    transform: translateX(0%) scaleX(1); /* Quickly expand to full width */
    background: linear-gradient(to right, #4cd964 0%, #32db64 50%, #4cd964 100%);
  }
  100% {
    transform: translateX(100%) scaleX(0);
    background: linear-gradient(to right, #32db64 0%, #4cd964 50%, #32db64 100%);
  }
}
.animate-progress {
  width: 100%;
  animation: progress 11s infinite ease-in-out;
}
</style>
