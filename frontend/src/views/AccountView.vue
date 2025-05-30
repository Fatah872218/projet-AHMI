<!-- src/views/AccountView.vue -->
<script setup>
import { ref, computed, onMounted, reactive, watch } from 'vue'
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
const placesToUpdate = reactive({})

onMounted(async () => {
  try {
    const res = await getAllEvents()
    console.log('Événements reçus :', res.data)

    console.log(' Tous les événements récupérés :', res.data)
    console.log('🙋 Utilisateur courant :', utilisateur.value)

    evenements.value = res.data.filter((e) => new Date(e.dateFin) > new Date())

    const res2 = await getMyBookings()
    console.log('Réservations récupérées :', res2.data)
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

const estPasse = (evenement) => {
  return new Date(evenement.dateDebut) < new Date()
}
const reservationsRegroupees = computed(() => {
  const map = new Map()

  for (const r of reservations.value) {
    if (!r.evenement || !r.utilisateur) continue

    const key = `${r.utilisateur._id}_${r.evenement._id}`
    if (!map.has(key)) {
      map.set(key, {
        ...r,
        nombrePlaces: r.nombrePlaces,
        idsReservations: [r._id],
      })
    } else {
      const exist = map.get(key)
      exist.nombrePlaces += r.nombrePlaces
      exist.idsReservations.push(r._id)
    }
  }

  return Array.from(map.values())
})
// À chaque fois que la liste des réservations change, on initialise la valeur éditable
watch(
  () => reservationsRegroupees.value,
  (liste) => {
    liste.forEach((r) => {
      const id = r.idsReservations[0]
      // si pas encore défini, on l’initialize à la valeur courante
      if (!(id in placesToUpdate)) {
        placesToUpdate[id] = r.nombrePlaces
      }
    })
  },
  { immediate: true }
)
// 1) on marque la fonction async
const validerPlaces = async (r) => {
  const id = r.idsReservations[0]
  const delta = placesToUpdate[id] - r.nombrePlaces

  try {
    // 2) await pour attendre la fin de la mise à jour
    await modifierPlaces({ ...r, _id: id }, delta)
    // 3) une fois que c'est ok, on remet à jour l'affichage local
    placesToUpdate[id] = r.nombrePlaces + delta
  } catch (e) {
    //  un peu de feedback en cas d'erreur
    console.error('Impossible de valider les places', e)
    toast.error('Échec de la validation des places.')
  }
}

//const estCreateur = (event) => {
// return event.createur === utilisateur.value.id || event.createur?._id === utilisateur.value.id
//}
</script>

<template>
  <MainLayout>
    <div class="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
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
      <div
        class="flex flex-wrap justify-center gap-3 mb-6"
        role="tablist"
        aria-label="Onglets de filtrage"
      >
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="activeTab = tab.value"
          role="tab"
          :aria-selected="activeTab === tab.value"
          :class="[
            'px-4 py-2 text-sm sm:text-base rounded-full font-semibold transition',
            activeTab === tab.value
              ? 'bg-ahmi-primary text-white'
              : 'bg-ahmi-accent text-ahmi-text-primary',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-ahmi-secondary',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Événements -->
      <div v-if="activeTab !== 'reservations' && evenementsFiltres.length">
        <ul class="space-y-3">
          <article
            v-for="event in evenementsFiltres"
            :key="event._id"
            class="bg-white rounded shadow p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          >
            <div>
              <h2 itemprop="name" class="font-semibold">{{ event.titre }}</h2>
              <div class="text-sm text-gray-500">
                <time :datetime="event.dateDebut" itemprop="startDate">
                  {{ formatDate(event.dateDebut) }}
                </time>
                –
                <time :datetime="event.dateFin" itemprop="endDate">
                  {{ formatDate(event.dateFin) }}
                </time>
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
                  {{ event.placesDisponibles === Infinity ? 'illimité' : event.placesDisponibles }}
                  place(s) restante(s)
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
          </article>
        </ul>
      </div>

      <!-- Réservations -->
      <section
        v-else-if="activeTab === 'reservations' && reservations.length"
        aria-labelledby="section-mes-reservations"
      >
        <h2 id="section-mes-reservations" class="sr-only">Mes réservations</h2>
        <ul class="space-y-3">
          <li
            v-for="r in reservationsRegroupees.filter((r) => r?.evenement)"
            :key="r.idsReservations.join('_')"
            :class="[
              'rounded shadow p-4 border-l-4',
              'overflow-hidden break-words',
              estPasse(r.evenement)
                ? 'bg-gray-200 opacity-70 cursor-not-allowed border-gray-400'
                : 'bg-white border-ahmi-primary',
            ]"
          >
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <!-- Bloc infos -->
              <div class="flex-1 min-w-0">
                <router-link
                  :to="`/evenement/${r.evenement?._id}`"
                  class="text-ahmi-primary font-semibold hover:underline"
                >
                  {{ r.evenement?.titre }}
                </router-link>

                <p class="text-sm text-gray-600">{{ r.evenement?.lieu?.adresse }}</p>
                <p class="text-sm text-gray-500">{{ formatDate(r.evenement?.dateDebut) }}</p>
                <p class="text-sm text-gray-600">
                  Réservées : {{ r.nombrePlaces }} / {{ r.evenement?.capaciteMax || 'illimité' }} —
                  <span class="text-green-600">
                    {{
                      r.evenement?.placesDisponibles === Infinity
                        ? 'illimité'
                        : r.evenement?.placesDisponibles
                    }}
                    place(s) restante(s)
                  </span>
                  <span
                    v-if="r.evenement?.placesDisponibles === 0 && r.evenement?.capaciteMax"
                    class="text-red-600"
                  >
                    (Complet)
                  </span>
                </p>

                <p class="text-sm text-gray-500">
                  Utilisateur : <strong>{{ r.utilisateur?.nom || 'inconnu' }}</strong> ({{
                    r.utilisateur?.email
                  }})
                </p>
                <p class="text-xs text-gray-400">Réservation ID : {{ r._id }}</p>
              </div>

              <!-- Bloc actions -->
              <div class="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap justify-end">
                <CounterInput
                  v-model="placesToUpdate[r.idsReservations[0]]"
                  :max="r.evenement.capaciteMax"
                  :disabled="estPasse(r.evenement)"
                />

                <BaseButton
                  variant="primary"
                  size="sm"
                  :disabled="estPasse(r.evenement)"
                  @click="validerPlaces(r)"
                >
                  Valider
                </BaseButton>

                <BaseButton
                  variant="ghost"
                  size="sm"
                  @click="supprimerReservation(r._id)"
                  :disabled="estPasse(r.evenement)"
                  aria-label="Supprimer la réservation"
                  class="focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                  🗑️
                </BaseButton>
              </div>
            </div>
          </li>
        </ul>
      </section>

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
