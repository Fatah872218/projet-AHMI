<template>
  <BaseFormWrapper
    title="Inscription"
    description="Remplissez le formulaire pour créer un compte"
    @submit="soumettreFormulaire"
  >
    <BaseInput label="Nom" v-model="form.nom" required :error="erreurs.nom" />

    <BaseInput label="Email" type="email" v-model="form.email" required :error="erreurs.email" />

    <BaseInput
      label="Mot de passe"
      type="password"
      v-model="form.motDePasse"
      required
      :error="erreurs.motDePasse"
    >
      <template #icon>
        <MdiEyeOutline />
      </template>
    </BaseInput>

    <BaseInput
      label="Confirmation du mot de passe"
      type="password"
      v-model="form.confirmationMotDePasse"
      required
      :error="erreurs.confirmationMotDePasse"
    >
      <template #icon>
        <MdiEyeOutline />
      </template>
    </BaseInput>

    <div v-if="messageSucces" class="text-ahmi-success font-bold mt-2">
      {{ messageSucces }}
    </div>
    <div v-if="messageErreur" class="text-ahmi-error font-bold mt-2">
      {{ messageErreur }}
    </div>

    <template #footer>
      En validant, vous acceptez nos <a href="#" class="underline">conditions générales</a>.

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
        <p class="text-sm">
          déjà inscrit ?
          <RouterLink to="/connexion" class="underline text-ahmi-secondary"
            >connectez-vous à votre compte</RouterLink
          >
        </p>
        <RouterLink to="/" class="flex items-center gap-1 text-sm hover:text-ahmi-secondary">
          <HomeIcon class="h-5 w-5" /> Retour à l'accueil
        </RouterLink>
      </div>
    </template>
  </BaseFormWrapper>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseFormWrapper from '@/components/base/BaseFormWrapper.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import MdiEyeOutline from '@/components/icons/MdiEyeOutline.vue'
import { inscription as inscrireUtilisateur } from '@/services/serviceAuth'

const routeur = useRouter()

const form = ref({
  nom: '',
  email: '',
  motDePasse: '',
  confirmationMotDePasse: '',
})

const erreurs = ref({
  nom: '',
  email: '',
  motDePasse: '',
  confirmationMotDePasse: '',
})

const messageSucces = ref('')
const messageErreur = ref('')

async function soumettreFormulaire() {
  erreurs.value.confirmationMotDePasse = ''
  messageErreur.value = ''
  messageSucces.value = ''

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.value.email)) {
    erreurs.value.email = 'Adresse email invalide.'
    return
  }

  if (form.value.motDePasse !== form.value.confirmationMotDePasse) {
    erreurs.value.confirmationMotDePasse = 'Les mots de passe ne correspondent pas.'
    return
  }

  try {
    await inscrireUtilisateur({
      nom: form.value.nom,
      email: form.value.email,
      motDePasse: form.value.motDePasse,
    })

    messageSucces.value = 'Inscription réussie ! Redirection en cours...'
    setTimeout(() => {
      routeur.push('/connexion')
    }, 2000)
  } catch (erreur) {
    messageErreur.value = erreur.response?.data?.message || 'Une erreur est survenue.'
  }
}
</script>

<style scoped>
/* ajout style plus personnalisé si besoin */
</style>
