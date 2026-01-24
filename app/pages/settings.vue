<script setup lang="ts">
const state = reactive<{
  fields: string[],
}>({
  fields: [],
});

function addField() {
  state.fields.push("");
}
</script>

<template>
  <UForm>
    
    <FieldTypeForm v-for="(field, i) in state.fields" :key="i" />

    <UButton @click="addField">Add field</UButton>

    <UButton>Save</UButton>

  </UForm>
</template>
