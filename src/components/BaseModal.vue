<template>
  <!-- BaseModal: Displays a modal with a message and a close button -->
  <div v-if="message" class="fixed inset-0 bg-black/30 flex justify-center items-center px-4 py-2">
    <div class="bg-white p-3 md:p-4 rounded-lg w-full max-w-xs md:max-w-sm mx-auto text-center">
      <!-- Image at the top of the modal -->
      <img :src="`/${img}`" alt="Rick and Morty" class="mx-auto mb-2 w-32 md:w-40" />
      <!-- Message content -->
      <h2 class="font-bold text-base md:text-lg">OOPS!</h2>
      <p class="text-xs md:text-sm">{{ message }}</p>
      <!-- Close button -->
      <div class="mt-2 md:mt-4">
        <button
          @click="close"
          class="px-4 sm:px-6 py-2 sm:py-3 text-white text-xs md:text-sm font-semibold bg-blue-600 hover:bg-green-500 rounded-lg hover:shadow-lg shadow transition-colors duration-300 ease-in-out hover:-translate-y-1"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define props and emits
const props = defineProps({
  message: String, // The message to display inside the modal
  img: String, // The image to display
});

const emits = defineEmits(["close"]);

// Emit the close event
function close() {
  emits("close");
}
</script>
