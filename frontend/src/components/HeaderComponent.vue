<!-- src/components/HeaderComponent.vue -->
<template>
  <header
    class="bg-ahmi-primary text-ahmi-text-invert p-4 flex justify-between items-center font-openSans"
  >
    <!-- Navigation Desktop -->
    <nav class="hidden md:flex space-x-8 relative">
      <!-- Menu déroulant AHMI -->
      <div class="relative group">
        <div
          class="flex items-center cursor-pointer hover:text-ahmi-secondary transition-colors logo"
        >
          <img src="@/assets/images/logo.png" alt="Logo AHMI" class="h-8" />
          <span class="ml-2">A H M I</span>
          <ChevronDownIcon class="h-4 w-4 ml-1 mt-0.5" />
        </div>

        <!-- Sous-menu -->
        <div
          class="absolute left-0 mt-2 w-48 bg-ahmi-surface-primary shadow-lg rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50"
        >
          <RouterLink to="#" class="block px-4 py-2 hover-link-accessible">Nos missions</RouterLink>
          <RouterLink to="#" class="block px-4 py-2 hover-link-accessible">Nos valeurs</RouterLink>
          <RouterLink to="#" class="block px-4 py-2 hover-link-accessible"
            >Nous rejoindre</RouterLink
          >
        </div>
      </div>

      <!-- Autres rubriques -->
      <RouterLink to="/events" class="flex items-center hover-link-accessible-desktop">
        <CalendarIcon class="w-6 h-6 text-gray-500" />
        <span class="ml-2 hidden md:inline">Événements</span>
      </RouterLink>

      <RouterLink to="#" class="flex items-center hover-link-accessible-desktop">
        <ShoppingCartIcon class="h-6 w-6" />
        <span class="ml-2">Acheter</span>
      </RouterLink>

      <RouterLink to="#" class="flex items-center hover-link-accessible-desktop">
        <GiftIcon class="h-6 w-6" />
        <span class="ml-2">Dons</span>
      </RouterLink>

      <RouterLink to="#" class="flex items-center hover-link-accessible-desktop">
        <ChatIcon class="h-6 w-6" />
        <span class="ml-2">Message</span>
      </RouterLink>

      <RouterLink to="/connexion" class="flex items-center hover-link-accessible-desktop">
        <LoginIcon class="h-6 w-6" />
        <span class="ml-2">Connexion</span>
      </RouterLink>

      <RouterLink to="/account" class="flex items-center hover-link-accessible-desktop">
        <UserIcon class="h-6 w-6" />
        <span class="ml-2 hidden md:inline">Mon compte</span>
      </RouterLink>

      <RouterLink to="/partenaires" class="flex items-center hover-link-accessible-desktop">
        <UsersIcon class="h-6 w-6" />
        <span class="ml-2 hidden md:inline">Partenaires</span>
      </RouterLink>
    </nav>

    <!-- Mobile -->
    <div class="md:hidden flex items-center justify-between w-full">
      <div class="pl-2">
        <img src="@/assets/images/logo.png" alt="Logo" class="h-8" />
      </div>

      <BaseButton
        @click="toggleMenu"
        variant="light"
        size="md"
        :rounded="'true'"
        class="rounded-minimal flex items-center px-3 py-2 border text-ahmi-text-invert border-ahmi-text-invert hover:text-ahmi-text-secondary hover:border-ahmi-text-secondary"
      >
        <MenuIcon class="h-6 w-6" />
      </BaseButton>

      <!-- Liens fixes mobile -->
      <div class="flex space-x-4 items-center ml-4">
        <RouterLink to="/account" class="text-ahmi-text-invert">
          <UserIcon class="h-6 w-6" />
        </RouterLink>
        <RouterLink to="/partenaires" class="text-ahmi-text-invert">
          <UsersIcon class="h-6 w-6" />
        </RouterLink>
      </div>
    </div>
  </header>

  <!-- Menu mobile déroulant -->
  <div
    v-if="menuOpen"
    class="md:hidden fixed top-20 left-0 right-0 bg-ahmi-surface-primary rounded shadow-lg text-ahmi-text-invert z-40"
  >
    <RouterLink
      v-for="item in menuItems"
      :key="item.href"
      :to="item.href"
      @click="toggleMenu"
      class="flex items-center gap-2 px-4 py-2 hover-link-accessible"
    >
      <component v-if="item.icon" :is="item.icon" class="h-5 w-5" />
      <img v-else-if="item.image" :src="item.image" alt="logo" class="h-6 w-6" />
      <span>{{ item.label }}</span>
    </RouterLink>
  </div>
</template>

<script setup>
// imports identiques (icônes, BaseButton, menuItems)
</script>
