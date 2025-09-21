<template>
  <div class="w-full md:w-1/2 mb-sm">
    <label
      :for="inputId"
      class="block text-sm md:text-base font-medium text-ahmi-text-primary font-montserrat mb-xs"
    >
      {{ label }}
      <span v-if="required" class="text-warning-600">*</span>
    </label>

    <div class="relative">
      <input
        v-if="typeDeChamp === 'checkbox'"
        :id="inputId"
        type="checkbox"
        :checked="!!modelValue"
        @change="emit('update:modelValue', $event.target.checked)"
        :required="required"
        :aria-invalid="!!error"
        :aria-describedby="description || error ? descriptionId : null"
        class="h-4 w-4 rounded border-ahmi-border-primary text-ahmi-primary focus:ring-ahmi-primary"
      />
      <!-- Autres types -->
      <input
        v-else
        :id="inputId"
        :type="typeDeChamp"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :required="required"
        :aria-invalid="!!error"
        :aria-describedby="description || error ? descriptionId : null"
        class="block w-full rounded border border-ahmi-border-primary bg-ahmi-surface-primary text-ahmi-text-primary font-openSans text-body placeholder:text-ahmi-text-secondary focus:ring-2 focus:ring-ahmi-primary focus:outline-none py-xs px-sm md:py-sm md:px-md pr-10"
      />

      <!-- Icône ou bouton de mot de passe -->
      <template v-if="type === 'password'">
        <button
          type="button"
          @click="toggleVisibiliteMotDePasse"
          class="absolute inset-y-0 right-0 pr-sm md:pr-md flex items-center text-ahmi-text-secondary focus:outline-none"
        >
          <slot name="icon" />
        </button>
      </template>
      <template v-else-if="$slots.icon">
        <div
          class="absolute inset-y-0 right-0 pr-sm md:pr-md flex items-center pointer-events-none"
        >
          <slot name="icon" />
        </div>
      </template>
    </div>

    <!-- Description -->
    <p v-if="description" :id="descriptionId" class="text-xs text-gray-500 mt-1 font-openSans">
      {{ description }}
    </p>

    <!-- Erreur -->
    <p v-if="error" :id="`${inputId}-error`" class="text-caption text-red-600 mt-1 font-openSans">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  modelValue: { type: [String, Number, Boolean], default: '' }, // ✅ accepte Boolean
  type: { type: String, default: 'text' },
  required: { type: Boolean, default: false },
  error: String,
  description: String,
  id: String,
})

const emit = defineEmits(['update:modelValue'])

const motDePasseVisible = ref(false)

const typeDeChamp = computed(() => {
  return props.type === 'password' && motDePasseVisible.value ? 'text' : props.type
})

// ID généré pour accessibilité si non fourni
const inputId = computed(
  () => props.id || `input-${props.label.replace(/\s+/g, '-').toLowerCase()}`
)
const descriptionId = computed(() => `${inputId.value}-description`)

function toggleVisibiliteMotDePasse() {
  motDePasseVisible.value = !motDePasseVisible.value
}
</script>
