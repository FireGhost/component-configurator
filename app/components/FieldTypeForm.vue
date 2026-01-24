<script setup lang="ts">
const state = reactive<{
  fieldType: string,
  parameters: string[],
}>({
  fieldType: "",
  parameters: [],
});

function addParameter() {
  state.parameters.push("");
}
</script>

<template>
  <UFormField label="Field type">
    <UInput v-model="state.fieldType" />
  </UFormField>

  <UFormField v-for="(param, i) in state.parameters" :key="i" label="Param">
    <UInput v-model="state.parameters[i]" /><UButton />
  </UFormField>
  
  <UButton @click="addParameter">Add field parameter</UButton>
</template>
