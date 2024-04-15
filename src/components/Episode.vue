<template>
  <!-- Main container -->
  <div
    :class="{ 'bg-gradient-to-r from-blue-400/40 to-white': episode.isFavorite, 'bg-white': !episode.isFavorite }"
    class="flex flex-col sm:flex-row items-center justify-between w-full sm:w-[620px] mx-auto shadow-md border border-gray-300 rounded-3xl mb-3 p-4 transition-all ease-in-out duration-500"
  >
    <!-- Episode Information -->
    <div class="flex-grow w-full">
      <div class="font-bold text-gray-800 text-md sm:text-lg text-center sm:text-left">{{ episode.name }}</div>
      <div class="flex flex-row flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
        <div class="text-blue-700 text-xs sm:text-base">{{ episode.episode }}</div>
        <div class="text-gray-500 text-xs sm:text-sm">{{ episode.air_date }}</div>
      </div>
      <!-- Character labels -->
      <div class="flex flex-row flex-wrap items-center justify-center sm:justify-start my-2 sm:mt-0">
        <EpisodeCharacter v-for="(character, index) in episode.characters.slice(0, 5)" :key="index" :characterURL="character" />
      </div>
    </div>
    <!-- Set Watch Status DropDown -->
    <div class="flex flex-col sm:flex-row items-center gap-x-2 mt-3 sm:mt-0">
      <select
        v-model="watchStatus"
        @change="handleStatusChange"
        class="bg-gray-50 border border-gray-300 text-gray-800 py-1 px-2 rounded cursor-pointer text-sm"
      >
        <option value="Watched">Watched</option>
        <option value="Unwatched">Unwatched</option>
        <option value="Watching">Watching</option>
      </select>
      <!-- Favorite Button -->
      <button
        :title="favoriteButtonTitle"
        :disabled="watchStatus !== 'Watched'"
        @click="toggleFavorite"
        class="focus:outline-none mx-3 text-xs sm:text-sm mt-2 sm:mt-0"
        :class="{ 'text-blue-500': watchStatus === 'Watched', 'opacity-20': watchStatus !== 'Watched' }"
      >
        <font-awesome-icon :icon="['far', 'heart']" v-if="!episode.isFavorite" class="h-5 w-5" />
        <font-awesome-icon v-else="episode.isFavorite" :icon="['fas', 'heart']" class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import EpisodeCharacter from "./EpisodeCharacter.vue";

// Access store and extract reactive properties
import { useEpisodesStore } from "@/store/episodesStore";
const episodesStore = useEpisodesStore();

// Define props
const { episode } = defineProps({
  episode: Object,
});

// Current status of the episode
const watchStatus = ref(episode.status);

// Update episode watch status and potentially reset favorite status
function handleStatusChange() {
  episodesStore.updateEpisodeStatus(episode.id, watchStatus.value);
}

// Toggle favorite status if the episode is marked as watched
function toggleFavorite() {
  if (watchStatus.value === "Watched") {
    episodesStore.toggleFavorite(episode.id);
  }
}

// Determine the tooltip of the favorite button based on watch status
const favoriteButtonTitle = computed(() => {
  return watchStatus.value === "Watched" ? "Click to favorite this episode." : 'Mark as "Watched" to use the favorite feature.';
});
</script>
