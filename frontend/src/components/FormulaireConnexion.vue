<template>
  <form @submit.prevent="handleLogin" class="flex flex-col gap-4">
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Mot de passe" required />
    <button type="submit" class="btn bg-primary text-white">Connexion</button>
    <p v-if="auth.erreur" class="text-red-500">{{ auth.erreur }}</p>
  </form>
  <!-- Composant pour le formulaire de connexion -->
</template>

<script set up>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const auth = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  await auth.login({ email: email.value, password: password.value })
  if (!auth.erreur) {
    router.push('/') // ou une route sécurisée
  }
}
/*
export default {
  data() {
    return {
      message: 'Bonjour, monde !',
    }
  },
  methods: {
    // Composant pour le formulaire de connexion.
    greet() {
      console.log(this.message)
    },
  },
}
*/
</script>

<style scoped>
/* Composant pour le formulaire de connexion */
p {
  color: blue;
}
</style>
