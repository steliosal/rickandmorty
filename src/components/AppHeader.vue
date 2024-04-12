<template>
  <nav class="bg-blue-500 w-full flex  relative justify-between items-center mx-auto px-10 h-20 shadow-md">
      <div class="hidden md:block">
        <img class="h-20" src="@/assets/images/rick-morty.webp" alt="Rick and Morty" />
      </div>
      <h1 class="font-bold">Rick and Morty Episode Tracker</h1>

    <BaseDropDown :options="dropdownOptions" />
  </nav>
</template>

<script setup>
import BaseDropDown from "@/components/BaseDropDown.vue";
import { ref } from "vue";

const dropdownOptions = ref(["All episodes", "Watched", "Unwatched ", "Currently watching", "Favorites"]);
</script>

<style scoped></style>
