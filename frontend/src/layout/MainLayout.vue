<template>
  <div class="min-h-screen bg-parchment text-text">
    <HeaderComponent />

    <main class="p-4">
      <SearchBarComponent
        title="Liste des événements"
        @update:search="updateSearch"
        @sort="toggleSortOrder"
        @filter="openFilterModal"
      />
      <TitleComponent title="Liste des événements" />
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

const updateSearch = (value) => {
  searchQuery.value = value
}

const toggleSortOrder = () => {
  sortAscending.value = !sortAscending.value
}

const openFilterModal = () => {
  console.log('Ouvrir les options de filtre...')
}
</script>

<style scoped>
@import '@/assets/styles/design-variables.css';
/* Ajoutez des styles spécifiques si nécessaire */
</style>
