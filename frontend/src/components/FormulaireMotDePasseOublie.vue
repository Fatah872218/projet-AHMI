<!-- src/components/FormulaireMotDePasseOublie.vue -->
<template>
  <BaseFormWrapper
    title="Réinitialisation du mot de passe"
    description=" étape  1 - Saisissez votre adresse e‑mail "
    @submit="soumettreFormulaire"
  >
    <!-- Champ e‑mail -->
    <BaseInput label="Email" type="email" v-model="email" required :error="errorEmail" />

    <!-- Messages -->
    <div v-if="messageSucces" class="text-ahmi-success font-bold mt-2">{{ messageSucces }}</div>
    <div v-if="messageErreur" class="text-ahmi-error font-bold mt-2">{{ messageErreur }}</div>

    <!-- Liens utiles -->
    <template #footer>
      <div class="flex flex-col gap-2 text-sm text-center">
        <RouterLink to="/connexion" class="underline hover:text-ahmi-secondary">
          ← Retour à la connexion
        </RouterLink>
        <RouterLink
          to="/"
          class="flex items-center justify-center gap-1 underline hover:text-ahmi-secondary"
        >
          <HomeIcon class="w-4 h-4" /> Accueil
        </RouterLink>
        <p class="mt-2 text-xs opacity-70">
          Vous recevrez un e‑mail de <strong>AHMI Support</strong> contenant le lien de
          réinitialisation.
        </p>
      </div>
    </template>
  </BaseFormWrapper>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseFormWrapper from '@/components/base/BaseFormWrapper.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import { HomeIcon } from '@heroicons/vue/outline'

// service front qui appelle POST /auth/mot-de-passe-oublie
import { demanderReinitialisationMotDePasse } from '@/services/serviceAuth'

// eslint-disable-next-line no-unused-vars
const router = useRouter()

const email = ref('')
const errorEmail = ref('')
const messageSucces = ref('')
const messageErreur = ref('')
const sending = ref(false)

async function soumettreFormulaire() {
  errorEmail.value = ''
  messageErreur.value = ''
  messageSucces.value = ''
  sending.value = true

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.value)) {
    errorEmail.value = 'Adresse email invalide.'
    sending.value = false
    return
  }

  try {
    await demanderReinitialisationMotDePasse(email.value) // envoi de l'email
    messageSucces.value = 'Si un compte existe pour cet email, un lien a été envoyé.'
    email.value = '' // on efface après succès
  } catch (err) {
    messageErreur.value = err?.response?.data?.message || 'Une erreur est survenue.'
  } finally {
    sending.value = false
  }
}
</script>

<style scoped>
/* Aucune règle supplémentaire : le style vient des composants de base. */
</style>
