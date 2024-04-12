import { ref, computed } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

export const useEpisodesStore = defineStore("episodesStore", () => {
  // state
  const loading = ref(false);
  const error = ref(null);
  const episodes = ref([]);
  const page = ref(0);
  const totalPages = ref(1);
  const hasMorePages = computed(() => page.value < totalPages.value);

  const fetchNextEpisodes = async () => {
    if (hasMorePages.value) {
      loading.value = true;
      error.value = null;
      page.value += 1;

      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${Number(page.value)}`);
        episodes.value = [...episodes.value, ...response.data.results];
        totalPages.value = response.data.info.pages;
      } catch (e) {
        error.value = e;
      } finally {
        loading.value = false;
      }
    }
  };

  return {
    loading,
    error,
    episodes,
    hasMorePages,
    fetchNextEpisodes,
  };
});
