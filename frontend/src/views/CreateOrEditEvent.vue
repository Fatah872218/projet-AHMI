<!-- frontend/src/views/CreateOrEditEvent.vue -->
<template>
  <MainLayout>
    <form
      @submit.prevent="handleSubmit"
      class="max-w-5xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-6"
    >
      <h1 class="text-2xl font-bold mb-4">
        {{ isEdit ? 'Modifier un événement' : 'Créer un événement' }}
      </h1>

      <!-- Informations essentielles -->
      <div class="space-y-4">
        <BaseInput
          label="Titre"
          v-model="form.titre"
          required
          :error="errors.titre"
          :description="'Nom public de l’événement visible dans les listes.'"
        />

        <div>
          <label for="event-description" class="text-sm font-medium text-ahmi-text-primary">
            Description <span class="text-red-600">*</span>
          </label>

          <textarea
            id="event-description"
            v-model="form.description"
            rows="6"
            class="w-full border rounded px-4 py-2 text-base"
            placeholder="Décrivez brièvement l’événement..."
            :aria-invalid="!!errors.description"
            aria-describedby="description-help"
          ></textarea>
          <p id="description-help" class="text-sm text-gray-500 mt-1">Maximum 500 caractères</p>
          <p
            v-if="errors.description"
            role="alert"
            class="text-caption text-red-600 mt-1 font-openSans"
          >
            {{ errors.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput
            label="Date de début"
            type="datetime-local"
            v-model="form.dateDebut"
            required
            :error="errors.dateDebut"
            :description="'Date et heure de début de l’événement.'"
          />
          <BaseInput
            label="Date de fin"
            type="datetime-local"
            v-model="form.dateFin"
            required
            :error="errors.dateFin"
            :description="'Date et heure de fin (doit être postérieure).'"
          />
        </div>
      </div>

      <!-- Adresse -->
      <fieldset class="border rounded p-4">
        <legend class="text-lg font-semibold">
          Lieu de l’événement <span class="text-red-600">*</span>
        </legend>

        <BaseInput
          label="Rue"
          v-model="form.lieu.rue"
          required
          :error="errors.rue"
          :description="'Ex: 10 rue Victor Hugo'"
        />
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput
            label="Code postal"
            v-model="form.lieu.codePostal"
            required
            :error="errors.codePostal"
          />
          <BaseInput label="Commune" v-model="form.lieu.commune" required :error="errors.commune" />
        </div>
      </fieldset>

      <!-- Options supplémentaires dépliables -->
      <details class="border rounded p-4">
        <summary class="cursor-pointer font-semibold text-ahmi-text-primary mb-2 w-full text-left">
          Options complémentaires
        </summary>
        <div class="mt-4 space-y-4">
          <BaseInput
            label="Capacité maximum"
            type="number"
            v-model.number="form.capaciteMax"
            required
            :error="errors.capaciteMax"
            :description="'Nombre maximal de participants.'"
          />
          <BaseInput
            label="Participation financière (€)"
            type="number"
            v-model.number="form.participationFinanciere"
            :description="'Montant demandé aux participants.'"
          />
          <BaseInput
            label="Prix"
            type="number"
            v-model.number="form.prix"
            :description="'Tarif affiché si applicable. Laisser vide si non concerné.'"
            min="0"
            :error="errors.prix"
          />
          <BaseInput
            label="Image (URL)"
            type="url"
            v-model="form.imageUrl"
            :description="'Coller un lien direct (format jpg/png). Sinon, téléversez une image ci-dessous.'"
          />
          <!--  Uploader une image localement si pas d’URL -->
          <div v-if="!form.imageUrl" class="mt-2">
            <label for="event-image-upload" class="text-sm font-medium text-ahmi-text-primary">
              Ou téléversez une image :
            </label>
            <input
              id="event-image-upload"
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="mt-1 text-sm text-gray-600"
              aria-label="Téléversez une image depuis votre appareil, formats jpg ou png uniquement"
            />

            <!-- Aperçu de l'image si choisie -->
            <div v-if="form.imageFile" class="mt-2">
              <img
                :src="imagePreview"
                alt="Aperçu"
                loading="lazy"
                class="w-full max-w-xs max-h-40 rounded shadow border"
              />
            </div>
          </div>
          <BaseInput
            label="Site Web"
            :description="'Vous pouvez coller une URL avec ou sans https://'"
            type="url"
            v-model="form.lienSiteInternet"
            :error="errors.lienSiteInternet"
          />
          <BaseInput
            label="Lien Instagram"
            type="url"
            v-model="form.lienInstagram"
            :description="'Vous pouvez coller une URL avec ou sans https://'"
            :error="errors.lienInstagram"
          />
        </div>
      </details>

      <!-- Catégories -->
      <div>
        <label for="event-categories" class="block text-sm font-medium mb-1">
          Catégories <span class="text-red-600">*</span>
        </label>
        <select
          id="event-categories"
          v-model="form.categories"
          multiple
          class="w-full border rounded px-4 py-2"
        >
          <option v-for="cat in categories" :key="cat._id" :value="cat._id">
            {{ cat.nom }}
          </option>
        </select>
      </div>

      <!-- Organisateur -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BaseInput label="Nom de l'organisateur" v-model="form.organisateur.nom" disabled />
        <BaseInput label="Email" type="email" v-model="form.organisateur.email" disabled />
      </div>

      <div class="text-xs text-gray-500 mt-4">
        En soumettant ce formulaire, vous acceptez que les informations saisies soient utilisées
        dans le cadre de la gestion des événements AHMI.
        <a href="/mentions-legales" class="underline text-ahmi-accent">En savoir plus</a>
      </div>
      <BaseInput
        type="checkbox"
        v-model="consentement"
        :required="true"
        label="J’accepte la politique de confidentialité (RGPD)"
        :error="errors.consentement"
      />

      <!-- Boutons -->
      <div class="flex flex-col sm:flex-row sm:justify-between gap-4 mt-8">
        <BaseButton variant="ghost" @click="resetForm" class="w-full sm:w-auto">Annuler</BaseButton>
        <BaseButton
          type="submit"
          variant="primary"
          :loading="loading"
          class="w-full sm:w-auto sm:min-w-[120px]"
        >
          {{ isEdit ? 'Modifier' : 'Créer' }}
        </BaseButton>
      </div>
    </form>
  </MainLayout>
</template>
<!-- Composant Vue 3 permettant de créer ou modifier un événement AHMI.
 * - Initialise le formulaire en mode création ou édition.
 * - Valide les données saisies côté client (dont géolocalisation de l'adresse).
 * - Permet de téléverser une image ou de saisir une URL.
 * - Appelle les API REST pour créer ou mettre à jour un événement.
 * - Affiche des notifications selon les retours utilisateurs.
 * - Respecte les contraintes d'accessibilité, de RGPD et d'expérience utilisateur. -->
<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { debounce } from 'lodash'
import sanitizeHtml from 'sanitize-html'

import MainLayout from '@/layout/MainLayout.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { getEventById, getCategories, createEvent, updateEvent } from '@/services/eventService'
import useAuth from '@/hooks/utiliserAuth.js'
import { useEvenementsStore } from '@/stores/evenements'
import { useApi } from '@/utils/useApi'

const { safeCall } = useApi()
// eslint-disable-next-line no-unused-vars
const store = useEvenementsStore()

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
  imageFile: null,
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
  consentement: '',
})

const sanitizeOptions = {
  allowedTags: [],
  allowedAttributes: {},
}

/**
 * Valide les champs du formulaire avant soumission.
 * Remplit l'objet `errors` si des erreurs sont détectées.
 * Retourne `true` si le formulaire est valide, sinon `false`.
 */
const validate = () => {
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
  if (!consentement.value) {
    errors.consentement = 'Vous devez accepter la politique de confidentialité.'
    ok = false
  }

  ;['imageUrl', 'lienSiteInternet', 'lienInstagram'].forEach((field) => {
    let val = form.value[field]
    if (val) {
      if (!/^https?:\/\//i.test(val)) {
        val = 'https://' + val
      }

      try {
        new URL(val)
        form.value[field] = val
      } catch {
        errors[field] = 'URL invalide.'
        ok = false
      }
    }
  })

  return ok
}
// Soumission du formulaire, déclenche la validation puis appelle l'API
const handleSubmit = async () => {
  if (!validate()) return
  loading.value = true

  form.value.titre = sanitizeHtml(form.value.titre, sanitizeOptions)
  form.value.description = sanitizeHtml(form.value.description, sanitizeOptions)

  const success = await saveEvent()

  if (success) {
    toast.success(isEdit.value ? 'Événement mis à jour.' : 'Événement soumis avec succès !')
    router.push({ path: '/account', query: { success: 'creation' } })
  }

  loading.value = false
}

const resetForm = () => {
  router.push(isEdit.value ? '/events' : '/account')
}

/**
 * Tente de géolocaliser automatiquement l’adresse saisie
 * à l’aide d’un appel API distant (back-end Node).
 */
const geolocaliserAdresse = async () => {
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
// Surveille les changements d'adresse et déclenche la géolocalisation avec un délai
watch(
  () => [form.value.lieu.rue, form.value.lieu.codePostal, form.value.lieu.commune],

  debouncedGeoloc
)

// Gère le téléversement d’image locale et son aperçu
const handleImageUpload = (e) => {
  const file = e.target.files[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    toast.error('Seuls les fichiers image sont acceptés.')
    return
  }

  if (file.size > 1_000_000) {
    toast.error('La taille du fichier ne doit pas dépasser 1 Mo.')
    return
  }

  form.value.imageFile = file

  const reader = new FileReader()
  reader.onload = (event) => {
    imagePreview.value = event.target.result
  }
  reader.readAsDataURL(file)
}
// Fonction appelée à l’affichage initial du composant (init formulaire + catégories)
onMounted(async () => {
  if (utilisateur.value) {
    form.value.organisateur.nom = utilisateur.value.nom || utilisateur.value.name || ''
    form.value.organisateur.email = utilisateur.value.email || ''
    form.value.organisateur.id = utilisateur.value.id
  }

  const catRes = await safeCall(() => getCategories())
  console.info('Catégories reçues depuis API :', catRes.data)
  if (!catRes || !catRes.data) {
    toast.error('Impossible de charger les catégories.')
  } else {
    console.info('Catégories reçues depuis API :', catRes.data)
    categories.value = catRes.data.data || catRes.data
  }

  if (isEdit.value) {
    const evRes = await safeCall(() => getEventById(route.params.id))

    if (!evRes || !evRes.data) {
      toast.error('Erreur lors du chargement de l’événement.')
    } else {
      Object.assign(form.value, evRes.data.data)
    }
  }
})
// Sauvegarde ou mise à jour d’un événement via API
const saveEvent = async () => {
  const payload = {
    titre: form.value.titre,
    description: form.value.description,
    dateDebut: form.value.dateDebut,
    dateFin: form.value.dateFin,
    capaciteMax: form.value.capaciteMax,
    prix: form.value.prix != null ? Number(form.value.prix) : null,
    participationFinanciere: Number(form.value.participationFinanciere) || 0,
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

  const res = isEdit.value
    ? await safeCall(() => updateEvent(route.params.id, payload), false)
    : await safeCall(() => createEvent(payload), false)

  return res !== false
}
const consentement = ref(false)
errors.consentement = ''
</script>

<style scoped>
details summary {
  list-style: none;
  outline: none;
}
</style>
