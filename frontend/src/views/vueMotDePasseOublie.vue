<script></script>
<style></style>
<template>
  <div class="container">
    <h1>Mot de passe oublié</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Adresse e-mail</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <button type="submit">Envoyer le lien de réinitialisation</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>
