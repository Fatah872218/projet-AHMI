<!--  src/views/NotFound.vue -->
<template>
  <div class="flex flex-col justify-center items-center text-center px-4">
    <h1 class="text-5xl font-bold text-red-600 mb-4">404</h1>
    <p class="text-lg text-gray-700 mb-6">Oups ! La page que vous cherchez n’existe pas.</p>
    <router-link to="/" class="text-blue-500 hover:underline">Retour à l’accueil</router-link>
  </div>
</template>

<script setup></script>
