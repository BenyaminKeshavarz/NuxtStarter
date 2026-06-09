

<template>
  <!-- Main App Wrapper -->
  <UApp>
    <NuxtLoadingIndicator />
    <NuxtRouteAnnouncer/>

    <!-- TODO: Remove it later -->
    <!-- <NuxtWelcome /> -->

    <!-- Layout that will render header, footer, page content and etc. -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
