<template>
  <MainLayout>
    <div class="flex flex-col items-center justify-center py-16 max-w-md mx-auto text-center">
      <h1 class="text-2xl font-semibold mb-4">Activation du compte</h1>

      <div v-if="etat === 'loading'" class="opacity-80">Activation en cours…</div>

      <div v-else-if="etat === 'success'" class="text-green-600 font-medium space-y-2">
        <p>Votre compte est maintenant actif ✅</p>
        <RouterLink to="/connexion" class="underline">Se connecter</RouterLink>
      </div>

      <div v-else class="text-ahmi-error font-bold space-y-4">
        <p>{{ messageErreur }}</p>

        <!-- Renvoi e-mail d’activation -->
        <form class="w-full space-y-2" @submit.prevent="renvoyerMail">
          <label class="text-sm block text-left">Renvoyer l’e-mail d’activation</label>
          <input
            v-model="email"
            type="email"
            placeholder="votre@email.fr"
            class="w-full border rounded px-3 py-2"
            required
          />
          <button
            :disabled="sending"
            class="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
          >
            {{ sending ? 'Envoi…' : 'Renvoyer' }}
          </button>

          <p v-if="messageSucces" class="text-green-600 font-medium mt-2">{{ messageSucces }}</p>
        </form>

        <RouterLink to="/" class="underline block">Retour à l’accueil</RouterLink>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layout/MainLayout.vue'
import { activerCompte, renvoyerActivation } from '@/services/serviceAuth'

const route = useRoute()
const etat = ref('loading') // 'loading' | 'success' | 'error'
const messageErreur = ref('')
const email = ref('')
const sending = ref(false)
const messageSucces = ref('')

onMounted(async () => {
  const code = route.params.code?.toString() || ''
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
    messageErreur.value = err?.response?.data?.message || 'Lien invalide ou expiré.'
  }
})

async function renvoyerMail() {
  messageSucces.value = ''
  sending.value = true
  try {
    await renvoyerActivation(email.value)
    messageSucces.value = 'Si ce compte existe et n’est pas actif, un e-mail vient d’être renvoyé.'
  } catch (e) {
    messageErreur.value = e?.response?.data?.message || 'Impossible de renvoyer l’e-mail.'
  } finally {
    sending.value = false
  }
}
</script>
