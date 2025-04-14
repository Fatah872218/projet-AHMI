<template>
  <div class="flex flex-col gap-1 w-full">
    <label v-if="label" class="text-ahmi-text-primary font-bold text-sm">
      {{ label }}
      <span v-if="required" class="text-red-600">*</span>
    </label>

    <div
      :class="[
        'flex items-center px-3 py-2 bg-white border rounded',
        error ? 'border-red-500' : 'border-ahmi-border-primary',
        rounded ? 'rounded-full' : 'rounded-md',
      ]"
    >
      <input
        v-bind="$attrs"
        :type="type"
        :placeholder="placeholder"
        class="w-full bg-transparent text-ahmi-text-primary focus:outline-none"
      />
      <slot name="icon" />
    </div>

    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  error: String,
  required: Boolean,
  rounded: {
    type: Boolean,
    default: false,
  },
})
</script>
