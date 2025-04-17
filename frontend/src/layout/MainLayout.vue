<template>
  <div class="min-h-screen bg-parchment text-text">
    <Header />
    <main class="p-4">
      <slot />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>
