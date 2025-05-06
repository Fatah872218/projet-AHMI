<!-- src/components/HeaderComponent.vue -->
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
      <a
        href="#"
        class="flex items-center text-ahmi-text-invert hover:text-ahmi-secondary transition-colors"
      >
        <span>Nos missions</span>
      </a>
      <a
        href="#"
        class="flex items-center text-ahmi-text-invert hover:text-ahmi-secondary transition-colors"
      >
        <span>Nos valeurs</span>
      </a>
      <a
        href="#"
        class="flex items-center text-ahmi-text-invert hover:text-ahmi-secondary transition-colors"
      >
        <span>Nous rejoindre</span>
      </a>
      <a
        href="#"
        class="flex items-center text-ahmi-text-invert hover:text-ahmi-secondary transition-colors"
      >
        <img src="@/assets/images/main-coupe.png" alt="AHMI" class="h-6" />
        <span class="ml-2">A H M I</span>
      </a>
      <a
        href="/events"
        class="flex items-center text-ahmi-text-invert hover:text-ahmi-secondary transition-colors"
      >
        <CalendarIcon class="h-6 w-6" />
        <span class="ml-2 hidden md:inline">Événements</span>
      </a>

      <a
        href="#"
        class="flex items-center text-ahmi-text-invert hover:text-ahmi-secondary transition-colors"
      >
        <ShoppingCartIcon class="h-6 w-6" />
        <span class="ml-2">Acheter</span>
      </a>
      <a
        href="#"
        class="flex items-center text-ahmi-text-invert hover:text-ahmi-secondary transition-colors"
      >
        <GiftIcon class="h-6 w-6" />
        <span class="ml-2">Dons</span>
      </a>
      <a
        href="#"
        class="flex items-center text-ahmi-text-invert hover:text-ahmi-secondary transition-colors"
      >
        <ChatIcon class="h-6 w-6" />
        <span class="ml-2">Message</span>
      </a>
      <a
        href="#"
        class="flex items-center text-ahmi-text-invert hover:text-ahmi-secondary transition-colors"
      >
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
        <a
          href="/events"
          class="block px-4 py-2 text-sm hover:bg-ahmi-surface-secondary items-center"
        >
          <CalendarIcon class="h-5 w-5 mr-2" />
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import {
  CalendarIcon,
  MenuIcon,
  ShoppingCartIcon,
  GiftIcon,
  ChatIcon,
  LoginIcon,
} from '@heroicons/vue/outline'
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
