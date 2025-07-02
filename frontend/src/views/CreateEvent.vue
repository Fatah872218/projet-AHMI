<!-- frontend/src/views/CreateEvent.vue -->
<template>
  <MainLayout>
    <form
      @submit.prevent="handleSubmit"
      class="max-w-4xl mx-auto p-6 space-y-6 bg-ahmi-bg rounded-2xl shadow border border-ahmi-border-primary text-ahmi-text-primary"
      novalidate
    >
      <h1 class="text-h1 font-bold font-montserratAlt">Créer un événement</h1>

      <BaseInput
        label="Titre"
        v-model="form.titre"
        :error="errors.titre"
        :description="'Nom public de l’événement visible dans les listes.'"
        required
      />
      <BaseInput
        label="Description"
        v-model="form.description"
        type="textarea"
        :error="errors.description"
        required
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BaseInput
          label="Date de début"
          type="datetime-local"
          v-model="form.dateDebut"
          :error="errors.dateDebut"
          required
        />
        <BaseInput
          label="Date de fin"
          type="datetime-local"
          v-model="form.dateFin"
          :error="errors.dateFin"
          required
        />
      </div>

      <BaseInput
        label="Capacité max"
        type="number"
        v-model.number="form.capaciteMax"
        min="1"
        :error="errors.capaciteMax"
        required
      />

      <fieldset class="border border-ahmi-border-primary rounded p-4 bg-ahmi-surface-primary">
        <legend class="font-semibold text-ahmi-text-brand">Adresse</legend>
        <BaseInput label="Rue" v-model="form.lieu.rue" :error="errors.rue" required />
        <BaseInput
          label="Code Postal"
          v-model="form.lieu.codePostal"
          :error="errors.codePostal"
          required
        />
        <BaseInput label="Commune" v-model="form.lieu.commune" :error="errors.commune" required />
      </fieldset>

      <BaseInput
        label="Image (URL)"
        id="imageUrl"
        type="url"
        v-model="form.imageUrl"
        :error="errors.imageUrl"
      />
      <BaseInput
        label="Lien Site Web"
        id="lienSiteInternet"
        type="url"
        v-model="form.lienSiteInternet"
        :error="errors.lienSiteInternet"
      />
      <BaseInput
        label="Instagram"
        id="lienInstagram"
        type="url"
        v-model="form.lienInstagram"
        :error="errors.lienInstagram"
      />

      <div>
        <label class="block text-sm font-medium text-ahmi-text-primary">Catégories</label>
        <select
          v-model="form.categories"
          multiple
          class="w-full border border-ahmi-border-primary rounded px-4 py-2 bg-ahmi-surface-primary text-ahmi-text-default"
        >
          <option v-for="cat in categories" :key="cat._id" :value="cat._id">
            {{ cat.nom }}
          </option>
        </select>
        <p v-if="errors.categories" class="text-sm text-ahmi-error">{{ errors.categories }}</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BaseInput label="Organisateur" v-model="form.organisateur.nom" disabled />
        <BaseInput label="Email organisateur" v-model="form.organisateur.email" disabled />
      </div>

      <div class="text-sm text-ahmi-text-secondary">
        En soumettant ce formulaire, vous acceptez les conditions RGPD.
      </div>
      <label class="inline-flex items-center text-ahmi-text-primary">
        <input type="checkbox" v-model="consentement" class="mr-2" required />
        J’accepte la politique de confidentialité
      </label>
      <p v-if="errors.consentement" class="text-sm text-ahmi-error">{{ errors.consentement }}</p>

      <BaseButton :disabled="loading" type="submit" variant="primary">{{
        loading ? 'Chargement...' : 'Créer'
      }}</BaseButton>
    </form>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import MainLayout from '@/layout/MainLayout.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { createEvent, getCategories } from '@/services/eventService'
import useAuth from '@/hooks/utiliserAuth.js'

const router = useRouter()
const toast = useToast()
const { utilisateur } = useAuth()

const loading = ref(false)
const categories = ref([])
const consentement = ref(false)

const form = ref({
  titre: '',
  description: '',
  dateDebut: '',
  dateFin: '',
  capaciteMax: null,
  imageUrl: '',
  lienSiteInternet: '',
  lienInstagram: '',
  categories: [],
  lieu: { rue: '', codePostal: '', commune: '', coordonnees: {} },
  organisateur: { nom: '', email: '', id: '' },
})

const errors = ref({
  titre: '',
  description: '',
  dateDebut: '',
  dateFin: '',
  capaciteMax: '',
  rue: '',
  codePostal: '',
  commune: '',
  imageUrl: '',
  lienSiteInternet: '',
  lienInstagram: '',
  categories: '',
  consentement: '',
})

onMounted(async () => {
  if (utilisateur.value) {
    form.value.organisateur.nom = utilisateur.value.nom || ''
    form.value.organisateur.email = utilisateur.value.email || ''
    form.value.organisateur.id = utilisateur.value.id || ''
  }
  const res = await getCategories()
  categories.value = res.data.data || res.data
})

const handleSubmit = async () => {
  if (!validate()) return

  const confirm = window.confirm('Confirmez-vous la création de cet événement ?')
  if (!confirm) return

  loading.value = true

  try {
    const payload = { ...form.value }
    await createEvent(payload)
    toast.success('Événement créé !')
    router.push('/account')
  } catch (e) {
    toast.error('Erreur lors de la création')
  } finally {
    loading.value = false
  }
}

const validate = () => {
  Object.keys(errors.value).forEach((k) => (errors.value[k] = ''))
  let valid = true

  if (!form.value.titre || form.value.titre.length < 3) {
    errors.value.titre = 'Minimum 3 caractères.'
    valid = false
  }
  if (!form.value.description || form.value.description.length < 10) {
    errors.value.description = 'Minimum 10 caractères.'
    valid = false
  }
  if (!form.value.dateDebut) {
    errors.value.dateDebut = 'Date requise.'
    valid = false
  }
  if (!form.value.dateFin) {
    errors.value.dateFin = 'Date requise.'
    valid = false
  }
  if (form.value.dateFin <= form.value.dateDebut) {
    errors.value.dateFin = 'Doit être après la date de début.'
    valid = false
  }
  if (!form.value.capaciteMax || form.value.capaciteMax < 1) {
    errors.value.capaciteMax = 'Minimum 1.'
    valid = false
  }
  if (!form.value.lieu.rue) (errors.value.rue = 'Champ requis.'), (valid = false)
  if (!form.value.lieu.codePostal) (errors.value.codePostal = 'Champ requis.'), (valid = false)
  if (!form.value.lieu.commune) (errors.value.commune = 'Champ requis.'), (valid = false)
  if (!form.value.categories.length)
    (errors.value.categories = 'Au moins une catégorie.'), (valid = false)
  if (!consentement.value) (errors.value.consentement = 'Consentement requis.'), (valid = false)

  return valid
}
</script>
