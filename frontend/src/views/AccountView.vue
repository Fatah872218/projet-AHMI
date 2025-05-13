<template>
  <MainLayout>
    <div class="max-w-4xl mx-auto py-8 px-4">
      <h1 class="text-h2 font-h2-bold-weight mb-6 text-ahmi-text-brand">Mon compte</h1>

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
            class="flex justify-between items-center hover:bg-ahmi-accent px-4 py-2 rounded transition"
          >
            <div>
              <div class="font-semibold">{{ event.titre }}</div>
              <div class="text-sm text-ahmi-text-secondary">
                par {{ event.createur?.nom || 'Inconnu' }} – du {{ formatDate(event.dateDebut) }} au
                {{ formatDate(event.dateFin) }}
              </div>
            </div>
            <div class="flex items-center gap-2 ml-4">
              <span
                class="text-xs font-semibold px-2 py-1 rounded"
                :class="getBadgeClass(event.statut)"
              >
                {{ event.statut }}
              </span>
              <template v-if="isAdmin">
                <BaseButton
                  size="sm"
                  variant="secondary"
                  @click="$router.push(`/evenement/${event._id}/admin`)"
                >
                  Gérer
                </BaseButton>
                <BaseButton size="sm" variant="success" @click="changerStatut(event._id, 'valide')">
                  Valider
                </BaseButton>
                <BaseButton
                  size="sm"
                  variant="destructive"
                  @click="changerStatut(event._id, 'rejete')"
                >
                  Rejeter
                </BaseButton>
              </template>
              <template v-else-if="event.createur?.id === user.id">
                <BaseButton
                  size="sm"
                  variant="secondary"
                  @click="$router.push(`/account/proposer-evenement/${event._id}`)"
                >
                  Modifier
                </BaseButton>
                <BaseButton size="sm" variant="ghost" @click="demanderConfirmation(event._id)">
                  Supprimer
                </BaseButton>
              </template>
            </div>
          </li>
        </ul>
      </div>

      <div v-else class="text-center text-ahmi-text-secondary py-12">
        <p class="text-lg mb-2">Aucun événement trouvé pour ce filtre.</p>
        <p class="text-sm">Essayez un autre onglet ou proposez un nouvel événement.</p>
      </div>

      <BaseConfirmDialog
        :visible="modalVisible"
        title="Confirmation de suppression"
        message="Voulez-vous vraiment supprimer cet événement ? Cette action est irréversible."
        @confirm="confirmerSuppression"
        @cancel="modalVisible = false"
      />
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { useRoute } from 'vue-router'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import useAuth from '@/hooks/utiliserAuth.js'
import { getAllEvents, deleteEvent, updateEventStatus } from '@/services/eventService'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseConfirmDialog from '@/components/base/BaseConfirmDialog.vue'
import MainLayout from '@/layout/MainLayout.vue'

const toast = useToast()
const { user } = useAuth()
const route = useRoute()

const evenements = ref([])
const activeTab = ref('tous')
const modalVisible = ref(false)
const eventToDelete = ref(null)

const isAdmin = computed(() => user.value?.role === 'admin')

const tabs = [
  { label: 'Tous', value: 'tous' },
  { label: 'Valide', value: 'valide' },
  { label: 'En attente', value: 'en_attente' },
  { label: 'Rejeté', value: 'rejete' },
]

onMounted(async () => {
  try {
    const res = await getAllEvents()
    const now = new Date()
    evenements.value = (res.data || []).filter((e) => new Date(e.dateFin) > now)
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

const demanderConfirmation = (id) => {
  eventToDelete.value = id
  modalVisible.value = true
}

const confirmerSuppression = async () => {
  try {
    await deleteEvent(eventToDelete.value)
    evenements.value = evenements.value.filter((e) => e._id !== eventToDelete.value)
    toast.success('Supprimé avec succès')
  } catch (e) {
    toast.error('Erreur lors de la suppression')
  } finally {
    modalVisible.value = false
  }
}

const changerStatut = async (id, nouveauStatut) => {
  try {
    await updateEventStatus(id, nouveauStatut)
    const index = evenements.value.findIndex((e) => e._id === id)
    if (index !== -1) evenements.value[index].statut = nouveauStatut
    toast.success(`Événement ${nouveauStatut}`)
  } catch (err) {
    toast.error('Erreur lors de la mise à jour du statut')
    console.error(err)
  }
}
</script>
