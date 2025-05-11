<template>
  <MainLayout>
    <div class="max-w-3xl mx-auto py-8 px-4">
      <h1 class="text-h2 font-h2-bold-weight mb-6 text-ahmi-text-brand">Mon compte</h1>
      <div class="flex justify-center">
        <BaseButton
          variant="primary"
          size="lg"
          rounded
          @click="$router.push('/account/proposer-evenement')"
        >
          Proposer un événement
        </BaseButton>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import MainLayout from '@/layout/MainLayout.vue'
import BaseButton from '@/components/base/BaseButton.vue'
</script>
