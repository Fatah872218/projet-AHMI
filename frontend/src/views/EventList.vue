<template>
  <MainLayout>
    <div v-if="loading" class="text-center py-4">Chargement des événements...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <CardComponent v-for="evenement in evenements" :key="evenement._id" :evenement="evenement" />
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

const store = useEvenementsStore()
const evenements = computed(() => store.allEvenements)
const loading = ref(true)

onMounted(async () => {
  await store.fetchEvenements()
  loading.value = false
})
</script>
