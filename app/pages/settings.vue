<script setup lang="ts">
const fieldTypes = useState<{
  name: string,
  parameters: string[],
}[]>('fieldTypes', () => ([]));

function addField() {
  fieldTypes.value.push({
    name: '',
    parameters: [],
  });
}
</script>

<template>
  <UForm>
    
    <FieldTypeForm
      v-for="(field, i) in fieldTypes"
      :key="i"
      v-model:name="field.name"
      v-model:parameters="field.parameters"
    />

    <UButton @click="addField">Add field</UButton>

    <UButton>Save</UButton>

  </UForm>
</template>
