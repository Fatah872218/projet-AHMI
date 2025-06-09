<template>
  <MainLayout>
    <BaseFormWrapper
      :title="isEdit ? 'Modifier un événement' : 'Créer un événement'"
      :loading="loading"
      @submit="handleSubmit"
    >
      <!-- Groupe : Informations essentielles -->
      <BaseInput label="Titre*" v-model="form.titre" required :error="errors.titre" />
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
      <BaseInput
        label="Capacité max*"
        type="number"
        v-model.number="form.capaciteMax"
        min="1"
        required
        :error="errors.capaciteMax"
      />

      <!-- Groupe : Lieu structuré -->
      <h2 class="mt-6 font-semibold text-lg">Lieu</h2>
      <BaseInput label="Rue*" v-model="form.lieu.rue" required :error="errors.lieuRue" />
      <BaseInput
        label="Code postal*"
        v-model="form.lieu.codePostal"
        required
        :error="errors.lieuCP"
      />
      <BaseInput
        label="Commune*"
        v-model="form.lieu.commune"
        required
        :error="errors.lieuCommune"
      />

      <!-- Groupe : Champs complémentaires (déroulable) -->
      <details class="mt-6">
        <summary class="cursor-pointer font-semibold text-base text-blue-600 mb-2">
          Champs complémentaires
        </summary>
        <div class="mt-4 space-y-4">
          <BaseInput
            label="Description"
            v-model="form.description"
            type="textarea"
            :error="errors.description"
          />
          <BaseInput
            label="Prix (€)"
            type="number"
            v-model.number="form.prix"
            min="0"
            step="0.01"
            :error="errors.prix"
          />
          <BaseInput
            label="Participation financière"
            v-model="form.participationFinanciere"
            :error="errors.participationFinanciere"
          />
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
        </div>
      </details>

      <!-- Catégories -->
      <div class="mt-6">
        <label class="block text-sm font-medium text-ahmi-text-primary mb-1">Catégories</label>
        <select
          v-model="form.categories"
          multiple
          class="block w-full rounded border border-ahmi-border-primary bg-ahmi-surface-primary text-ahmi-text-primary"
        >
          <option v-for="cat in categories" :key="cat._id" :value="cat._id">{{ cat.nom }}</option>
        </select>
        <p v-if="categories.length === 0" class="text-sm text-red-600 mt-2">
          Aucune catégorie disponible. Vérifiez votre connexion ou contactez l'équipe.
        </p>
      </div>

      <!-- Organisateur -->
      <h2 class="mt-6 font-semibold text-lg">Organisateur</h2>
      <BaseInput label="Nom" v-model="form.organisateur.nom" />
      <BaseInput label="Email" type="email" v-model="form.organisateur.email" />

      <!-- Boutons -->
      <template #submitLabel>{{ isEdit ? 'Modifier' : 'Créer' }}</template>
      <template #footer>
        <BaseButton variant="ghost" size="md" @click="resetForm"> Annuler </BaseButton>
      </template>
    </BaseFormWrapper>
  </MainLayout>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { debounce } from 'lodash'

import MainLayout from '@/layout/MainLayout.vue'
import BaseFormWrapper from '@/components/base/BaseFormWrapper.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { getEventById, getCategories, createEvent, updateEvent } from '@/services/eventService'
import useAuth from '@/hooks/utiliserAuth.js'

const { utilisateur } = useAuth()
const toast = useToast()
const route = useRoute()
const router = useRouter()

const isEdit = ref(!!route.params.id)
const loading = ref(false)
const categories = ref([])

const imagePreview = ref('')

const form = ref({
  titre: '',
  description: '',
  dateDebut: '',
  dateFin: '',
  capaciteMax: null,
  prix: null,
  participationFinanciere: '',
  imageUrl: '',
  lienSiteInternet: '',
  lienInstagram: '',
  categories: [],
  lieu: {
    rue: '',
    codePostal: '',
    commune: '',
    coordonnees: { lat: 43.2951, lng: -0.3708 },
  },
  organisateur: { nom: '', email: '', id: '' },
})

const errors = reactive({
  titre: '',
  description: '',
  dateDebut: '',
  dateFin: '',
  capaciteMax: '',
  prix: '',
  imageUrl: '',
  lienSiteInternet: '',
  lienInstagram: '',
  lieuRue: '',
  lieuCP: '',
  lieuCommune: '',
  participationFinanciere: '',
})

function validate() {
  Object.keys(errors).forEach((key) => (errors[key] = ''))
  let ok = true

  if (!form.value.titre || form.value.titre.trim().length < 3) {
    errors.titre = 'Le titre doit contenir au moins 3 caractères.'
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

  if (!form.value.lieu.rue) {
    errors.lieuRue = 'La rue est requise.'
    ok = false
  }

  if (!form.value.lieu.codePostal) {
    errors.lieuCP = 'Le code postal est requis.'
    ok = false
  }

  if (!form.value.lieu.commune) {
    errors.lieuCommune = 'La commune est requise.'
    ok = false
  }
  if (!form.value.description || form.value.description.trim().length < 10) {
    errors.description = 'Une description est requise (minimum 10 caractères).'
    ok = false
  }
  if (!form.value.capaciteMax || form.value.capaciteMax < 1) {
    errors.capaciteMax = 'Capacité minimale de 1.'
    ok = false
  }
  if (form.value.prix != null && form.value.prix < 0) {
    errors.prix = 'Le prix ne peut pas être négatif.'
    ok = false
  }
  if (!form.value.categories || form.value.categories.length === 0) {
    toast.error('Veuillez sélectionner au moins une catégorie.')
    ok = false
  }

  ;['imageUrl', 'lienSiteInternet', 'lienInstagram'].forEach((field) => {
    let val = form.value[field]
    if (val) {
      // Ajouter https:// si manquant
      if (!/^https?:\/\//i.test(val)) {
        val = 'https://' + val
      }

      try {
        new URL(val)
        form.value[field] = val // Réinjecte la version corrigée
      } catch {
        errors[field] = 'URL invalide.'
        ok = false
      }
    }
  })

  return ok
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
      capaciteMax: form.value.capaciteMax,
      prix: form.value.prix,
      participationFinanciere: form.value.participationFinanciere,
      imageUrl: form.value.imageUrl,
      lienSiteInternet: form.value.lienSiteInternet,
      lienInstagram: form.value.lienInstagram,
      categories: form.value.categories,
      lieu: {
        rue: form.value.lieu.rue,
        codePostal: form.value.lieu.codePostal,
        commune: form.value.lieu.commune,
        coordonnees: form.value.lieu.coordonnees,
      },
      organisateur: {
        nom: form.value.organisateur.nom,
        email: form.value.organisateur.email,
      },
      createur: form.value.organisateur.id,
    }

    if (isEdit.value) {
      await updateEvent(route.params.id, payload)
      toast.success('Événement mis à jour.')
    } else {
      await createEvent(payload)
      toast.success('Événement soumis avec succès !')
      router.push({ path: '/account', query: { success: 'creation' } })
    }
  } catch (e) {
    console.error(e)
    toast.error('Échec de la soumission.')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  router.push(isEdit.value ? '/events' : '/account')
}

async function geolocaliserAdresse() {
  const adresse = `${form.value.lieu.rue}, ${form.value.lieu.codePostal} ${form.value.lieu.commune}`
  if (!adresse || adresse.length < 5) return

  try {
    const url = `http://localhost:5000/api/geocode?q=${encodeURIComponent(adresse)}`
    const response = await fetch(url)
    const data = await response.json()

    if (Array.isArray(data) && data[0]?.lat && data[0]?.lon) {
      form.value.lieu.coordonnees.lat = parseFloat(data[0].lat)
      form.value.lieu.coordonnees.lng = parseFloat(data[0].lon)
    }
  } catch (error) {
    console.error('Erreur géolocalisation', error)
  }
}

const debouncedGeoloc = debounce(geolocaliserAdresse, 600)
watch(
  () => [form.value.lieu.rue, form.value.lieu.codePostal, form.value.lieu.commune],
  debouncedGeoloc
)

onMounted(async () => {
  if (utilisateur.value) {
    form.value.organisateur.nom = utilisateur.value.nom || utilisateur.value.name || ''
    form.value.organisateur.email = utilisateur.value.email || ''
    form.value.organisateur.id = utilisateur.value.id
  }

  const catRes = await getCategories()
  categories.value = catRes.data.data || catRes.data

  if (isEdit.value) {
    const evRes = await getEventById(route.params.id)
    Object.assign(form.value, evRes.data.data || evRes.data)
  }
})
// eslint-disable-next-line no-unused-vars
const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    toast.error('Seuls les fichiers image sont acceptés.')
    return
  }

  form.value.imageFile = file

  const reader = new FileReader()
  reader.onload = (event) => {
    imagePreview.value = event.target.result
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
details summary {
  list-style: none;
  outline: none;
}
</style>
