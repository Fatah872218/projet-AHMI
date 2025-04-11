<template>
  <div>
    <!--  Vue utilisée avec un token dans l'URL (ex: /reset-password/:token) Contient un formulaire. -->
    <p>vue avec formulaire : nouveau mot de passe, confirmation et bouton Réinitialiser</p>
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
    //  Vue utilisée avec un token dans l'URL (ex: /reset-password/:token) Contient un formulaire.
    greet() {
      console.log(this.message)
    },
  },
}

/*
 Vue utilisée avec un token dans l'URL (ex: /reset-password/:token) Contient un formulaire.
*/
</script>

<style scoped>
/*  Vue utilisée avec un token dans l'URL (ex: /reset-password/:token) Contient un formulaire */
p {
  color: blue;
}
</style>
