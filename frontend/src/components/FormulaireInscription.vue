<template>
  <!-- Composant pour le formulaire de inscription -->

  <form @submit.prevent="soumettreFormulaire" class="space-y-4 max-w-md mx-auto">
    <div>
      <label for="nom">Nom</label>
      <input v-model="form.nom" id="nom" type="text" class="input" required />
    </div>
    <div>
      <label for="email">Email</label>
      <input v-model="form.email" id="email" type="email" class="input" required />
    </div>
    <div>
      <label for="motDePasse">Mot de passe</label>
      <input v-model="form.motDePasse" id="motDePasse" type="password" class="input" required />
    </div>
    <button type="submit" class="btn-primary">S’inscrire</button>
  </form>
</template>

<script set up>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const form = ref({
  nom: '',
  email: '',
  motDePasse: '',
})

function soumettreFormulaire() {
  auth.inscrire(form.value)
}
/* export default {
  data() {
    return {
      message: 'Bonjour,  formulaire  inscription !',
    }
  },
  methods: {
    // Composant pour le formulaire de inscription.
    greet() {
      console.log(this.message)
    },
  },
}*/
</script>

<style scoped>
/* Composant pour le formulaire de inscription */
</style>
