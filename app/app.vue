<template>
  <!-- Main App Wrapper -->
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />

    <!-- Layout that will render header, footer, page content and etc. -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <span class="sr-only">Welcome!</span>
  </div>
</template>
