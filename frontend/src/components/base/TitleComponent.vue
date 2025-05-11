<template>
  <div
    class="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-ahmi-bg space-y-4 md:space-y-0"
  >
    <!-- Titre -->
    <div class="text-ahmi-text-primary font-montserrat text-h1 font-bold w-full md:w-auto">
      {{ title }}
    </div>

    <!-- Zone des boutons -->
    <div
      class="relative w-full md:w-auto flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4"
    >
      <!-- Bouton Trier -->
      <div class="relative w-full md:w-auto" ref="dropdownRef">
        <button
          class="w-full md:w-auto flex justify-between md:justify-start items-center space-x-2 text-sm text-ahmi-text-primary font-medium border border-gray-300 px-3 py-2 rounded"
          @click="isDropdownOpen = !isDropdownOpen"
        >
          <SortDescendingIcon class="w-5 h-5" />
          <span>Trier</span>
          <svg
            class="ml-auto md:ml-0 w-4 h-4"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Dropdown -->
        <div
          v-if="isDropdownOpen"
          class="absolute z-10 mt-2 w-full md:w-48 bg-white border border-gray-300 rounded shadow-md"
        >
          <ul class="divide-y divide-gray-100 text-sm">
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="selectSort('date')">
              📅 Date (récent → ancien)
            </li>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="selectSort('dayNight')">
              🌞 Jour / 🌙 Nuit
            </li>
            <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="selectSort('category')">
              📂 Catégorie
            </li>
          </ul>
        </div>
      </div>

      <!-- Bouton Filtrer -->
      <BaseButton
        variant="light"
        size="md"
        rounded
        @click="$emit('filter')"
        class="w-full md:w-auto"
      >
        <FilterIcon class="w-6 h-6" />
        <span class="hidden md:inline">Filtrer</span>
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { SortDescendingIcon, FilterIcon } from '@heroicons/vue/outline'
import BaseButton from '@/components/base/BaseButton.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Événements à venir',
  },
})

const emit = defineEmits(['change-sort', 'filter'])

const isDropdownOpen = ref(false)
const dropdownRef = ref(null)

function selectSort(type) {
  isDropdownOpen.value = false
  emit('change-sort', type)
}

// Fermeture au clic extérieur (manuellement ici)
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (dropdownRef.value && !dropdownRef.value.contains(e.target)) {
      isDropdownOpen.value = false
    }
  })
})
</script>
