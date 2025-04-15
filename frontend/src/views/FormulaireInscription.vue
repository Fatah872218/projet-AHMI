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

    <template #footer>
      En validant, vous acceptez nos <a href="#" class="underline">conditions générales</a>.
    </template>
  </BaseFormWrapper>
</template>

<script setup>
import { ref } from 'vue'
import BaseFormWrapper from '@/components/base/BaseFormWrapper.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import MdiEyeOutline from '@/components/icons/MdiEyeOutline.vue'
import { useAuthStore } from '@/stores/auth'
import { inscrireUtilisateur } from '@/services/serviceAuth'

const envoyerFormulaire = async () => {
  try {
    await inscrireUtilisateur(formulaire)
    // Rediriger l'utilisateur ou afficher un message de succès
  } catch (erreur) {
    console.error(erreur)
  }
}

const auth = useAuthStore()

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

function soumettreFormulaire() {
  // Validation de correspondance des mots de passe avant soumission
  if (form.value.motDePasse !== form.value.confirmationMotDePasse) {
    erreurs.value.confirmationMotDePasse = 'Les mots de passe ne correspondent pas.'
    return
  }

  erreurs.value.confirmationMotDePasse = ''
  auth.inscrire(form.value)
}
</script>
