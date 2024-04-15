import { ref, computed } from "vue";
import axios from "axios";
import { defineStore } from "pinia";

// Helper function to convert API episode data to a custom episode object
function convertToMyEpisode(episodeFromApi) {
  return {
    ...episodeFromApi,
    status: "Unwatched",
    isFavorite: false,
  };
}

// Helper function to convert an array of API episodes to an array of custom episode objects
function convertToMyEpisodes(episodesFromApi = []) {
  return episodesFromApi.map(convertToMyEpisode);
}

// Define the store for episodes
export const useEpisodesStore = defineStore("episodesStore", () => {
  // Reactive states
  const loading = ref(false);
  const error = ref(null);
  const episodes = ref([]);
  const page = ref(0);
  const totalPages = ref(1);
  const hasMorePages = computed(() => page.value < totalPages.value);
  const filter = ref("All episodes");

  // Update the status and favorite of an episode
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

  // Toggles the favorite status of an episode
  const toggleFavorite = (id) => {
    const episode = episodes.value.find((ep) => ep.id === id);
    if (episode) {
      episode.isFavorite = !episode.isFavorite;
    }
  };

  // Fetch the next page of episodes from the API
  const fetchNextEpisodes = async () => {
    // Fetch only if there are more pages to load
    if (hasMorePages.value) {
      loading.value = true;
      error.value = null;
      page.value += 1; // Increment the page number

      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/episode?page=${Number(page.value)}`);
        // Append the new episodes to the existing list
        episodes.value = [...episodes.value, ...convertToMyEpisodes(response.data.results)];
        totalPages.value = response.data.info.pages; // Update the total number of pages
      } catch (e) {
        error.value = "Failed to load episodes. Please check your connection and try again.";
      } finally {
        loading.value = false;
      }
    }
  };

  // Clear the error state
  const clearError = () => {
    error.value = null;
  };

  // Return Filter episodes based on the current filter status
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

  // Set the filter status
  const setFilter = (newFilter) => {
    filter.value = newFilter;
  };

  // Expose reactive states and methods
  return {
    loading,
    error,
    filter,
    filteredEpisodes,
    hasMorePages,
    fetchNextEpisodes,
    setFilter,
    updateEpisodeStatus,
    toggleFavorite,
    clearError,
  };
});
