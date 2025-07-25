<template>
  <MainLayout>
    <div class="flex flex-col items-center justify-center py-16">
      <h1 class="text-2xl font-semibold mb-4">Activation du compte</h1>

      <div v-if="etat === 'loading'">Activation en cours…</div>

      <div v-else-if="etat === 'success'" class="text-green-600 font-medium">
        Votre compte est maintenant actif !
        <RouterLink to="/connexion" class="underline">Connectez-vous</RouterLink>.
      </div>

      <div v-else class="text-red-600 font-medium">
        {{ messageErreur }}
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'
import { activerCompte } from '@/services/serviceAuth' // (2-b ci-dessous)

const route = useRoute()
const etat = ref('loading')
const messageErreur = ref('')

onMounted(async () => {
  const code = route.params.code // ✅  lecture du paramètre d’URL
  if (!code) {
    etat.value = 'error'
    messageErreur.value = 'Lien invalide.'
    return
  }

  try {
    await activerCompte(code)
    etat.value = 'success'
  } catch (err) {
    etat.value = 'error'
    messageErreur.value = err.response?.data?.message || 'Une erreur est survenue.'
  }
})
</script>
