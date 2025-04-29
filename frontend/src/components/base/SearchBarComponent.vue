<template>
  <div class="flex flex-col md:flex-row items-center justify-between p-4 bg-ahmi-bg">
    <!-- Titre -->
    <div class="text-ahmi-text-primary font-montserrat text-h1 font-bold mb-4 md:mb-0">
      {{ title }}
    </div>

    <!-- Search + Boutons -->
    <div class="flex items-center space-x-4 mt-4 md:mt-0 w-full md:w-auto">
      <!-- Input Search Mobile -->
      <div class="relative flex-grow md:hidden">
        <input
          type="text"
          v-model="search"
          @input="handleInput"
          class="w-full px-4 py-2 rounded-full border border-ahmi-border-primary bg-ahmi-surface-primary text-ahmi-text-primary focus:outline-none focus:ring-2 focus:ring-ahmi-primary"
          placeholder="Rechercher"
        />
        <button
          type="button"
          @click="handleInput"
          class="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <SearchIcon class="h-6 w-6 text-ahmi-text-secondary" />
        </button>
      </div>

      <!-- Input Search Desktop -->
      <div class="relative flex-grow hidden md:flex items-center">
        <input
          type="text"
          v-model="search"
          @input="handleInput"
          class="w-full px-4 py-2 rounded-full border border-ahmi-border-primary bg-ahmi-surface-primary text-ahmi-text-primary focus:outline-none focus:ring-2 focus:ring-ahmi-primary"
          placeholder="Rechercher"
        />
        <button
          type="button"
          @click="handleInput"
          class="ml-2 px-4 py-2 bg-ahmi-primary text-white rounded-full flex items-center"
        >
          <SearchIcon class="h-6 w-6 mr-2" />
          <span>Rechercher</span>
        </button>
      </div>

      <!-- Buttons Trier / Filtrer -->
      <BaseButton
        variant="light"
        size="md"
        rounded
        :className="'flex items-center space-x-2'"
        @click="$emit('sort')"
      >
        <SortDescendingIcon class="w-6 h-6" />
        <span class="hidden md:block">Trier</span>
      </BaseButton>

      <BaseButton
        variant="light"
        size="md"
        rounded
        :className="'flex items-center space-x-2'"
        @click="$emit('filter')"
      >
        <FilterIcon class="w-6 w-6" />
        <span class="hidden md:block">Filtrer</span>
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SearchIcon, SortDescendingIcon, FilterIcon } from '@heroicons/vue/outline'
import BaseButton from '@/components/base/BaseButton.vue'

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Événements à venir',
  },
})

// Reactive search value
const search = ref('')

// Fonction pour émettre la recherche en live
function handleInput() {
  $emit('update:search', search.value)
}
</script>

<style scoped>
/* Ajoutez vos styles spécifiques ici si besoin */
</style>
