<template>
  <!--
    * -------------------------------------------------------
    * ### Back to Top Button Component
    * -------------------------------------------------------
      This component provides a floating "Back to Top" button
      that appears when the user scrolls down a certain
      distance (300px in this case). 
      Clicking the button smoothly scrolls the page back to the top.
    * ------------------------------------------------------- 
  -->

  <Transition name="fade" mode="out-in">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-4 left-4 rounded-full bg-brand-primary p-3 text-white shadow-md transition-all"
      aria-label="Scroll back to top"
    >
      <svg
        class="h-4 w-4 fill-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 384 512"
      >
        <path
          d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
        />
      </svg>
    </button>
  </Transition>
</template>

<script setup>
const isVisible = ref(false);

const handleScroll = () => {
  isVisible.value = window.scrollY > 300;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
