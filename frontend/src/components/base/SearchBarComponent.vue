<template>
  <div class="w-full bg-ahmi-bg p-4">
    <form @submit.prevent="handleSubmit" class="flex flex-col md:flex-row items-center gap-4">
      <!-- Input -->
      <div class="relative flex-grow w-full">
        <input
          v-model="search"
          @input="handleInput"
          type="text"
          class="w-full px-4 py-2 pl-10 rounded-full border border-ahmi-border-primary bg-ahmi-surface-primary text-ahmi-text-primary focus:outline-none focus:ring-2 focus:ring-ahmi-primary"
          :placeholder="placeholderText"
        />
        <SearchIcon
          class="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-ahmi-text-secondary"
        />
      </div>

      <!-- Bouton -->
      <button
        type="submit"
        class="flex items-center justify-center px-4 py-2 bg-ahmi-primary text-white rounded-full text-sm md:text-base hover:bg-ahmi-secondary transition"
      >
        <SearchIcon class="h-5 w-5 md:mr-2" />
        <span class="hidden md:inline">Rechercher</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { SearchIcon } from '@heroicons/vue/outline'

const search = ref('')

const emit = defineEmits(['update:search'])

function handleInput() {
  emit('update:search', search.value)
}

function handleSubmit() {
  emit('update:search', search.value)
}

const placeholderText = computed(() =>
  window.innerWidth < 768
    ? '' // Juste l'icône en mobile
    : '🔍 Rechercher un mot ou une expression'
)
</script>
