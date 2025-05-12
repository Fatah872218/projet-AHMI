<template>
  <MainLayout>
    <div class="max-w-4xl mx-auto py-8 px-4">
      <h1 class="text-h2 font-h2-bold-weight mb-6 text-ahmi-text-brand">Mon compte</h1>

      <!-- Bouton proposer un événement -->
      <div class="flex justify-center mb-6">
        <BaseButton
          variant="primary"
          size="lg"
          rounded
          @click="$router.push('/account/proposer-evenement')"
        >
          Proposer un événement
        </BaseButton>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center gap-4 mb-6 flex-wrap">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'px-4 py-2 rounded-full font-semibold flex items-center gap-2 transition',
            activeTab === tab.value
              ? 'bg-ahmi-primary text-white'
              : 'bg-ahmi-accent text-ahmi-text-primary',
          ]"
        >
          <component :is="tab.icon" class="w-5 h-5" />
          {{ tab.label }}
        </button>
      </div>

      <!-- Liste filtrée -->
      <div v-if="evenementsFiltres.length" class="bg-ahmi-surface-primary p-4 rounded-xl shadow-md">
        <ul>
          <li
            v-for="event in evenementsFiltres"
            :key="event._id"
            class="flex justify-between items-center hover:bg-ahmi-accent px-4 py-2 rounded transition cursor-pointer"
            @click="$router.push(`/evenement/${event._id}/admin`)"
          >
            <div>
              <div class="font-semibold">{{ event.titre }}</div>
              <div class="text-sm text-ahmi-text-secondary">
                par {{ event.createur?.nom || 'Inconnu' }} – du {{ formatDate(event.dateDebut) }} au
                {{ formatDate(event.dateFin) }} <br />
                <span class="italic">Places disponibles : {{ event.placesDisponibles }}</span>
              </div>
            </div>
            <div class="flex items-center gap-2 ml-4">
              <span
                class="text-xs font-semibold px-2 py-1 rounded"
                :class="getBadgeClass(event.statut)"
              >
                {{ event.statut }}
              </span>

              <!-- Bouton supprimer -->
              <button
                @click="demanderConfirmation(event._id)"
                class="text-red-600 hover:text-red-800"
              >
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </li>
        </ul>
      </div>

      <!-- Aucun événement trouvé -->
      <div v-else class="text-center text-ahmi-text-secondary py-12">
        <p class="text-lg mb-2">Aucun événement trouvé pour ce filtre.</p>
        <p class="text-sm">Essayez un autre onglet ou proposez un nouvel événement.</p>
      </div>
    </div>
    <!-- MODAL DE CONFIRMATION -->
    <BaseConfirmDialog
      :visible="modalVisible"
      title="Confirmation de suppression"
      message="Voulez-vous vraiment supprimer cet événement ? Cette action est irréversible."
      @confirm="confirmerSuppression"
      @cancel="modalVisible = false"
    />
  </MainLayout>
</template>

<script setup>
import {
  CollectionIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  TrashIcon,
} from '@heroicons/vue/solid'

import { ref, computed, onMounted } from 'vue'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import MainLayout from '@/layout/MainLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { getAllEvents, deleteEvent } from '@/services/eventService'
import BaseConfirmDialog from '@/components/base/BaseConfirmDialog.vue'

const evenements = ref([])
const activeTab = ref('tous')

const tabs = [
  { label: 'Tous', value: 'tous', icon: CollectionIcon },
  { label: 'Valide', value: 'valide', icon: CheckCircleIcon },
  { label: 'En attente', value: 'en_attente', icon: ClockIcon },
  { label: 'Rejeté', value: 'rejete', icon: XCircleIcon },
]

onMounted(async () => {
  try {
    const res = await getAllEvents()
    const events = res.data || []

    // Appels parallèles pour places restantes
    const enriched = await Promise.all(
      events.map(async (event) => {
        try {
          const placesRes = await getPlacesRestantes(event._id)
          return {
            ...event,
            placesDisponibles: placesRes.data?.placesRestantes ?? '—',
          }
        } catch (e) {
          console.warn(`Erreur places restantes pour ${event._id}`, e)
          return { ...event, placesDisponibles: '—' }
        }
      })
    )

    evenements.value = enriched
  } catch (e) {
    console.error('Erreur chargement événements', e)
  }
})

const evenementsFiltres = computed(() => {
  if (activeTab.value === 'tous') return evenements.value
  return evenements.value.filter((e) => e.statut === activeTab.value)
})

const formatDate = (d) => {
  try {
    return format(new Date(d), 'dd MMMM yyyy', { locale: fr })
  } catch {
    return d
  }
}

const getBadgeClass = (statut) => {
  switch (statut) {
    case 'valide':
      return 'bg-green-100 text-green-700'
    case 'rejete':
      return 'bg-red-100 text-red-700'
    case 'en_attente':
    default:
      return 'bg-yellow-100 text-yellow-800'
  }
}

const modalVisible = ref(false)
const eventToDelete = ref(null)

const demanderConfirmation = (id) => {
  eventToDelete.value = id
  modalVisible.value = true
}

const confirmerSuppression = async () => {
  try {
    await deleteEvent(eventToDelete.value)
    evenements.value = evenements.value.filter((e) => e._id !== eventToDelete.value)
  } catch (e) {
    alert('Erreur lors de la suppression.')
    console.error(e)
  } finally {
    modalVisible.value = false
    eventToDelete.value = null
  }
}
</script>
