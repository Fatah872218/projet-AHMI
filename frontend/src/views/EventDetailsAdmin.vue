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
      <div>
        <label for="image" class="block font-semibold mb-1">image</label>
        <input
          id="image"
          v-model="evenement.imageUrl"
          type="img"
          class="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      <!-- Titre & dates -->
      <h1 class="text-h1 font-h1-bold-family mb-2">{{ evenement.titre }}</h1>
      <div>
        <label for="titre" class="block font-semibold mb-1">Titre</label>
        <input
          id="titre"
          v-model="evenement.titre"
          type="text"
          class="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <!-- Dates -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label class="block font-semibold mb-1">Date de début</label>
          <input
            type="datetime-local"
            v-model="dateDebut"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p class="text-sm text-gray-500 mt-1">Actuelle : {{ formatDate(evenement.dateDebut) }}</p>
        </div>

        <div>
          <label class="block font-semibold mb-1">Date de fin</label>
          <input
            type="datetime-local"
            v-model="dateFin"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
          <p class="text-sm text-gray-500 mt-1">Actuelle : {{ formatDate(evenement.dateFin) }}</p>
        </div>
      </div>

      <!-- Description -->
      <p class="text-body mb-6 whitespace-pre-line">{{ evenement.description }}</p>
      <div>
        <label for="description" class="block font-semibold mb-1">Description</label>
        <textarea
          id="description"
          v-model="evenement.description"
          rows="4"
          class="w-full border border-gray-300 rounded px-3 py-2"
        ></textarea>
      </div>

      <!-- Détails -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 class="font-semibold">Adresse</h3>
          <p>{{ evenement.lieu?.adresse || 'Non renseignée' }}</p>
        </div>
        <!-- Adresse structurée -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label class="block font-semibold mb-1">Rue</label>
            <input
              v-model="adresseRue"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block font-semibold mb-1">Code postal</label>
            <input
              v-model="codePostal"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label class="block font-semibold mb-1">Commune</label>
            <input
              v-model="commune"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
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
          <label for="Capacité Max" class="block font-semibold mb-1">Capacité Max</label>
          <input
            id="capacité Max"
            v-model="evenement.capaciteMax"
            type="number"
            class="w-full border border-gray-300 rounded px-3 py-2"
          />
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
          <div>
            <label for="Site Web" class="block font-semibold mb-1">Site Web</label>
            <input
              id="Site Web"
              v-model="evenement.lienSiteInternet"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
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
          <div>
            <label for="Instagram" class="block font-semibold mb-1">instagram</label>
            <input
              id="instagram"
              v-model="evenement.lienInstagram"
              type="text"
              class="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
      </div>
      <!-- Résumé après sauvegarde -->
      <div v-if="modificationEffectuee" class="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
        Modifications enregistrées :
        <ul class="list-disc list-inside text-sm mt-2">
          <li><strong>Date de début :</strong> {{ formatDate(dateDebut) }}</li>
          <li><strong>Date de fin :</strong> {{ formatDate(dateFin) }}</li>
          <li><strong>Adresse :</strong> {{ adresseRue }}, {{ codePostal }} {{ commune }}</li>
        </ul>
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
          <BaseButton
            :disabled="loading"
            variant="primary"
            class="ml-4"
            @click="sauvegarderModifications"
          >
            Enregistrer les modifications
          </BaseButton>
        </div>
      </div>
    </section>
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

const adresse = ref('')
const adresseRue = ref('')
const codePostal = ref('')
const commune = ref('')

const dateDebut = ref(null)
const dateFin = ref(null)

const modificationEffectuee = ref(false)

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
const sauvegarderModifications = async () => {
  try {
    const lieu = {
      rue: adresseRue.value,
      codePostal: codePostal.value,
      commune: commune.value,
    }

    const payload = {
      titre: evenement.value.titre,
      description: evenement.value.description,
      imageUrl: evenement.value.imageUrl,
      capaciteMax: evenement.value.capaciteMax,
      participationFinanciere: evenement.value.participationFinanciere,
      lienSiteInternet: evenement.value.lienSiteInternet,
      lienInstagram: evenement.value.lienInstagram,
      categories: evenement.value.categories,
      dateDebut: dateDebut.value,
      dateFin: dateFin.value,
      lieu, // injecté séparément
    }

    await updateEvent(evenement.value._id, payload)

    // Mettre à jour localement les champs affichés
    evenement.value.dateDebut = dateDebut.value
    evenement.value.dateFin = dateFin.value
    evenement.value.lieu = lieu

    modificationEffectuee.value = true

    toast.success('Modifications enregistrées avec succès.')
  } catch (e) {
    toast.error("Erreur lors de l'enregistrement.")
    console.error(e)
  }
}

const formatDate = (d) => {
  if (!d) return '—'
  try {
    const parsed = new Date(d)
    return isNaN(parsed) ? d : format(parsed, "dd MMMM yyyy 'à' HH:mm", { locale: fr })
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
    console.log('Réponse backend', res)
    evenement.value = res.data.data || res.data

    adresse.value = evenement.value?.lieu?.adresse || ''
    adresseRue.value = evenement.value?.lieu?.rue || ''
    codePostal.value = evenement.value?.lieu?.codePostal || ''
    commune.value = evenement.value?.lieu?.commune || ''

    dateDebut.value = evenement.value?.dateDebut
    dateFin.value = evenement.value?.dateFin
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
