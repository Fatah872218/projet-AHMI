<template>
  <div class="min-h-screen bg-parchment text-text">
    <HeaderComponent />

    <main class="p-4">
      <SearchBarComponent></SearchBarComponent>
      <TitleComponent></TitleComponent>
      <slot></slot>
    </main>

    <FooterComponent />
  </div>
</template>

<script setup>
import FooterComponent from '@/components/FooterComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import SearchBarComponent from '@/components/base/SearchBarComponent.vue'
import TitleComponent from '@/components/base/TitleComponent.vue'
</script>

<style scoped>
@import '@/assets/styles/design-variables.css';
/* Ajoutez des styles spécifiques si nécessaire */
</style>
