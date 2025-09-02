<template>
  <main class="min-h-screen flex items-center justify-center p-8 text-center">
    <div class="max-w-md">
      <h1 class="text-3xl font-semibold mb-2">403 – Accès refusé</h1>
      <p class="opacity-80 mb-6">
        Vous n’avez pas les droits nécessaires pour consulter cette page.
      </p>

      <div class="flex gap-3 justify-center">
        <RouterLink to="/" class="px-4 py-2 rounded bg-black text-white">Accueil</RouterLink>
        <RouterLink to="/connexion" class="px-4 py-2 rounded border">Se connecter</RouterLink>
      </div>

      <p class="text-xs opacity-60 mt-6">
        Si vous pensez que c’est une erreur, contactez un administrateur.
      </p>
    </div>
  </main>
</template>

<script setup></script>
