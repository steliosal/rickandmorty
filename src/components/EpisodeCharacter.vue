<template>
  <div>
    <div v-if="loading">loading...</div>
    <div v-if="error">Failed to load..</div>
    <div v-if="character">{{ character.name }}</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const props = defineProps({
  character: String,
});
const loading = ref(false);
const error = ref(null);
const character = ref(null);

onMounted(async () => {
  try {
    const response = await axios.get(props.character);
    character.value = response.data;
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>
