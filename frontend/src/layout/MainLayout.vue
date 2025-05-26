<!-- src/layout/MainLayout.vue -->
<template>
  <div class="min-h-screen bg-ahmi-bg text-ahmi-text-primary flex flex-col">
    <HeaderComponent />

    <main class="flex-grow">
      <div class="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <slot />
      </div>
    </main>

    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>
