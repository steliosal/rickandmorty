<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <Episode v-for="episode in filteredEpisodes" :key="episode.id" :episode="episode" />
    <div class="flex justify-center mt-4">
      <button
        :disabled="!hasMorePages"
        class="px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold bg-blue-600 hover:bg-green-500 rounded-lg shadow transition-colors duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        :class="{ 'bg-blue-600': hasMorePages, 'bg-gray-400': !hasMorePages }"
        @click="fetchNextEpisodes"
      >
        Load More
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useEpisodesStore } from "@/store/episodesStore";
import Episode from "@/components/Episode.vue";

const episodesStore = useEpisodesStore();
const { loading, error, filteredEpisodes, hasMorePages } = storeToRefs(episodesStore);
const { fetchNextEpisodes } = episodesStore;

onMounted(() => {
  fetchNextEpisodes();
});
</script>
