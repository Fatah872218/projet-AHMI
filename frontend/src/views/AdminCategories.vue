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
        <ul class="list-disc list-inside">
          <li v-for="cat in categories" :key="cat._id">{{ cat.nom }}</li>
        </ul>
      </div>
      <p v-else>Aucune catégorie trouvée.</p>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import MainLayout from '@/layout/MainLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import api from '@/services/api' // ou ton chemin relatif

const categories = ref([])
const nouvelleCategorie = ref('')

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

onMounted(() => {
  chargerCategories()
})
</script>
