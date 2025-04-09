<template>
  <div>
    <!--  Vue pour la page de connexion. -->
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
    //  Vue pour la page de connexion..
    greet() {
      console.log(this.message)
    },
  },
}

/*
 Vue pour la page de connexion.
*/
</script>

<style scoped>
/*  Vue pour la page de connexion. */
p {
  color: blue;
}
</style>
