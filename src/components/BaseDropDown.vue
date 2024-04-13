<template>
  <div class="relative text-lg w-full max-w-xs md:max-w-sm mb-3 md:mb-0">
    <button
      class="flex items-center justify-between px-3 py-0.5 md:py-1 bg-white w-full border border-gray-300 rounded-lg text-gray-800"
      @click="toggleOptions"
      @blur="closeOptions"
    >
      <span>{{ selectedOption }}</span>

      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
        :class="isOptionsExpanded ? 'rotate-90' : 'rotate-0'"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>
    <transition
      enter-active-class="transform transition duration-500 ease-custom"
      enter-class="-translate-y-1/2 scale-y-0 opacity-0"
      enter-to-class="translate-y-0 scale-y-100 opacity-100"
      leave-active-class="transform transition duration-300 ease-custom"
      leave-class="translate-y-0 scale-y-100 opacity-100"
      leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
    >
      <ul v-show="isOptionsExpanded" class="absolute left-0 right-0 mb-4 bg-white divide-y rounded-lg shadow-lg overflow-hidden">
        <li
          v-for="(option, index) in options"
          :key="index"
          class="text-gray-700 cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-blue-100"
          @mousedown.prevent="selectOption(option)"
        >
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  options: Array,
});

const emits = defineEmits(["update"]);

const isOptionsExpanded = ref(false);
const selectedOption = ref(props.options[0] || "");

function toggleOptions() {
  isOptionsExpanded.value = !isOptionsExpanded.value;
}

function closeOptions() {
  isOptionsExpanded.value = false;
}

function selectOption(option) {
  selectedOption.value = option;
  isOptionsExpanded.value = false;
  emits("update", option);
  console.log("Selected option:", option);
}
</script>

<style>
.ease-custom {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
