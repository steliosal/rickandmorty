<template>
  <!-- Header: Contains logo and filter dropdown -->
  <nav
    class="bg-blue-500 py-4 w-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-10 h-auto border-b-4 border-green-400 sticky top-0 z-50"
    role="banner"
  >
    <!-- Logo and Title -->
    <div class="flex items-center space-x-3 md:space-x-4">
      <img class="hidden md:block h-12 md:h-20" src="@/assets/images/rick-morty.webp" alt="Rick and Morty" />
      <h1 class="font-bold text-center creepster-font text-2xl lg:text-3xl text-cyan-300 outlined-text flex-grow my-2 md:my-0 flex-wrap">
        Rick and Morty Episode Tracker
      </h1>
    </div>

    <!-- Dropdown for filtering episodes -->
    <BaseDropDown :options="dropdownOptions" @update="updateFilter" />
  </nav>
</template>

<script setup>
import { ref } from "vue";
import BaseDropDown from "@/components/BaseDropDown.vue";

// Define dropdown options
const dropdownOptions = ref(["All episodes", "Watched", "Unwatched", "Watching", "Favorites"]);

// Access store and setFilter
import { useEpisodesStore } from "@/store/episodesStore";
const episodesStore = useEpisodesStore();

// Update filter based on dropdown selection
function updateFilter(selectedOption) {
  episodesStore.setFilter(selectedOption);
}
</script>

<style>
/*  Creepster font and outlined text */
.creepster-font {
  font-family: "Creepster", cursive;
}

.outlined-text {
  color: cyan;
  text-shadow: 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000, 1px 1px 0 #000, -1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000,
    2px 2px 0 #fcd34d, -2px 2px 0 #fcd34d, 2px -2px 0 #fcd34d, -2px -2px 0 #fcd34d;
}
</style>
