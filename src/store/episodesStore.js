import { ref, computed } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

function convertToMyEpisode(episodeFromApi) {
  return {
    ...episodeFromApi,
    status: "Unwatched",
    isFavorite: false,
  };
}

function convertToMyEpisodes(episodesFromApi = []) {
  return episodesFromApi.map(convertToMyEpisode);
}

export const useEpisodesStore = defineStore("episodesStore", () => {
  // state
  const loading = ref(false);
  const error = ref(null);
  const episodes = ref([]);
  const page = ref(0);
  const totalPages = ref(1);
  const hasMorePages = computed(() => page.value < totalPages.value);
  const filter = ref("");

  const updateEpisodeStatus = (id, status) => {
    const episode = episodes.value.find((ep) => ep.id === id);
    if (episode) {
      episode.status = status;
      // Reset favorite status if the new status is not 'Watched'
      if (status !== "Watched") {
        episode.isFavorite = false;
      }
    }
  };

  const toggleFavorite = (id) => {
    const episode = episodes.value.find((ep) => ep.id === id);
    if (episode) {
      episode.isFavorite = !episode.isFavorite;
    }
    console.log("toggleFavorite", id, episode.isFavorite);
  };

  const fetchNextEpisodes = async () => {
    if (hasMorePages.value) {
      loading.value = true;
      error.value = null;
      page.value += 1;

      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${Number(page.value)}`);
        episodes.value = [...episodes.value, ...convertToMyEpisodes(response.data.results)];
        totalPages.value = response.data.info.pages;
      } catch (e) {
        error.value = e.message;
      } finally {
        loading.value = false;
      }
    }
  };

  // Computed property to filter episodes based on the current filter status
  const filteredEpisodes = computed(() => {
    switch (filter.value) {
      case "Watched":
      case "Unwatched":
      case "Watching":
        return episodes.value.filter((ep) => ep.status === filter.value);
      case "Favorites":
        return episodes.value.filter((ep) => ep.isFavorite);
      default:
        return episodes.value; // All episodes
    }
  });

  const setFilter = (newFilter) => {
    filter.value = newFilter;
  };

  return {
    loading,
    error,
    filteredEpisodes,
    hasMorePages,
    fetchNextEpisodes,
    setFilter,
    updateEpisodeStatus,
    toggleFavorite,
  };
});
