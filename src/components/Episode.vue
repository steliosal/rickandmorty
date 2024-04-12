<template>
  <div class="flex flex-row gap-x-3">
    <div>{{ episode.name }}</div>
    <div>{{ episode.air_date }}</div>
    <div>{{ episode.episode }}</div>
  </div>
</template>

<script setup>
const { episode } = defineProps({
  episode: Object,
});
</script>

<style lang="scss" scoped></style>
