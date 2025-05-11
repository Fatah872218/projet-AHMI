<!-- src/components/base/BaseButton.vue -->
<template>
  <button
    :class="[
      'inline-flex items-center justify-center transition-colors duration-200 font-bold',
      variantClass,
      sizeClass,
      { 'rounded-minimal': rounded, rounded: !rounded },
      { 'opacity-50 cursor-not-allowed': disabled },
      className,
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
s

<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'light', 'ghost'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  rounded: {
    type: String,
    default: 'minimal', // ou 'md', 'full', etc.
  },

  disabled: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: '',
  },
})

const sizeClass = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}[props.size]

const variantClass = {
  primary: 'bg-ahmi-primary text-white',
  secondary: 'bg-ahmi-secondary text-white',
  light: 'bg-ahmi-accent text-ahmi-primary',
  ghost: 'bg-transparent text-ahmi-primary border border-ahmi-primary',
}[props.variant]
</script>
