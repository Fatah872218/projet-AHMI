<template>
  <div>
    <!--  Vue pour la page d'inscription. -->
    <p>Vue pour la page d'inscription !</p>
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
    //  Vue pour la page d'inscription.
    greet() {
      console.log(this.message)
    },
  },
}

/*
 Vue pour la page d'inscription.
*/
</script>

<style scoped>
/*  Vue pour la page d'inscription */
p {
  color: blue;
}
</style>
