<template>
  <ahmiHeader class="bg-primary text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">AHMI</h1>
      <nav>
        <ul class="flex gap-4">
          <li><RouterLink to="/">Accueil</RouterLink></li>
          <li><RouterLink to="/inscription">Inscription</RouterLink></li>
          <li><RouterLink to="/connexion">Connexion</RouterLink></li>
        </ul>
      </nav>
    </div>
  </ahmiHeader>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>
