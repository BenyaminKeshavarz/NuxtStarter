<script setup lang="ts">
// #region --------- Imports ---------
import { DialogTitle, DialogDescription, VisuallyHidden } from "reka-ui";
// #endregion

// #region --------- Utilities & Services ---------
const { isOpen } = useAppOverlayState("loading");
// #endregion
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :dismissible="false"
    :close="false"
    :ui="{
      overlay: 'bg-black/50 backdrop-blur-sm',
      content: 'p-6 sm:p-8 max-w-56 sm:max-w-62.5',
      body: 'p-0!',
    }"
  >
    <template #body>
      <VisuallyHidden>
        <DialogTitle>در حال بارگذاری سیستم</DialogTitle>
        <DialogDescription>
          لطفاً تا پایان بارگذاری سیستم منتظر بمانید.
        </DialogDescription>
      </VisuallyHidden>

      <div class="flex flex-col items-center justify-center gap-3 sm:gap-4">
        <!-- Logo -->
        <figure class="shrink-0">
          <img
            src="~/assets/images/logo.svg"
            alt="Logo"
            class="w-28 object-contain sm:w-37"
          />
        </figure>

        <!-- Loading Spinner -->
        <div class="flex items-center justify-center">
          <UIcon
            name="i-custom-loading-spinner"
            class="text-primary size-8 sm:size-10"
          />
        </div>
      </div>
    </template>
  </UModal>
</template>