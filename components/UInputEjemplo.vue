<!-- components/UInputEjemplo.vue -->
<template>
  <div>
    <input
      type="text"
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)" 
      :placeholder="placeholder"
      class="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: String,
    required: true
  },
  placeholder: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script>