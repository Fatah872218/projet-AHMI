<template>
  <MainLayout>
    <BaseFormWrapper
      :title="isEdit ? 'Modifier un événement' : 'Créer un événement'"
      :loading="loading"
      @submit="handleSubmit"
    >
      <!-- Titre -->
      <BaseInput label="Titre*" v-model="form.titre" required :error="errors.titre" />

      <!-- Description -->
      <BaseInput
        label="Description"
        v-model="form.description"
        type="textarea"
        :error="errors.description"
      />

      <!-- Dates -->
      <BaseInput
        label="Date de début*"
        type="datetime-local"
        v-model="form.dateDebut"
        required
        :error="errors.dateDebut"
      />
      <BaseInput
        label="Date de fin*"
        type="datetime-local"
        v-model="form.dateFin"
        required
        :error="errors.dateFin"
      />

      <!-- Lieu -->
      <BaseInput label="Nom du lieu*" v-model="form.lieu.nom" required :error="errors.lieuNom" />
      <BaseInput
        label="Adresse*"
        v-model="form.lieu.adresse"
        required
        :error="errors.lieuAdresse"
      />

      <!-- Capacité & Prix -->
      <BaseInput
        label="Capacité max*"
        type="number"
        v-model.number="form.capaciteMax"
        required
        min="1"
        :error="errors.capaciteMax"
      />
      <BaseInput
        label="Prix (€)"
        type="number"
        v-model.number="form.prix"
        min="0"
        step="0.01"
        :error="errors.prix"
      />

      <!-- Image & Liens -->
      <BaseInput
        label="URL de l'image"
        type="url"
        v-model="form.imageUrl"
        :error="errors.imageUrl"
      />
      <BaseInput
        label="Site web"
        type="url"
        v-model="form.lienSiteInternet"
        :error="errors.lienSiteInternet"
      />
      <BaseInput
        label="Instagram"
        type="url"
        v-model="form.lienInstagram"
        :error="errors.lienInstagram"
      />

      <!-- Participation & Catégories -->
      <BaseInput
        label="Participation financière"
        v-model="form.participationFinanciere"
        :error="errors.participationFinanciere"
      />
      <!-- Catégories -->
      <div>
        <label class="block text-sm font-medium text-ahmi-text-primary mb-1"> Catégories </label>
        <select
          v-model="form.categories"
          multiple
          class="block w-full rounded border border-ahmi-border-primary bg-ahmi-surface-primary text-ahmi-text-primary"
        >
          <option v-for="cat in categories" :key="cat._id" :value="cat._id">
            {{ cat.nom }}
          </option>
        </select>
        <p v-if="categories.length === 0" class="text-sm text-red-600 mt-2">
          Aucune catégorie disponible. Vérifiez votre connexion ou contactez l'équipe.
        </p>
      </div>

      <!-- Organisateur (prédéfini) -->
      <BaseInput label="Nom de l'organisateur" v-model="form.organisateur.nom" disabled />
      <BaseInput
        label="Email de l'organisateur"
        type="email"
        v-model="form.organisateur.email"
        disabled
      />

      <!-- Boutons -->
      <template #submitLabel>
        {{ isEdit ? 'Modifier' : 'Créer' }}
      </template>
      <template #footer>
        <BaseButton variant="ghost" size="md" @click="resetForm"> Annuler </BaseButton>
      </template>
    </BaseFormWrapper>
  </MainLayout>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'
import BaseFormWrapper from '@/components/base/BaseFormWrapper.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { getEventById, getCategories, createEvent, updateEvent } from '@/services/eventService'
import useAuth from '@/hooks/utiliserAuth.js'
import { useToast } from 'vue-toastification'
import { debounce } from 'lodash'

const { user } = useAuth()
const toast = useToast()

const route = useRoute()
const router = useRouter()
const isEdit = ref(!!route.params.id)
const loading = ref(false)
const categories = ref([])

const form = ref({
  titre: '',
  description: '',
  dateDebut: '',
  dateFin: '',
  lieu: {
    nom: '',
    adresse: '',
    coordonnees: {
      lat: 43.2951,
      lng: -0.3708,
    },
  },
  capaciteMax: null,
  prix: null,
  imageUrl: '',
  lienSiteInternet: '',
  lienInstagram: '',
  participationFinanciere: '',
  categories: [],
  organisateur: { id: '', nom: '', email: '' },
})

const errors = reactive({
  titre: '',
  description: '',
  dateDebut: '',
  dateFin: '',
  lieuNom: '',
  lieuAdresse: '',
  capaciteMax: '',
  prix: '',
  imageUrl: '',
  lienSiteInternet: '',
  lienInstagram: '',
  participationFinanciere: '',
})

function validate() {
  Object.keys(errors).forEach((key) => (errors[key] = ''))
  let ok = true

  if (!form.value.titre || form.value.titre.trim().length < 3) {
    errors.titre = 'Le titre doit contenir au moins 3 caractères.'
    ok = false
  }
  if (form.value.description && form.value.description.length > 500) {
    errors.description = 'La description ne peut pas dépasser 500 caractères.'
    ok = false
  }
  if (!form.value.dateDebut) {
    errors.dateDebut = 'La date de début est requise.'
    ok = false
  }
  if (!form.value.dateFin) {
    errors.dateFin = 'La date de fin est requise.'
    ok = false
  }
  if (form.value.dateDebut && form.value.dateFin && form.value.dateFin <= form.value.dateDebut) {
    errors.dateFin = 'La date de fin doit être après la date de début.'
    ok = false
  }
  if (!form.value.lieu.nom) {
    errors.lieuNom = 'Le nom du lieu est requis.'
    ok = false
  }
  if (!form.value.lieu.adresse) {
    errors.lieuAdresse = 'L’adresse est requise.'
    ok = false
  }
  if (form.value.capaciteMax == null || form.value.capaciteMax < 1) {
    errors.capaciteMax = 'La capacité doit être au moins 1.'
    ok = false
  }
  if (form.value.prix != null && form.value.prix < 0) {
    errors.prix = 'Le prix ne peut pas être négatif.'
    ok = false
  }

  ;['imageUrl', 'lienSiteInternet', 'lienInstagram'].forEach((field) => {
    const val = form.value[field]
    if (val) {
      try {
        new URL(val)
      } catch {
        errors[field] = 'URL invalide.'
        ok = false
      }
    }
  })

  return ok
}

onMounted(async () => {
  if (user.value) {
    form.value.organisateur.id = user.value.id
    form.value.organisateur.nom = user.value.nom || user.value.name
    form.value.organisateur.email = user.value.email
  }

  try {
    const catRes = await getCategories()
    if (Array.isArray(catRes.data)) {
      categories.value = catRes.data
      console.log('Catégories récupérées :', categories.value)
    } else if (Array.isArray(catRes.data.data)) {
      categories.value = catRes.data.data
    } else {
      console.warn('Format de catégories inattendu :', catRes.data)
    }

    if (isEdit.value) {
      try {
        const evRes = await getEventById(route.params.id)
        Object.assign(form.value, evRes.data.data || evRes.data)
      } catch (err) {
        console.error('Erreur chargement événement :', err)
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement des catégories', error)
  }
})

const resetForm = () => {
  router.push(isEdit.value ? '/events' : '/account')
}

async function handleSubmit() {
  if (!validate()) return
  loading.value = true

  try {
    const payload = {
      titre: form.value.titre,
      description: form.value.description,
      dateDebut: form.value.dateDebut,
      dateFin: form.value.dateFin,
      lieu: {
        nom: form.value.lieu.nom,
        adresse: form.value.lieu.adresse,
        coordonnees: {
          lat: form.value.lieu.coordonnees.lat,
          lng: form.value.lieu.coordonnees.lng,
        },
      },
      capaciteMax: form.value.capaciteMax,
      prix: form.value.prix,
      imageUrl: form.value.imageUrl,
      lienSiteInternet: form.value.lienSiteInternet,
      lienInstagram: form.value.lienInstagram,
      participationFinanciere: form.value.participationFinanciere,
      categories: form.value.categories,
      organisateur: {
        nom: form.value.organisateur.nom,
        email: form.value.organisateur.email,
      },
    }

    if (isEdit.value) {
      await updateEvent(route.params.id, payload)
    } else {
      await createEvent(payload)
      toast.success(
        "✅ Merci ! Votre événement a été soumis avec succès et sera vérifié par l'équipe AHMI."
      )
      router.push({
        path: '/account',
        query: { success: isEdit.value ? 'modification' : 'creation' },
      })
    }
  } catch (e) {
    console.error('Erreur lors de la soumission :', e)
    toast.error("Erreur : échec de la soumission de l'événement.")
  } finally {
    loading.value = false
  }
}

async function geolocaliserAdresse() {
  const adresse = form.value.lieu.adresse
  if (!adresse || adresse.length < 5) return

  try {
    const url = `http://localhost:5000/api/geocode?q=${encodeURIComponent(adresse)}`
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'ahmi-app/1.0 (contact@ahmi.fr)',
        'Accept-Language': 'fr',
      },
    })

    const data = await response.json()

    if (Array.isArray(data) && data.length > 0 && data[0].lat && data[0].lon) {
      const coords = data[0]
      form.value.lieu.coordonnees.lat = parseFloat(coords.lat)
      form.value.lieu.coordonnees.lng = parseFloat(coords.lon)
      console.log('Coordonnées mises à jour :', coords)
    } else {
      console.warn('Adresse non trouvée ou données incomplètes.', data)
    }
  } catch (error) {
    console.error('Erreur de géolocalisation :', error)
  }
}

const debouncedGeoloc = debounce(geolocaliserAdresse, 600)

watch(
  () => form.value.lieu.adresse,
  () => {
    debouncedGeoloc()
  }
)
</script>

<style scoped>
/* Styles supplémentaires si nécessaire */
</style>
