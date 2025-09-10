<template>
  <div
    v-if="message"
    :class="[
      'rounded-md px-4 py-3 mb-4 border',
      type === 'success' && 'bg-green-50 border-green-300 text-green-900',
      type === 'error' && 'bg-red-50 border-red-300 text-red-900',
      type === 'info' && 'bg-blue-50 border-blue-300 text-blue-900',
      type === 'warning' && 'bg-yellow-50 border-yellow-300 text-yellow-900',
    ]"
    role="status"
    aria-live="polite"
  >
    <slot>{{ message }}</slot>
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'info' }, // 'success' | 'error' | 'info' | 'warning'
  message: { type: String, default: '' },
})
</script>
