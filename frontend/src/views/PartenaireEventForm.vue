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
      <div>
        <label
          class="block text-sm md:text-base font-medium text-ahmi-text-primary font-montserrat mb-xs"
        >
          Catégories
        </label>
        <select
          v-model="form.categories"
          multiple
          class="block w-full rounded border border-ahmi-border-primary bg-ahmi-surface-primary text-ahmi-text-primary font-openSans text-body focus:ring-2 focus:ring-ahmi-primary focus:outline-none py-xs px-sm md:py-sm md:px-md"
        >
          <option v-for="cat in categories" :key="cat._id" :value="cat._id">
            {{ cat.nom }}
          </option>
        </select>
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
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'
import BaseFormWrapper from '@/components/base/BaseFormWrapper.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { getEventById, getCategories, createEvent, updateEvent } from '@/services/eventService'
import useAuth from '@/hooks/utiliserAuth.js'

// Récupérer l’utilisateur connecté
const { user } = useAuth()

const route = useRoute()
const router = useRouter()
const isEdit = ref(!!route.params.id)
const loading = ref(false)

// Form data
const form = ref({
  titre: '',
  description: '',
  dateDebut: '',
  dateFin: '',
  lieu: { nom: '', adresse: '' },
  capaciteMax: null,
  prix: null,
  imageUrl: '',
  lienSiteInternet: '',
  lienInstagram: '',
  participationFinanciere: '',
  categories: [],
  organisateur: { id: '', nom: '', email: '' },
})

// Erreurs de validation
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

// Validation simple des champs
function validate() {
  // reset
  Object.keys(errors).forEach((key) => (errors[key] = ''))
  let ok = true

  // Titre
  if (!form.value.titre || form.value.titre.trim().length < 3) {
    errors.titre = 'Le titre doit contenir au moins 3 caractères.'
    ok = false
  }

  // Description (max 500)
  if (form.value.description && form.value.description.length > 500) {
    errors.description = 'La description ne peut pas dépasser 500 caractères.'
    ok = false
  }

  // Dates
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

  // Lieu
  if (!form.value.lieu.nom) {
    errors.lieuNom = 'Le nom du lieu est requis.'
    ok = false
  }
  if (!form.value.lieu.adresse) {
    errors.lieuAdresse = 'L’adresse est requise.'
    ok = false
  }

  // Capacite
  if (form.value.capaciteMax == null || form.value.capaciteMax < 1) {
    errors.capaciteMax = 'La capacité doit être au moins 1.'
    ok = false
  }

  // Prix
  if (form.value.prix != null && form.value.prix < 0) {
    errors.prix = 'Le prix ne peut pas être négatif.'
    ok = false
  }

  // URLs (simple test)
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
  // Préremplir le créateur
  if (user.value) {
    form.value.organisateur.id = user.value.id
    form.value.organisateur.nom = user.value.nom || user.value.name
    form.value.organisateur.email = user.value.email
  }

  // Charger catégories et données pour édition
  const catRes = await getCategories()
  categories.value = catRes.data.data || catRes.data

  if (isEdit.value) {
    const evRes = await getEventById(route.params.id)
    Object.assign(form.value, evRes.data.data || evRes.data)
  }
})

const resetForm = () => {
  router.push(isEdit.value ? '/events' : '/account')
}

async function handleSubmit() {
  if (!validate()) return
  loading.value = true
  try {
    const payload = { ...form.value, createdBy: form.value.organisateur.id }
    console.log('Payload:', payload) //
    if (isEdit.value) {
      await updateEvent(route.params.id, payload)
    } else {
      await createEvent(payload)
    }
    router.push('/events')
  } catch (e) {
    console.error('Erreur lors de la soumission :', e)
    alert("Impossible de soumettre l'événement.")
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Styles supplémentaires si nécessaire */
</style>
