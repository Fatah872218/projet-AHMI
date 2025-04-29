<template>
  <div class="flex flex-col md:flex-row items-center justify-between p-4 bg-ahmi-bg">
    <div class="text-ahmi-text-primary font-montserrat text-h1 font-bold">
      {{ title }}
    </div>

    <div class="flex items-center space-x-4 mt-4 md:mt-0">
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
        <FilterIcon class="w-6 h-6" />
        <span class="hidden md:block">Filtrer</span>
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { SortDescendingIcon, FilterIcon } from '@heroicons/vue/outline'
import BaseButton from '@/components/base/BaseButton.vue' // Chemin corrigé pour le respect de ta structure

// Props
const props = defineProps({
  title: {
    type: String,
    default: 'Événements à venir',
  },
})
</script>
