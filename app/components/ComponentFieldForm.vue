<script setup lang="ts">
const fieldName = defineModel<string>('fieldName', {default: ''});
const fieldTypeName = defineModel<string>('fieldTypeName', {default: ''});
const fieldParametersValues = defineModel<{[key: string]: string}>('fieldParametersValues', {default: {}});

const fieldTypes = ref<{
  name: string,
  parameters: string[],
}[]>([]);

const localStorageItem = localStorage.getItem('fieldTypes');
if (localStorageItem) {
  fieldTypes.value = JSON.parse(localStorageItem);
}
</script>

<template>
  <UCard>
    <UFormField label="Field name" name="field-name">
      <UInput v-model="fieldName" />
    </UFormField>
  
    <UFormField label="Field type" name="field-type" class="mb-2">
      <USelect :items="fieldTypes" value-key="name" label-key="name" v-model="fieldTypeName" class="w-full" />
    </UFormField>
  
    <UFormField
      v-for="(fieldParameter, i) in fieldTypes.find((fieldType) => fieldType.name === fieldTypeName)?.parameters"
      :label="fieldParameter"
      :name="`${fieldName}-${fieldParameter}-${i}`"
    >
      <UInput v-model="fieldParametersValues[fieldParameter]" />
    </UFormField>
  </UCard>
</template>
