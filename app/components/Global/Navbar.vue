<template>
  <!--
    * -------------------------------------------------------
    * ### Base Sticky Navbar Component
    * -------------------------------------------------------
      This component provides a sticky navigation bar that adapts
      styling based on the scroll position.
      You can customize content, links, and styles and anything as needed.
    * ------------------------------------------------------- 
  -->

  <nav
    :class="[
      'sticky top-0 z-10 transition-all duration-300',
      stickyNavbarClasses,
    ]"
  >
    <div class="container flex items-center justify-between py-4">
      <a href="/" class="text-xl font-bold">Logo</a>
      <ul class="flex space-x-6">
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
const isScrolled = ref(false);

// TODO: Customize styles as needed...
const stickyNavbarClasses = computed(() => ({
  "bg-white bg-opacity-90 shadow-lg": isScrolled.value,
  "bg-transparent": !isScrolled.value,
}));

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50; 
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
