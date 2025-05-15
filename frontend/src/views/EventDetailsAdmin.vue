<!-- src/views/EventDetailsAdmin.vue -->
<template>
  <MainLayout>
    <output v-if="loading" class="text-center py-8">Chargement de l'événement...</output>
    <div v-else-if="error" class="text-red-600 text-center py-8" role="alert">{{ error }}</div>
    <section
      v-else
      class="max-w-4xl mx-auto bg-ahmi-bg p-6 rounded-2xl shadow-md"
      aria-label="Détails administrateur de l'événement"
    >
      <!-- Image -->
      <img
        v-if="evenement.imageUrl"
        :src="evenement.imageUrl"
        :alt="evenement.titre"
        class="w-full h-64 object-cover rounded-2xl mb-6"
      />

      <!-- Titre & dates -->
      <h1 class="text-h1 font-h1-bold-family mb-2">{{ evenement.titre }}</h1>
      <p class="text-caption text-ahmi-text-secondary mb-6">
        Du {{ formatDate(evenement.dateDebut) }} au {{ formatDate(evenement.dateFin) }}
      </p>

      <!-- Description -->
      <p class="text-body mb-6 whitespace-pre-line">{{ evenement.description }}</p>

      <!-- Détails -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 class="font-semibold">Adresse</h3>
          <p>{{ evenement.lieu?.adresse || 'Non renseignée' }}</p>
        </div>
        <div>
          <h3 class="font-semibold">Organisateur</h3>
          <p>
            {{ evenement.organisateur?.nom || '—' }}<br />
            <a
              v-if="evenement.organisateur?.email"
              :href="`mailto:${evenement.organisateur.email}`"
              class="underline"
            >
              {{ evenement.organisateur.email }}
            </a>
            <span v-else>Non fourni</span>
          </p>
        </div>
        <div>
          <h3 class="font-semibold">Capacité maximum</h3>
          <p>{{ evenement.capaciteMax || '—' }} personnes</p>
        </div>
        <div>
          <h3 class="font-semibold">Places disponibles</h3>
          <p>{{ evenement.placesDisponibles || '—' }} restantes</p>
        </div>
        <div>
          <h3 class="font-semibold">Participation financière</h3>
          <p>
            {{
              evenement.participationFinanciere != null
                ? evenement.participationFinanciere + ' €'
                : '—'
            }}
          </p>
        </div>
        <div>
          <h3 class="font-semibold mb-2">Catégories</h3>
          <select
            v-model="evenement.categories"
            multiple
            class="w-full border border-gray-300 rounded px-2 py-1"
          >
            <option v-for="cat in allCategories" :key="cat._id" :value="cat._id">
              {{ cat.nom }}
            </option>
          </select>
        </div>

        <div v-if="evenement.lienSiteInternet">
          <h3 class="font-semibold">Site web</h3>
          <a
            :href="evenement.lienSiteInternet"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >
            {{ evenement.lienSiteInternet }}
          </a>
        </div>
        <div v-if="evenement.lienInstagram">
          <h3 class="font-semibold">Instagram</h3>
          <a
            :href="evenement.lienInstagram"
            target="_blank"
            rel="noopener noreferrer"
            class="underline"
          >
            {{ evenement.lienInstagram }}
          </a>
        </div>
      </div>

      <!-- Boutons -->
      <div class="flex justify-between items-center gap-4 mt-8">
        <BaseButton variant="ghost" @click="router.push('/events')">
          ← Retour à la liste des événements
        </BaseButton>

        <div class="flex gap-2">
          <BaseButton :disabled="loading" variant="ghost" @click="rejeter">Rejeter</BaseButton>
          <BaseButton :disabled="loading" variant="primary" @click="valider">Valider</BaseButton>
          <BaseButton
            :disabled="loading"
            variant="secondary"
            class="ml-4"
            @click="sauvegarderCategories"
          >
            Enregistrer les catégories
          </BaseButton>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { format } from 'date-fns'
import fr from 'date-fns/locale/fr'
import BaseButton from '@/components/base/BaseButton.vue'
import MainLayout from '@/layout/MainLayout.vue'
import { updateEventStatus, getCategories, updateEvent } from '@/services/eventService'
import { useToast } from 'vue-toastification'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const evenement = ref(null)
const loading = ref(true)
const error = ref(null)
const allCategories = ref([])

const valider = async () => {
  try {
    await updateEventStatus(evenement.value._id, 'approuve')
    toast.success('Événement validé avec succès.')
    router.push('/events')
  } catch (e) {
    toast.error('Erreur lors de la validation.')
    console.error(e)
  }
}

const rejeter = async () => {
  try {
    await updateEventStatus(evenement.value._id, 'rejete')
    toast.success('Événement rejeté.')
    router.push('/account')
  } catch (e) {
    toast.error('Erreur lors du rejet.')
    console.error(e)
  }
}

const sauvegarderCategories = async () => {
  try {
    await updateEvent(evenement.value._id, {
      categories: evenement.value.categories,
    })
    toast.success('Catégories mises à jour')
  } catch (e) {
    toast.error('Erreur lors de la mise à jour des catégories')
    console.error(e)
  }
}

const formatDate = (d) => {
  if (!d) return '—'
  try {
    const parsed = new Date(d)
    return isNaN(parsed)
      ? d
      : format(parsed, "dd MMMM yyyy 'à' HH:mm", { locale: fr })
  } catch {
    return d
  }
}

onMounted(async () => {
  try {
    const catRes = await getCategories()
    allCategories.value = catRes.data.data || catRes.data

    const res = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/evenements/${route.params.id}`
    )
    evenement.value = res.data.data || res.data
  } catch (e) {
    error.value = "Impossible de charger l'événement."
    console.error(e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
/* Styles supplémentaires si besoin */
</style>
