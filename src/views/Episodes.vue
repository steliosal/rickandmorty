<template>
  <!-- Main container -->
  <div v-if="filteredEpisodes && filteredEpisodes.length > 0" class="max-w-7xl mx-auto p-4">
    <!-- Episodes List -->
    <Episode v-for="episode in filteredEpisodes" :key="episode.id" :episode="episode" class="list-animation" />
    <!-- Load More button -->
    <div v-if="showLoadMore" class="flex justify-center mt-4">
      <button
        :title="loadMoreTitle"
        :disabled="!hasMorePages"
        class="px-4 sm:px-6 py-2 sm:py-3 text-white font-semibold bg-blue-600 hover:bg-green-500 rounded-lg shadow transition-colors duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        :class="{ 'bg-blue-600': hasMorePages, 'bg-gray-400': !hasMorePages }"
        @click="fetchNextEpisodes"
      >
        Load More
      </button>
    </div>
  </div>
<!-- Message if no episodes are available -->
  <div
    v-if="!loading && filteredEpisodes && filteredEpisodes.length === 0"
    class="p-3 md:p-4 rounded-lg w-full h-full flex items-center justify-center text-center"
  >
    <div class="max-w-xs md:max-w-sm mt-20">
      <!-- Image at the top -->
      <img src="/rickmorty2.png" alt="Rick and Morty" class="mx-auto mb-6 w-32 md:w-64" />
      <!-- Message content -->
      <h2 class="font-bold text-base md:text-lg">OOPS!</h2>
      <p class="text-xs md:text-base">There is nothing here...</p>
    </div>
  </div>

  <!-- Modal for handling errors -->
  <BaseModal v-if="error" :message="error" @close="clearError" img="rickmorty.png" />
</template>

<script setup>
import { onMounted, computed } from "vue";
// Import components
import Episode from "@/components/Episode.vue";
import BaseModal from "@/components/BaseModal.vue";

// Import store and reactive properties
import { storeToRefs } from "pinia";
import { useEpisodesStore } from "@/store/episodesStore";

// Access store and extract reactive properties
const episodesStore = useEpisodesStore();
const { loading, error, filteredEpisodes, hasMorePages, filter } = storeToRefs(episodesStore);
const { fetchNextEpisodes } = episodesStore;

// On component mount, fetch episodes
onMounted(async () => {
  await fetchNextEpisodes();
});

// Manage visibility of the Load More button
const showLoadMore = computed(() => filter.value === "All episodes");

// Manage the title of the Load More button
const loadMoreTitle = computed(() => (hasMorePages.value ? "Click to load more episodes" : "No more episodes available"));

// Clear the error state in the store
function clearError() {
  episodesStore.clearError();
}
</script>
