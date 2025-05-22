<template>
  <MainLayout>
    <div class="max-w-xl mx-auto py-10">
      <h1 class="text-h2 font-bold mb-6">Gestion des Catégories</h1>

      <!-- Formulaire de création -->
      <form @submit.prevent="creerCategorie" class="flex gap-2 mb-6">
        <input
          v-model="nouvelleCategorie"
          type="text"
          placeholder="Nom de la catégorie"
          class="flex-1 border p-2 rounded"
          required
        />
        <BaseButton type="submit" variant="primary">Créer</BaseButton>
      </form>

      <!-- Liste des catégories -->
      <div v-if="categories.length">
        <h2 class="text-lg font-semibold mb-2">Catégories existantes :</h2>
        <ul class="space-y-2">
          <li v-for="cat in categories" :key="cat._id" class="flex items-center gap-2">
            <template v-if="categorieEnEdition === cat._id">
              <input v-model="nomEdition" type="text" class="border px-2 py-1 rounded flex-1" />
              <BaseButton variant="primary" size="sm" @click="enregistrerEdition">💾</BaseButton>
              <BaseButton variant="ghost" size="sm" @click="categorieEnEdition = null"
                >❌</BaseButton
              >
            </template>
            <template v-else>
              <span class="flex-1">{{ cat.nom }}</span>
              <BaseButton variant="secondary" size="sm" @click="demarrerEdition(cat)"
                >✏️</BaseButton
              >
              <BaseButton variant="ghost" size="sm" @click="demanderSuppression(cat._id)"
                >🗑️</BaseButton
              >
            </template>
          </li>
        </ul>
      </div>
      <p v-else>Aucune catégorie trouvée.</p>
    </div>
  </MainLayout>
  <BaseConfirmDialog
    :visible="modalSuppressionVisible"
    title="Supprimer cette catégorie"
    message="Confirmez-vous la suppression de cette catégorie ?"
    @confirm="confirmerSuppressionCategorie"
    @cancel="modalSuppressionVisible = false"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MainLayout from '@/layout/MainLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import api from '@/services/api' // ou ton chemin relatif

const categories = ref([])
const nouvelleCategorie = ref('')
const categorieEnEdition = ref(null) // contiendra l'_id de la catégorie à éditer
const nomEdition = ref('') // contiendra la valeur modifiable
const modalSuppressionVisible = ref(false)
const categorieASupprimer = ref(null)

const chargerCategories = async () => {
  try {
    const res = await api.get('/categories')
    categories.value = res.data
  } catch (e) {
    console.error('Erreur chargement catégories', e)
  }
}

const creerCategorie = async () => {
  if (!nouvelleCategorie.value.trim()) return
  try {
    const res = await api.post('/categories', { nom: nouvelleCategorie.value })
    categories.value.push(res.data)
    nouvelleCategorie.value = ''
  } catch (e) {
    console.error('Erreur création catégorie', e)
  }
}
const demarrerEdition = (cat) => {
  categorieEnEdition.value = cat._id
  nomEdition.value = cat.nom
}
const enregistrerEdition = async () => {
  try {
    const res = await api.put(`/categories/${categorieEnEdition.value}`, { nom: nomEdition.value })
    const index = categories.value.findIndex((c) => c._id === categorieEnEdition.value)
    if (index !== -1) categories.value[index] = res.data
    categorieEnEdition.value = null
    nomEdition.value = ''
  } catch (e) {
    console.error('Erreur modification catégorie', e)
  }
}
const demanderSuppression = (categorieId) => {
  categorieASupprimer.value = categorieId
  modalSuppressionVisible.value = true
}

const confirmerSuppressionCategorie = async () => {
  try {
    await api.delete(`/categories/${categorieASupprimer.value}`)
    categories.value = categories.value.filter((c) => c._id !== categorieASupprimer.value)
    modalSuppressionVisible.value = false
    categorieASupprimer.value = null
  } catch (e) {
    console.error('Erreur suppression catégorie', e)
  }
}

onMounted(() => {
  chargerCategories()
})
</script>
