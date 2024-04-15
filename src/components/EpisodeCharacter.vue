<template>
  <div>
    <!-- Loader bar displays during data fetching -->
    <BaseLoaderBar v-if="loading" />
    <!-- Modal for displaying errors -->
    <div v-if="error" :title="error" class="text-red-500 mr-2">
      <font-awesome-icon :icon="['fas', 'circle-exclamation']" />
    </div>
    <!-- Display character details -->
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
// Component imports
import BaseLoaderBar from "@/components/BaseLoaderBar.vue";

// Define props
const props = defineProps({
  characterURL: String,
});

// Define reactive variables
const loading = ref(false);
const error = ref(null);
const character = ref(null);

// Fetch character data when the component is mounted
onMounted(async () => {
  loading.value = true;
  try {
    const response = await axios.get(props.characterURL);
    character.value = response.data;
  } catch (e) {
    error.value = `Failed to load character data due to: ${e.message}. Please try again.`;
  } finally {
    loading.value = false;
  }
});

// Reset the error state
function clearError() {
  error.value = null;
}
</script>
