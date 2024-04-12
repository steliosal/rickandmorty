<template>
  <div>
    <Episode v-for="episode in episodes" :episode="episode" />
    <button
      :disabled="!hasMorePages"
      class="p-4 rounded"
      :class="{ 'bg-blue-600': hasMorePages, 'bg-gray-400': !hasMorePages }"
      @click="fetchNextEpisodes"
    >
      Load More
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useEpisodesStore } from "@/store/episodesStore";
import Episode from "@/components/Episode.vue";

const episodesStore = useEpisodesStore();
const { loading, error, episodes, hasMorePages } = storeToRefs(episodesStore);
const { fetchNextEpisodes } = episodesStore;

onMounted(() => {
  fetchNextEpisodes();
});
</script>

<style lang="scss" scoped></style>
