<template>
  <form
    @submit.prevent="onSubmit"
    class="space-y-6 max-w-md mx-auto bg-white p-6 rounded-xl shadow"
  >
    <div class="space-y-1 text-center">
      <h1 class="text-h2 font-bold text-ahmi-text-brand">{{ title }}</h1>
      <p v-if="description" class="text-sm text-ahmi-text-secondary">{{ description }}</p>
    </div>

    <div class="space-y-4">
      <slot />
    </div>

    <BaseButton type="submit" class="w-full" :disabled="loading" className="rounded-minimal">
      <slot name="submitLabel">Valider</slot>
    </BaseButton>

    <div v-if="$slots.footer" class="text-xs text-ahmi-text-secondary mt-4 text-center">
      <slot name="footer" />
    </div>
  </form>
</template>

<script setup>
import BaseButton from './BaseButton.vue'

defineProps({
  title: String,
  description: String,
  loading: Boolean,
})

const emit = defineEmits(['submit'])

function onSubmit() {
  emit('submit')
}
</script>
