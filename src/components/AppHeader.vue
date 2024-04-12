<template>
  <nav class="bg-blue-500 w-full flex relative justify-between items-center mx-auto px-10 h-20 shadow-md">
    <div class="hidden md:block">
      <img class="h-20" src="@/assets/images/rick-morty.webp" alt="Rick and Morty" />
    </div>

    
    <h1 class="font-bold creepster-font text-3xl text-cyan-300 outlined-text">Rick and Morty Episode Tracker</h1>
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
