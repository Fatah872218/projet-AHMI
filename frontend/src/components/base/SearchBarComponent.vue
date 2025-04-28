<template>
  <div class="flex items-center">
    <!-- Version Mobile -->
    <div class="relative flex-grow md:hidden">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleSearch"
        class="w-full px-4 py-2 rounded-full border border-ahmi-border-primary bg-ahmi-surface-primary text-ahmi-text-primary focus:outline-none focus:ring-2 focus:ring-ahmi-primary"
        placeholder="Rechercher"
      />
      <button
        type="button"
        @click="handleSearch"
        class="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        <SearchIcon class="h-6 w-6 text-ahmi-text-secondary" />
      </button>
    </div>

    <!-- Version Desktop -->
    <div class="relative flex-grow hidden md:flex items-center">
      <input
        type="text"
        v-model="searchQuery"
        @input="handleSearch"
        class="w-full px-4 py-2 rounded-full border border-ahmi-border-primary bg-ahmi-surface-primary text-ahmi-text-primary focus:outline-none focus:ring-2 focus:ring-ahmi-primary"
        placeholder="Rechercher"
      />
      <button
        type="button"
        @click="handleSearch"
        class="ml-2 px-4 py-2 bg-ahmi-primary text-white rounded-full flex items-center"
      >
        <SearchIcon class="h-6 w-6 mr-2" />
        <span>Rechercher</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SearchIcon } from '@heroicons/vue/outline'

const searchQuery = ref('')

function handleSearch() {
  // Logique de recherche ici
  console.log('Recherche effectuée pour :', searchQuery.value)
}
</script>

<style scoped>
/* Ajoutez des styles spécifiques si nécessaire */
</style>
