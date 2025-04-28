<template>
  <header
    class="bg-ahmi-primary text-ahmi-text-invert p-4 flex justify-between items-center font-openSans"
  >
    <!-- Logo -->
    <div class="logo text-xl font-bold">
      <img src="@/assets/images/logo.png" alt="Logo" class="h-8" />
    </div>

    <!-- Navigation Desktop -->
    <nav class="hidden md:flex space-x-8">
      <a href="#" class="flex items-center hover:text-ahmi-text-secondary">
        <span>Nos missions</span>
      </a>
      <a href="#" class="flex items-center hover:text-ahmi-text-secondary">
        <span>Nos valeurs</span>
      </a>
      <a href="#" class="flex items-center hover:text-ahmi-text-secondary">
        <span>Nous rejoindre</span>
      </a>
      <a href="#" class="flex items-center hover:text-ahmi-text-secondary">
        <img src="@/assets/images/main-coupe.png" alt="AHMI" class="h-6" />
        <span class="ml-2">A H M I</span>
      </a>
      <a href="#" class="flex items-center hover:text-ahmi-text-secondary">
        <ShoppingCartIcon class="h-6 w-6" />
        <span class="ml-2">Acheter</span>
      </a>
      <a href="#" class="flex items-center hover:text-ahmi-text-secondary">
        <GiftIcon class="h-6 w-6" />
        <span class="ml-2">Dons</span>
      </a>
      <a href="#" class="flex items-center hover:text-ahmi-text-secondary">
        <ChatIcon class="h-6 w-6" />
        <span class="ml-2">Message</span>
      </a>
      <a href="#" class="flex items-center hover:text-ahmi-text-secondary">
        <LoginIcon class="h-6 w-6" />
        <span class="ml-2">Se connecter</span>
      </a>
    </nav>

    <!-- Navigation Mobile -->
    <div class="md:hidden relative">
      <BaseButton
        @click="toggleMenu"
        variant="light"
        size="md"
        :rounded="true"
        class="flex items-center px-3 py-2 border rounded text-ahmi-text-invert border-ahmi-text-invert hover:text-ahmi-text-secondary hover:border-ahmi-text-secondary"
      >
        <MenuIcon class="h-6 w-6" />
      </BaseButton>
      <div
        v-if="menuOpen"
        class="absolute right-0 mt-2 bg-ahmi-primary rounded shadow-lg text-ahmi-text-invert"
      >
        <a href="#" class="block px-4 py-2 text-sm hover:bg-ahmi-surface-secondary">Nos missions</a>
        <a href="#" class="block px-4 py-2 text-sm hover:bg-ahmi-surface-secondary">Nos valeurs</a>
        <a href="#" class="block px-4 py-2 text-sm hover:bg-ahmi-surface-secondary"
          >Nous rejoindre</a
        >
      </div>
    </div>
  </header>
</template>

<script>
import { MenuIcon, ShoppingCartIcon, GiftIcon, ChatIcon, LoginIcon } from '@heroicons/vue/outline'
import BaseButton from '@/components/base/BaseButton.vue'

export default {
  name: 'HeaderComponent',
  components: {
    MenuIcon,
    ShoppingCartIcon,
    GiftIcon,
    ChatIcon,
    LoginIcon,
    BaseButton,
  },
  data() {
    return {
      menuOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
  },
}
</script>

<style scoped>
/* Ajoute des styles spécifiques si nécessaire */
</style>
