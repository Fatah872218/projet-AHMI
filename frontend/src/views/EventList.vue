<!-- src/view/EventList.vue -->
<template>
  <MainLayout>
    <SearchBarComponent @update:search="updateSearch" />
    <TitleComponent
      title="Liste des événements"
      @sort="toggleSortOrder"
      @filter="openFilterModal"
    />

    <div v-if="loading" class="text-center py-4">Chargement des événements...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-screen-xl mx-auto">
      <CardComponent
        v-for="evenement in filteredEvenements"
        :key="evenement._id"
        :evenement="evenement"
      />
    </div>

    <div
      v-if="!loading && evenements.length === 0"
      class="text-center mt-4 text-ahmi-text-secondary"
    >
      Aucun événement trouvé.
    </div>
  </MainLayout>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useEvenementsStore } from '@/stores/evenements'
import CardComponent from '@/components/base/CardComponent.vue'
import MainLayout from '@/layout/MainLayout.vue'
import SearchBarComponent from '@/components/base/SearchBarComponent.vue'
import TitleComponent from '@/components/base/TitleComponent.vue'

const store = useEvenementsStore()
const evenements = computed(() => store.allEvenements)
const loading = ref(true)

onMounted(async () => {
  await store.fetchEvenements()
  loading.value = false
})
</script>
