<template>
  <div>
    <div v-if="loading" class="text-gray-500">loading...</div>
    <div v-if="error" class="text-red-500">Failed to load...</div>
    <div
      v-if="character"
      class="text-shadow inline-flex items-center bg-blue-100 text-[#3c8b6e] border border-blue-300 text-[8px] sm:text-[10px] font-medium px-2 py-0.5 rounded-full mr-1 shadow-sm"
    >
      {{ character.name }}
    </div>
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
