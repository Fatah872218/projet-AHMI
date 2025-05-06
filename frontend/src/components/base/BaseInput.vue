<!-- src/components/base/BaseInput.vue -->
<template>
  <div class="w-full md:w-1/2 mb-sm">
    <label
      class="block text-sm md:text-base font-medium text-ahmi-text-primary font-montserrat mb-xs"
    >
      {{ label }}
    </label>

    <div class="relative">
      <input
        class="block w-full rounded-rounded border border-ahmi-border-primary bg-ahmi-surface-primary text-ahmi-text-primary font-openSans text-body placeholder:text-ahmi-text-secondary focus:ring-2 focus:ring-ahmi-primary focus:outline-none py-xs px-sm md:py-sm md:px-md pr-10"
        :type="typeDeChamp"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :required="required"
        :aria-invalid="!!error"
      />

      <!-- Si c'est un mot de passe, rendre l’icône cliquable -->
      <template v-if="type === 'password'">
        <button
          type="button"
          @click="toggleVisibiliteMotDePasse"
          class="absolute inset-y-0 right-0 pr-sm md:pr-md flex items-center text-ahmi-text-secondary focus:outline-none"
        >
          <slot name="icon" />
        </button>
      </template>

      <!-- Sinon, simple icône décorative -->
      <template v-else-if="$slots.icon">
        <div
          class="absolute inset-y-0 right-0 pr-sm md:pr-md flex items-center pointer-events-none"
        >
          <slot name="icon" />
        </div>
      </template>
    </div>

    <p v-if="error" class="text-caption text-ahmi-error mt-xs font-openSans">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  label: String,
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text',
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: String,
})

const emit = defineEmits(['update:modelValue'])

const motDePasseVisible = ref(false)

const typeDeChamp = computed(() => {
  if (props.type !== 'password') return props.type
  return motDePasseVisible.value ? 'text' : 'password'
})

function toggleVisibiliteMotDePasse() {
  motDePasseVisible.value = !motDePasseVisible.value
}
</script>
