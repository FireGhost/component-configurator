<script setup lang="ts">
const name = defineModel<string>('name');
const parameters = defineModel<string[]>('parameters', {default: []});

function addParameter() {
  parameters.value.push("");
}
</script>

<template>
  <UFormField label="Field type name">
    <UInput v-model="name" />
  </UFormField>

  <UFormField v-for="(param, i) in parameters" :key="i" label="Parameter name">
    <UInput v-model="parameters[i]" />
  </UFormField>
  
  <UButton @click="addParameter">Add field parameter</UButton>
</template>
