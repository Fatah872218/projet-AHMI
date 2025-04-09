<template>
  <div>
    <!-- Composant pour le formulaire de connexion -->
    <p>essai !</p>
  </div>
</template>

<script>
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

/*
Composant pour le formulaire de connexion
*/
</script>

<style scoped>
/* Composant pour le formulaire de connexion */
p {
  color: blue;
}
</style>
