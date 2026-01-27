<script setup lang="ts">
//const fieldName = defineModel<string>('fieldName', {default: ''});

const fieldTypes = useState<{
  name: string,
  parameters: string[],
}[]>('fieldTypes', () => ([]));
</script>

<template>
  <UFormField label="Field name" name="field-name">
    <UInput />
  </UFormField>

  <UFormField label="Field type" name="field-type">
    <USelect :items="fieldTypes" value-key="name" label-key="name" />
  </UFormField>
</template>
