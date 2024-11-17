<template>
  <button
    @click="toggleDarkMode"
    class="rounded-md bg-gray-200 p-2 text-gray-900 dark:bg-gray-800 dark:text-gray-100"
  >
    {{ isDarkMode ? "Switch to Light" : "Switch to Dark" }}
    
  </button>
</template>

<script setup>
const { isDarkMode, toggleDarkMode } = useTheme();
</script>
