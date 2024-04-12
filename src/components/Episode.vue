<template>
  <div
    :class="{ 'bg-gradient-to-r from-blue-400/40 to-white': episode.isFavorite, 'bg-white': !episode.isFavorite }"
    class="flex flex-row items-center justify-between w-3/6 mx-auto shadow-md border border-gray-300 rounded-3xl mb-3 p-4 transition-all ease-in-out duration-500"
  >
    <div class="flex-grow">
      <div class="font-bold text-gray-800 text-lg">{{ episode.name }}</div>
      <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
        <div class="text-blue-700">{{ episode.episode }}</div>
        <div class="text-gray-500 text-sm">{{ episode.air_date }}</div>
        <div
          v-for="(character, index) in episode.characters.slice(0, 5)"
          :key="index"
          class="bg-green-500 text-white text-xs font-medium mr-2 px-2.5 py-0.5 rounded"
        >
          {{ character.name }}
        </div>
      </div>
    </div>
    <div class="flex items-center gap-x-2">
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
        :disabled="watchStatus !== 'Watched'"
        @click="toggleFavorite"
        class="focus:outline-none mx-3"
        :class="{ 'text-gray-400': !episode.isFavorite, 'text-blue-500': episode.isFavorite }"
      >
        <font-awesome-icon :icon="['fas', 'heart']" size="lg" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useEpisodesStore } from "@/store/episodesStore";

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
</script>
