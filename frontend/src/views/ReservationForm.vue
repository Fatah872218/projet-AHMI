<!-- src/views/ReservationForm.vue -->
<template>
  <MainLayout>
    <div v-if="loading" class="text-center py-6">Chargement...</div>
    <div v-else-if="error" class="text-red-600 text-center py-6">{{ error }}</div>
    <div v-else class="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h1 class="text-xl font-semibold mb-2">{{ event.titre }}</h1>
      <p class="text-sm text-gray-500 mb-4">
        {{ formatDate(event.dateDebut) }} – {{ event.lieu?.adresse }}
      </p>
      <p class="mb-4">Prix par personne : {{ event.prix }} €</p>
      <p class="mb-4">Places disponibles : {{ placesRestantes }}</p>

      <!-- Sélection nombre de places -->
      <label for="places" class="block font-medium mb-1">Nombre de places</label>
      <CounterInput v-model="nombrePlaces" :max="placesRestantes" />

      <button
        @click="reserver"
        class="mt-6 w-full bg-ahmi-primary text-white py-2 px-4 rounded-xl hover:bg-ahmi-secondary"
        :disabled="nombrePlaces < 1 || nombrePlaces > placesRestantes"
      >
        Valider la réservation
      </button>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getEventById } from '@/services/eventService'
import { createBooking } from '@/services/bookingService'
import { useToast } from 'vue-toastification'
import format from 'date-fns/format'
import fr from 'date-fns/locale/fr'
import MainLayout from '@/layout/MainLayout.vue'
import CounterInput from '@/components/base/CounterInput.vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const event = ref({})
const nombrePlaces = ref(1)
const loading = ref(true)
const error = ref(null)
const placesRestantes = ref(0)

const formatDate = (d) => format(new Date(d), "dd MMMM yyyy 'à' HH:mm", { locale: fr })

onMounted(async () => {
  try {
    const res = await getEventById(route.params.id)
    event.value = res.data
    // 🔢 Simule les places restantes
    placesRestantes.value = event.value.capaciteMax - (event.value.placesReservees || 0)
  } catch (e) {
    console.error(e)
    error.value = "Impossible de charger l'événement"
  } finally {
    loading.value = false
  }
})

const reserver = async () => {
  try {
    await createBooking({
      evenement: event.value._id,
      nombrePlaces: nombrePlaces.value,
    })
    toast.success('Réservation confirmée !')
    router.push('/account')
  } catch (e) {
    toast.error('Erreur lors de la réservation.')
    console.error(e)
  }
}
</script>
