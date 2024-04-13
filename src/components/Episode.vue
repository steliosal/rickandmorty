<template>
  <div
    :class="{ 'bg-gradient-to-r from-blue-400/40 to-white': episode.isFavorite, 'bg-white': !episode.isFavorite }"
    class="flex flex-col sm:flex-row items-center justify-between w-full sm:w-3/6 mx-auto shadow-md border border-gray-300 rounded-3xl mb-3 p-4 transition-all ease-in-out duration-500"
  >
    <div class="flex-grow w-full">
      <div class="font-bold text-gray-800 text-md sm:text-lg text-center sm:text-left">{{ episode.name }}</div>
      <div class="flex flex-row flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
        <div class="text-blue-700 text-xs sm:text-base">{{ episode.episode }}</div>
        <div class="text-gray-500 text-xs sm:text-sm">{{ episode.air_date }}</div>
      </div>
      <!-- Character container -->
      <div class="flex flex-row flex-wrap items-center justify-center sm:justify-start my-2 sm:mt-0">
        <EpisodeCharacter v-for="(character, index) in episode.characters.slice(0, 5)" :key="index" :character="character" />
      </div>
    </div>
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
      <button
        :title="favoriteButtonTitle"
        :disabled="watchStatus !== 'Watched'"
        @click="toggleFavorite"
        class="focus:outline-none mx-3 text-xs sm:text-sm mt-2 sm:mt-0"
        :class="{ 'text-gray-400': !episode.isFavorite, 'text-blue-500': episode.isFavorite }"
      >
        <font-awesome-icon :icon="['fas', 'heart']" class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

import { useEpisodesStore } from "@/store/episodesStore";
import EpisodeCharacter from "./EpisodeCharacter.vue";

const { episode } = defineProps({
  episode: Object,
});

const episodesStore = useEpisodesStore();

const watchStatus = ref(episode.status);

function handleStatusChange() {
  episodesStore.updateEpisodeStatus(episode.id, watchStatus.value);
}

function toggleFavorite() {
  if (watchStatus.value === "Watched") {
    episodesStore.toggleFavorite(episode.id);
  }
}

const favoriteButtonTitle = computed(() => {
  return watchStatus.value === "Watched" ? "Click to favorite this episode." : 'Mark as "Watched" to use the favorite feature.';
});
</script>
