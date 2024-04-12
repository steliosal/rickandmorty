<template>
  <div class="min-h-screen bg-gray-100 text-gray-900">
    <AppHeader />
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppHeader from "./components/AppHeader.vue";
</script>

<style scoped></style>
