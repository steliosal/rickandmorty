<template>
  <div class="min-h-screen bg-gray-100 text-gray-800">
    <!-- Application header containing branding and filtering -->
    <AppHeader />
    <!-- Loader bar displays during data fetching -->
    <BaseLoaderBar v-if="loading" />
    <!-- Main content area for displaying router views -->
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
// Component imports
import AppHeader from "./components/AppHeader.vue";
import BaseLoaderBar from "./components/BaseLoaderBar.vue";

// State management imports
import { storeToRefs } from "pinia";
import { useEpisodesStore } from "@/store/episodesStore";

// Access store and extract the `loading` state
const episodesStore = useEpisodesStore();
const { loading } = storeToRefs(episodesStore);
</script>
