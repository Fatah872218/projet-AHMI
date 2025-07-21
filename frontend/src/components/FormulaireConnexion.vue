<!-- src/components/FormulaireConnexion.vue -->
<template>
  <BaseFormWrapper
    title="Connexion"
    description="Connectez-vous à votre compte"
    @submit="handleLogin"
  >
    <!-- Email -->
    <BaseInput
      label="Email"
      type="email"
      v-model="email"
      required
      :error="auth.erreur && auth.erreurChamp === 'email' ? auth.erreur : ''"
    />

    <!-- Password avec œil -->
    <BaseInput
      label="Mot de passe"
      :type="showPassword ? 'text' : 'password'"
      v-model="password"
      required
      :error="auth.erreur && auth.erreurChamp === 'motDePasse' ? auth.erreur : ''"
    >
      <template #icon>
        <MdiEyeOutline class="cursor-pointer" @click="showPassword = !showPassword" />
      </template>
    </BaseInput>

    <!-- Lien mot de passe oublié -->
    <div class="text-right mb-2">
      <RouterLink to="/mot-de-passe-oublie" class="text-ahmi-secondary underline text-sm">
        Mot de passe oublié ?
      </RouterLink>
    </div>

    <!-- Messages -->
    <div v-if="auth.erreur" class="text-ahmi-error font-bold mt-2">
      {{ auth.erreur }}
    </div>

    <!-- Footer : inscription + retour home -->
    <template #footer>
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full gap-2">
        <p class="text-sm">
          Pas encore inscrit ?
          <RouterLink to="/inscription" class="underline text-ahmi-secondary"
            >Créez votre compte</RouterLink
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
import { useAuthStore } from '@/stores/auth'
import BaseFormWrapper from '@/components/base/BaseFormWrapper.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import MdiEyeOutline from '@/components/icons/MdiEyeOutline.vue'
import { HomeIcon } from '@heroicons/vue/outline'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const auth = useAuthStore()
const router = useRouter()

async function handleLogin() {
  await auth.connexion({ email: email.value, motDePasse: password.value })
  if (!auth.erreur) {
    router.push('/')
  }
}
</script>

<style scoped>
/* Ajoute ici un style personnalisé si nécessaire */
</style>
