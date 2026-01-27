<script setup lang="ts">
const componentTitle = defineModel<string>('componentTitle', {default: ''});
const fields = ref<string[]>([]);

function addField() {
  fields.value.push("");
}
</script>

<template>
  <UFormField label="Component title" name="title">
    <UInput v-model="componentTitle" />
  </UFormField>

  <ComponentFieldForm v-for="(field, i) in fields" :key="i" />

  <UButton @click="addField()">Add field</UButton>
</template>
