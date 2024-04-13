<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <AppHeader />
    <BaseLoaderBar v-if="loading" />
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
import BaseLoaderBar from "./components/BaseLoaderBar.vue";
import { storeToRefs } from "pinia";
import { useEpisodesStore } from "@/store/episodesStore";

const episodesStore = useEpisodesStore();

const { loading } = storeToRefs(episodesStore);
</script>

<style scoped></style>
