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
    <nav class="hidden md:flex space-x-8 relative">
      <!-- Menu déroulant AHMI -->
      <!-- Menu déroulant AHMI -->
      <div class="relative group">
        <div
          class="flex items-center cursor-pointer text-ahmi-text-invert hover:text-ahmi-secondary transition-colors"
        >
          <img src="@/assets/images/main-coupe.png" alt="AHMI" class="h-6" />
          <span class="ml-2">A H M I</span>
          <ChevronDownIcon class="h-4 w-4 ml-1 mt-0.5" />
        </div>

        <!-- Sous-menu au survol  -->
        <div
          class="absolute left-0 mt-2 w-48 bg-ahmi-surface-primary text-ahmi-text-invert shadow-lg rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50"
        >
          <a href="#" class="block px-4 py-2 hover-link-accessible"> Nos missions </a>
          <a href="#" class="block px-4 py-2 hover-link-accessible"> Nos valeurs </a>
          <a href="#" class="block px-4 py-2 hover-link-accessible"> Nous rejoindre </a>
        </div>
      </div>

      <!-- Autres rubriques -->
      <a href="/events" class="flex items-center hover-link-accessible-desktop">
        <CalendarIcon class="w-6 h-6 text-gray-500" />
        <span class="ml-2 hidden md:inline">Événements</span>
      </a>
      <a href="#" class="flex items-center hover-link-accessible-desktop transition-colors">
        <ShoppingCartIcon class="h-6 w-6" />
        <span class="ml-2">Acheter</span>
      </a>
      <a href="#" class="flex items-center hover-link-accessible-desktop">
        <GiftIcon class="h-6 w-6" />
        <span class="ml-2">Dons</span>
      </a>
      <a href="#" class="flex items-center hover-link-accessible-desktop">
        <ChatIcon class="h-6 w-6" />
        <span class="ml-2">Message</span>
      </a>
      <a href="#" class="flex items-center hover-link-accessible-desktop">
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
        :rounded="'true'"
        class="rounded-minimal flex items-center px-3 py-2 border rounded text-ahmi-text-invert border-ahmi-text-invert hover:text-ahmi-text-secondary hover:border-ahmi-text-secondary"
      >
        <MenuIcon class="h-6 w-6" />
      </BaseButton>
      <div
        v-if="menuOpen"
        class="absolute right-0 mt-2 w-64 bg-ahmi-surface-primary rounded shadow-lg text-ahmi-text-invert z-50"
      >
        <a
          v-for="(item, index) in menuItems"
          :key="index"
          :href="item.href"
          class="flex items-center gap-2 px-4 py-2 hover:bg-ahmi-surface-secondary"
        >
          <component v-if="item.icon" :is="item.icon" class="h-5 w-5" />
          <img v-else-if="item.image" :src="item.image" alt="logo" class="h-6 w-6" />
          <span>{{ item.label }}</span>
        </a>
      </div>
    </div>
  </header>
</template>

<script>
import {
  MenuIcon,
  ShoppingCartIcon,
  GiftIcon,
  ChatIcon,
  LoginIcon,
  CalendarIcon,
  ClipboardListIcon,
  HeartIcon,
  UserGroupIcon,
  ChevronDownIcon,
} from '@heroicons/vue/outline'
import BaseButton from '@/components/base/BaseButton.vue'
import menuItems from '@/data/menuItems.js'

export default {
  name: 'HeaderComponent',
  components: {
    MenuIcon,
    ShoppingCartIcon,
    GiftIcon,
    ChatIcon,
    LoginIcon,
    CalendarIcon,
    ClipboardListIcon,
    HeartIcon,
    UserGroupIcon,
    ChevronDownIcon,
    BaseButton,
  },
  data() {
    return {
      menuOpen: false,
      menuItems,
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
