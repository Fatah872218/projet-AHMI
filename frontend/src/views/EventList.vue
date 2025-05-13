<template>
  <MainLayout>
    <!-- Barre de recherche -->
    <SearchBarComponent @update:search="updateSearch" />

    <!-- Titre avec options de tri et filtre -->
    <TitleComponent
      title="Liste des événements"
      @change-sort="changeSort"
      @filter="openFilterModal"
    />

    <!-- Indicateur de chargement -->
    <div v-if="loading" class="text-center py-4">Chargement des événements...</div>

    <!-- Liste des événements -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 max-w-screen-xl mx-auto">
      <CardComponent
        v-for="evenement in filteredEvenements"
        :key="evenement._id"
        :evenement="evenement"
      />
    </div>

    <!-- Aucun événement -->
    <div
      v-if="!loading && filteredEvenements.length === 0"
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

// Store Pinia
const store = useEvenementsStore()

// Données réactives
const loading = ref(true)
const searchQuery = ref('')
const sortAsc = ref(false)
const filterCriteria = ref({ date: null, lieu: '' })
const sortType = ref('date') // valeurs possibles : "date", "dayNight", "category"

const isDev = true
const evenements = computed(() =>
  isDev ? store.allEvenements : store.allEvenements.filter((e) => e.statut === 'valide')
)

// Récupération des événements
onMounted(async () => {
  await store.fetchEvenements()
  console.log('Évènements récupérés :', store.allEvenements)
  loading.value = false
})

// Liste filtrée
const filteredEvenements = computed(() => {
  let filtered = evenements.value

  // Recherche
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    filtered = filtered.filter((e) =>
      [e.titre, e.description, e?.lieu?.adresse].some((field) => field?.toLowerCase().includes(q))
    )
  }

  // Filtrage par date
  if (filterCriteria.value.date) {
    filtered = filtered.filter(
      (e) =>
        new Date(e.dateDebut).toDateString() === new Date(filterCriteria.value.date).toDateString()
    )
  }

  // Filtrage par lieu
  if (filterCriteria.value.lieu) {
    filtered = filtered.filter((e) =>
      e.lieu?.adresse?.toLowerCase().includes(filterCriteria.value.lieu.toLowerCase())
    )
  }
  if (sortType.value === 'date') {
    return filtered.sort((a, b) => new Date(b.dateDebut) - new Date(a.dateDebut))
  }

  if (sortType.value === 'dayNight') {
    return filtered.sort((a, b) => {
      const heureA = new Date(a.dateDebut).getHours()
      const heureB = new Date(b.dateDebut).getHours()

      const isJour = (h) => h >= 8 && h < 19
      return isJour(heureB) - isJour(heureA) // trie les événements de jour en haut
    })
  }

  if (sortType.value === 'category') {
    return filtered.sort((a, b) => {
      const catA = a.categorie?.toLowerCase() || ''
      const catB = b.categorie?.toLowerCase() || ''
      return catA.localeCompare(catB)
    })
  }

  // Tri par date
  return filtered.sort((a, b) => {
    const dateA = new Date(a.dateDebut)
    const dateB = new Date(b.dateDebut)
    return sortAsc.value ? dateA - dateB : dateB - dateA
  })
})

// Méthodes
function updateSearch(query) {
  searchQuery.value = query
}

function toggleSortOrder() {
  sortAsc.value = !sortAsc.value
}

function openFilterModal() {
  const date = prompt('Filtrer par date (AAAA-MM-JJ) :')
  const lieu = prompt('Filtrer par lieu :')
  filterCriteria.value = { date, lieu }
}
function changeSort(type) {
  sortType.value = type
}
</script>
