<!-- src/views/VueReinitialisationMotDePasse.vue -->
<template>
  <main class="flex flex-col items-center justify-center min-h-screen">
    <BaseFormWrapper
      title="Réinitialiser le mot de passe"
      description="Saisissez votre nouveau mot de passe et confirmez-le"
      :loading="loading"
      @submit="onSubmit"
    >
      <!-- BANNERS -->
      <AlertBanner v-if="message" type="success" :message="message" />
      <AlertBanner v-if="erreur && !erreurChamp" type="error" :message="erreur" />

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

      <!-- Messages globaux (fallback accessibilité) -->
      <div v-if="message" class="text-green-600 font-semibold" aria-live="polite">
        {{ message }}
      </div>
      <div v-if="erreur && !erreurChamp" class="text-ahmi-error font-bold" aria-live="polite">
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseFormWrapper from '@/components/base/BaseFormWrapper.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import AlertBanner from '@/components/ui/AlertBanner.vue'
import { reinitialiserMotDePasse } from '@/services/serviceAuth'

const route = useRoute()
const router = useRouter()

// Token depuis query (?token=) ou params (/reinitialiser/:token)
const token = (route.query.token || route.params.token || '').toString()

const motDePasse = ref('')
const confirmationMotDePasse = ref('')
const loading = ref(false)
const message = ref('')
const erreur = ref('')
const erreurChamp = ref('') // 'motDePasse' | 'confirmationMotDePasse' | ''

// Redirection immédiate si token manquant/invalide
onMounted(() => {
  if (!token) router.replace('/connexion?reset=invalid')
})

async function onSubmit() {
  // reset messages
  message.value = ''
  erreur.value = ''
  erreurChamp.value = ''

  // Filet de sécurité côté front
  if (!token) {
    erreur.value = 'Lien invalide ou expiré.'
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
    motDePasse.value = ''
    confirmationMotDePasse.value = ''
    setTimeout(() => router.replace('/connexion?reset=ok'), 1000)
  } catch (e) {
    erreur.value = e?.response?.data?.message || 'Erreur lors de la réinitialisation.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Tout le style est géré par BaseFormWrapper / BaseInput + Tailwind */
</style>
