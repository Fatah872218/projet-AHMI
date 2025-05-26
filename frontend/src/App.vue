<template>
  <div>
    <!-- Zone de notification accessible pour lecteurs d’écran -->
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      <!-- Les messages Toast y seront lus si nécessaire -->
    </div>
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>
