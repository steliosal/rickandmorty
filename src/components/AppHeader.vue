<template>
  <nav class="bg-blue-500 w-full flex flex-col md:flex-row items-center justify-between px-5 sm:px-10 h-auto sm:h-20 shadow-md">
    <div class="flex items-center space-x-3 md:space-x-4">
      <img class="hidden md:block h-12 md:h-20" src="@/assets/images/rick-morty.webp" alt="Rick and Morty" />
      <h1 class="font-bold creepster-font text-xl md:text-2xl text-cyan-300 outlined-text flex-grow my-2 md:my-0 flex-wrap">
        Rick and Morty Episode Tracker
      </h1>
    </div>

    <BaseDropDown :options="dropdownOptions" @update="updateFilter" />
  </nav>
</template>

<script setup>
import BaseDropDown from "@/components/BaseDropDown.vue";
import { ref } from "vue";
import { useEpisodesStore } from "@/store/episodesStore";

const episodesStore = useEpisodesStore();
const dropdownOptions = ref(["All episodes", "Watched", "Unwatched", "Watching", "Favorites"]);

function updateFilter(selectedOption) {
  episodesStore.setFilter(selectedOption);
}
</script>

<style>
.creepster-font {
  font-family: "Creepster", cursive;
}

.outlined-text {
  color: cyan; /* Text color */
  text-shadow: 1px 1px 0 #000, /* Larger black shadow */ -1px 1px 0 #000, /* Larger black shadow */ 1px -1px 0 #000,
    /* Larger black shadow */ -1px -1px 0 #000, /* Larger black shadow */ 1px 1px 0 #000, /* Larger black shadow */ -1px 1px 0 #000,
    /* Larger black shadow */ 1px -1px 0 #000, /* Larger black shadow */ -1px -1px 0 #000, /* Larger black shadow */ 2px 2px 0 #fcd34d,
    /* Yellow shadow */ -2px 2px 0 #fcd34d, /* Yellow shadow */ 2px -2px 0 #fcd34d, /* Yellow shadow */ -2px -2px 0 #fcd34d; /* Yellow shadow */
}
</style>
