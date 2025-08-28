<!-- src/views/VueReinitialisationMotDePasse.vue -->
<template>
  <main class="flex flex-col items-center justify-center min-h-screen">
    <BaseFormWrapper
      title="Réinitialiser le mot de passe"
      description="Saisissez votre nouveau mot de passe et confirmez-le"
      :loading="loading"
      @submit="onSubmit"
    >
      <!-- Nouveau mot de passe -->
      <BaseInput
        label="Nouveau mot de passe"
        type="password"
        v-model="motDePasse"
        required
        :error="erreurChamp === 'motDePasse' ? erreur : ''"
        description="8 caractères minimum, idéalement une majuscule, un chiffre, un symbole."
      />

      <!-- Confirmation -->
      <BaseInput
        label="Confirmation du mot de passe"
        type="password"
        v-model="confirmationMotDePasse"
        required
        :error="erreurChamp === 'confirmationMotDePasse' ? erreur : ''"
      />

      <!-- Messages globaux -->
      <div v-if="message" class="text-green-600 font-semibold">
        {{ message }}
      </div>
      <div v-if="erreur && !erreurChamp" class="text-ahmi-error font-bold">
        {{ erreur }}
      </div>

      <!-- Bouton submit -->
      <template #submitLabel> Réinitialiser </template>

      <!-- Footer : retour -->
      <template #footer>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
          <RouterLink to="/connexion" class="underline text-ahmi-secondary text-sm">
            ← Retour à la connexion
          </RouterLink>
          <RouterLink to="/" class="flex items-center gap-1 text-sm hover:text-ahmi-secondary">
            Accueil
          </RouterLink>
        </div>
      </template>
    </BaseFormWrapper>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseFormWrapper from '@/components/base/BaseFormWrapper.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import { reinitialiserMotDePasse } from '@/services/serviceAuth'

const route = useRoute()
const router = useRouter()

// Token depuis /reinitialiser?token=... OU /reinitialiser/:token
const token = (route.query.token || route.params.token || '').toString()

const motDePasse = ref('')
const confirmationMotDePasse = ref('')
const loading = ref(false)
const message = ref('')
const erreur = ref('')
const erreurChamp = ref('') // 'motDePasse' | 'confirmationMotDePasse' | ''

async function onSubmit() {
  // reset messages
  message.value = ''
  erreur.value = ''
  erreurChamp.value = ''

  // validations rapides côté front
  if (!token) {
    erreur.value = 'Lien invalide : token manquant.'
    return
  }
  if (!motDePasse.value || motDePasse.value.length < 8) {
    erreur.value = 'Le mot de passe doit contenir au moins 8 caractères.'
    erreurChamp.value = 'motDePasse'
    return
  }
  if (motDePasse.value !== confirmationMotDePasse.value) {
    erreur.value = 'Les mots de passe ne correspondent pas.'
    erreurChamp.value = 'confirmationMotDePasse'
    return
  }

  loading.value = true
  try {
    await reinitialiserMotDePasse(token, motDePasse.value, confirmationMotDePasse.value)
    message.value = 'Mot de passe réinitialisé. Redirection vers la connexion…'
    // nettoyage local
    motDePasse.value = ''
    confirmationMotDePasse.value = ''
    setTimeout(() => router.replace('/connexion'), 1200)
  } catch (e) {
    // remonte l’éventuel message backend (ex: lien expiré)
    erreur.value = e?.response?.data?.message || 'Erreur lors de la réinitialisation.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Tout le style vient de BaseFormWrapper / BaseInput + Tailwind */
</style>
