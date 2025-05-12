<!-- src/views/EventDetailsAdmin.vue -->
<template>
  <MainLayout>
    <div v-if="loading" class="text-center py-8">Chargement de l'événement...</div>
    <div v-else-if="error" class="text-red-600 text-center py-8">{{ error }}</div>
    <div v-else class="max-w-4xl mx-auto bg-ahmi-bg p-6 rounded-2xl shadow-md">
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

      <!-- Description complète -->
      <p class="text-body mb-6 whitespace-pre-line">{{ evenement.description }}</p>

      <!-- Détails supplémentaires en grille -->
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
        <!-- <div>
          <h3 class="font-semibold">Prix</h3>
          <p>{{ evenement.prix != null ? evenement.prix + ' €' : '—' }}</p>
        </div> -->
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
        <div v-if="evenement.categories?.length">
          <h3 class="font-semibold">Catégories</h3>
          <ul class="list-disc list-inside">
            <li v-for="cat in evenement.categories" :key="cat._id">{{ cat.nom }}</li>
          </ul>
        </div>
        <div v-if="evenement.lienSiteInternet">
          <h3 class="font-semibold">Site web</h3>
          <a :href="evenement.lienSiteInternet" target="_blank" rel="noopener" class="underline">
            {{ evenement.lienSiteInternet }}
          </a>
        </div>
        <div v-if="evenement.lienInstagram">
          <h3 class="font-semibold">Instagram</h3>
          <a :href="evenement.lienInstagram" target="_blank" rel="noopener" class="underline">
            {{ evenement.lienInstagram }}
          </a>
        </div>
      </div>

      <!-- Boutons -->
      <div class="flex justify-end">
        <BaseButton variant="primary" @click="valider">Valider</BaseButton>
        <BaseButton variant="ghost" @click="rejeter">Rejeter</BaseButton>
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
import { updateEventStatus } from '@/services/eventService'

const valider = async () => {
  await updateEventStatus(evenement.value._id, 'valide')
  router.push('/events')
}

const rejeter = async () => {
  await updateEventStatus(evenement.value._id, 'rejete')
  router.push('/account')
}

const route = useRoute()
const router = useRouter()

const evenement = ref(null)
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
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

const formatDate = (d) => {
  if (!d) return '—'
  try {
    return format(new Date(d), "dd MMMM yyyy 'à' HH:mm", { locale: fr })
  } catch {
    return d
  }
}

/*function reserve() {
  router.push(`/evenement/${route.params.id}/reserver`)
}*/
</script>

<style scoped>
/* Styles supplémentaires si besoin */
</style>
