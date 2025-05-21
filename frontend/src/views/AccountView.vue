<!-- src/views/AccountView.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import { useToast } from 'vue-toastification'
import useAuth from '@/hooks/utiliserAuth.js'
import MainLayout from '@/layout/MainLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseConfirmDialog from '@/components/base/BaseConfirmDialog.vue'
import CounterInput from '@/components/base/CounterInput.vue'
import { getAllEvents, deleteEvent, updateEventStatus } from '@/services/eventService'
import { getMyBookings, updateBooking, deleteBooking } from '@/services/bookingService'
import { eventBus } from '@/utils/eventBus'

const { utilisateur } = useAuth()
console.log('Utilisateur connecté :', utilisateur.value)

const toast = useToast()

const evenements = ref([])
const reservations = ref([])
const activeTab = ref('tous')
const modalVisible = ref(false)
const eventToDelete = ref(null)

const isAdmin = computed(() => utilisateur.value?.role === 'admin')

const tabs = [
  { label: 'Tous', value: 'tous' },
  { label: 'Valide', value: 'valide' },
  { label: 'En attente', value: 'en_attente' },
  { label: 'Rejeté', value: 'rejete' },
  { label: 'Mes réservations', value: 'reservations' },
]

onMounted(async () => {
  try {
    const res = await getAllEvents()
    console.log('Événements reçus :', res.data)

    console.log(' Tous les événements récupérés :', res.data)
    console.log('🙋 Utilisateur courant :', utilisateur.value)

    evenements.value = res.data.filter((e) => new Date(e.dateFin) > new Date())

    const res2 = await getMyBookings()
    reservations.value = res2.data
  } catch (e) {
    toast.error('Erreur lors du chargement des données.')
    console.error(e)
  }
  console.clear()
})

const evenementsFiltres = computed(() => {
  if (activeTab.value === 'tous') return evenements.value
  if (['valide', 'rejete', 'en_attente'].includes(activeTab.value)) {
    return evenements.value.filter((e) => e.statut === activeTab.value)
  }
  return []
})

const formatDate = (d) => {
  try {
    return format(new Date(d), 'dd MMMM yyyy', { locale: fr })
  } catch {
    return d
  }
}

const getBadgeClass = (statut) => {
  return (
    {
      valide: 'bg-green-100 text-green-700',
      rejete: 'bg-red-100 text-red-700',
      en_attente: 'bg-yellow-100 text-yellow-800',
    }[statut] || 'bg-gray-100 text-gray-700'
  )
}

const demanderConfirmation = (id) => {
  eventToDelete.value = id
  modalVisible.value = true
}

const confirmerSuppression = async () => {
  try {
    await deleteEvent(eventToDelete.value)
    evenements.value = evenements.value.filter((e) => e._id !== eventToDelete.value)
    toast.success('Événement supprimé.')
  } catch (e) {
    toast.error('Échec de la suppression.')
    console.error(e)
  } finally {
    modalVisible.value = false
  }
}

const changerStatut = async (id, nouveauStatut) => {
  try {
    await updateEventStatus(id, nouveauStatut)
    const i = evenements.value.findIndex((e) => e._id === id)
    if (i !== -1) evenements.value[i].statut = nouveauStatut
    toast.success(`Statut mis à jour.`)
  } catch (e) {
    toast.error('Erreur lors du changement de statut.')
    console.error(e)
  }
}

// ➕➖ Réservation
const modifierPlaces = async (booking, delta) => {
  const nouvelleValeur = booking.nombrePlaces + delta
  if (nouvelleValeur < 1) return

  const total = booking.evenement.capaciteMax
  const dejaReserve = booking.evenement.placesReservees
  const placesRestantes = total - dejaReserve + booking.nombrePlaces

  if (nouvelleValeur > placesRestantes) {
    toast.warning('Pas assez de places disponibles.')
    return
  }

  try {
    await updateBooking(booking._id, { nombrePlaces: nouvelleValeur })
    booking.nombrePlaces = nouvelleValeur
    // Recharge les réservations pour forcer la synchro
    const res2 = await getMyBookings()
    reservations.value = res2.data
    // Met à jour l'événement correspondant
    const i = evenements.value.findIndex((e) => e._id === booking.evenement._id)
    if (i !== -1) {
      evenements.value[i].placesReservees = dejaReserve - booking.nombrePlaces + nouvelleValeur
    }
    // Met à jour l'événement dans la liste des réservations
    const j = reservations.value.findIndex((r) => r._id === booking._id)
    if (j !== -1) {
      reservations.value[j].evenement.placesReservees =
        dejaReserve - booking.nombrePlaces + nouvelleValeur
    }
    toast.success('Réservation mise à jour')
  } catch (e) {
    toast.error('Erreur mise à jour réservation')
    console.error(e)
  }
}

const supprimerReservation = async (id) => {
  try {
    await deleteBooking(id)
    reservations.value = reservations.value.filter((r) => r._id !== id)
    toast.success('Réservation supprimée.')
  } catch (e) {
    toast.error('Erreur suppression.')
    console.error(e)
  }
}
const calculPlacesRestantes = (event) => {
  if (!event || !event.capaciteMax) return 'illimité'
  const reservees = event.placesReservees || 0
  return event.capaciteMax - reservees
}

//const estCreateur = (event) => {
// return event.createur === utilisateur.value.id || event.createur?._id === utilisateur.value.id
//}
</script>

<template>
  <MainLayout>
    <div class="max-w-4xl mx-auto py-8 px-4">
      <h1 class="text-h2 font-bold text-ahmi-text-brand mb-6">Mon compte</h1>

      <!-- Actions -->
      <div class="flex flex-wrap justify-center gap-4 mb-6">
        <BaseButton
          variant="primary"
          size="lg"
          rounded
          @click="$router.push('/account/proposer-evenement')"
        >
          Proposer un événement
        </BaseButton>
        <BaseButton
          v-if="isAdmin"
          variant="secondary"
          size="lg"
          rounded
          @click="$router.push('/admin/categories')"
        >
          Gérer les catégories
        </BaseButton>
      </div>

      <!-- Onglets -->
      <div class="flex flex-wrap justify-center gap-3 mb-6">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          :class="[
            'px-4 py-2 rounded-full font-semibold transition',
            activeTab === tab.value
              ? 'bg-ahmi-primary text-white'
              : 'bg-ahmi-accent text-ahmi-text-primary',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Événements -->
      <div v-if="activeTab !== 'reservations' && evenementsFiltres.length">
        <ul class="space-y-3">
          <li
            v-for="event in evenementsFiltres"
            :key="event._id"
            class="bg-white rounded shadow p-4 flex justify-between items-center"
          >
            <div>
              <div class="font-semibold">{{ event.titre }}</div>
              <div class="text-sm text-gray-500">
                {{ formatDate(event.dateDebut) }} – {{ formatDate(event.dateFin) }}
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span
                class="text-xs font-semibold px-2 py-1 rounded"
                :class="getBadgeClass(event.statut)"
                >{{ event.statut }}</span
              >
              <p class="text-sm text-gray-600">
                Réservées : {{ event.placesReservees || 0 }} /
                {{ event.capaciteMax || 'illimité' }} —
                <span class="text-green-600">
                  {{ calculPlacesRestantes(event) }} place(s) restante(s)
                </span>
              </p>

              <template v-if="isAdmin">
                <BaseButton
                  size="sm"
                  variant="secondary"
                  @click="$router.push(`/evenement/${event._id}/admin`)"
                  >Gérer</BaseButton
                >
              </template>
              <template v-else-if="String(event.createur) === utilisateur.value.id">
                <!-- version robuste : <template v-else-if="estCreateur(event)">
 -->
                <BaseButton
                  size="sm"
                  variant="secondary"
                  @click="$router.push(`/account/proposer-evenement/${event._id}`)"
                  >Modifier</BaseButton
                >
                <BaseButton size="sm" variant="ghost" @click="demanderConfirmation(event._id)"
                  >Supprimer</BaseButton
                >
              </template>
              <template v-if="isAdmin">
                <!-- Gérer les catégories -->
              </template>
            </div>
          </li>
        </ul>
      </div>

      <!-- Réservations -->
      <div v-else-if="activeTab === 'reservations' && reservations.length">
        <ul class="space-y-3">
          <li
            v-for="r in reservations"
            :key="r._id"
            v-if="r.evenement"
            class="bg-white rounded shadow p-4"
          >
            <div class="flex justify-between items-center mb-2">
              <div>
                <strong>{{ r.evenement?.titre }}</strong>
                <p class="text-sm text-gray-600">{{ r.evenement?.lieu?.adresse }}</p>
                <p class="text-sm text-gray-500">{{ formatDate(r.evenement?.dateDebut) }}</p>
                <p class="text-sm text-gray-500">
                  Réservées : {{ r.nombrePlaces }} / {{ r.evenement.capaciteMax || 'illimité' }} —
                  <span class="text-green-600">
                    {{ calculPlacesRestantes(r.evenement) }} place(s) restante(s)
                  </span>
                  <span
                    v-if="calculPlacesRestantes(r.evenement) <= 0 && r.evenement.capaciteMax"
                    class="text-red-600"
                  >
                    (Complet)
                  </span>
                </p>
              </div>
              <div class="flex items-center gap-3">
                <CounterInput v-model="r.nombrePlaces" :max="r.evenement.capaciteMax" />
                <BaseButton variant="secondary" size="sm" @click="modifierPlaces(r, 1)"
                  >+</BaseButton
                >
                <BaseButton variant="secondary" size="sm" @click="modifierPlaces(r, -1)"
                  >−</BaseButton
                >
                <BaseButton variant="ghost" size="sm" @click="supprimerReservation(r._id)">
                  🗑️
                </BaseButton>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div v-else class="text-center text-gray-500 py-12">
        <p>Aucun contenu à afficher dans cet onglet.</p>
      </div>

      <BaseConfirmDialog
        :visible="modalVisible"
        title="Supprimer l'événement"
        message="Confirmez-vous la suppression de cet événement ?"
        @confirm="confirmerSuppression"
        @cancel="modalVisible = false"
      />
    </div>
  </MainLayout>
</template>
