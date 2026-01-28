<script setup lang="ts">
const fieldTypes = ref<{
  name: string,
  parameters: string[],
}[]>([]);

const toast = useToast();

const localStorageItem = localStorage.getItem('fieldTypes');
if (localStorageItem) {
  fieldTypes.value = JSON.parse(localStorageItem);
}

function addField() {
  fieldTypes.value.push({
    name: '',
    parameters: [],
  });
}

function save() {
  // Remove empty names and empty parameters.
  fieldTypes.value = fieldTypes.value.filter((fieldType) => fieldType.name);
  fieldTypes.value.forEach((fieldType) => {
    fieldType.parameters = fieldType.parameters.filter((fieldParameter) => fieldParameter);
  });

  const fieldTypesJson = JSON.stringify(fieldTypes.value);
  localStorage.setItem('fieldTypes', fieldTypesJson);
  toast.add({ title: 'Settings saved' });
}
</script>

<template>
  <div class="py-2">
    <div class="flex flex-wrap gap-2 mb-4">
      <UCard v-for="(field, i) in fieldTypes" :key="i" class="w-74">
        <FieldTypeForm
          v-model:name="field.name"
          v-model:parameters="field.parameters"
        />
      </UCard>

      <UCard>
        <UButton @click="addField()">Add field</UButton>
      </UCard>
    </div>

    <UButton @click="save()" class="w-32 justify-center">Save</UButton>
  </div>
</template>
