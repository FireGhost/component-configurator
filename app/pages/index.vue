<script setup lang="ts">
const components = ref<{
  componentTitle: string,
  fields: {
    fieldName: string,
    fieldTypeName: string,
    fieldParametersValues: {[key: string]: string},
  }[],
}[]>([]);
const importExportInput = ref('');
const exportViewTypes = ['View', 'JSON'];
const selectedExportViewType = ref('View');

const componentsFromStorage = localStorage.getItem('components');
if (componentsFromStorage) {
  components.value = JSON.parse(componentsFromStorage);
}

const toast = useToast();

function addComponent() {
  components.value.push({
    componentTitle: '',
    fields: [],
  });
}

function trimInputs() {
  // Remove component with no title.
  components.value = components.value.filter((component) => component.componentTitle);
  // Remove fields with no title or no field type.
  components.value.forEach((component) => {
    component.fields = component.fields.filter((field) => field.fieldName && field.fieldTypeName);
  });
}

function save() {
  trimInputs();
  const componentsJson = JSON.stringify(components.value);
  localStorage.setItem('components', componentsJson);
  toast.add({ title: "Components saved" });
}

function exportComponents() {
  trimInputs();
  importExportInput.value = JSON.stringify(components.value);
}

function importComponents() {
  try {
    components.value = JSON.parse(importExportInput.value);
  }
  catch (e) {
    console.log(e);
    toast.add({
      title: 'There is a syntax error in the JSON provided',
      color: "error",
    });
    return;
  }
  save();
  toast.add({ title: 'Components imported' });
}

function clear() {
  components.value = [];
}
</script>

<template>
  <UForm class="py-2">
    <ComponentForm
      v-for="(component, i) in components"
      :key="i"
      v-model:component-title="component.componentTitle"
      v-model:fields="component.fields"
    />

    <UButton @click="addComponent()" class="mt-4">Add component</UButton>

    <div class="mt-6">
      <UButton @click="save()" class="w-64 justify-center">Save</UButton>

      <UModal>
        <UButton @click="exportComponents()" class="ml-2">Import / Export</UButton>

        <template #header>
          <URadioGroup variant="table" orientation="horizontal" :items="exportViewTypes" v-model="selectedExportViewType" />
        </template>
        <template #body>

          <ViewComponents v-if="selectedExportViewType === 'View'" :components="components" />
          <UTextarea v-if="selectedExportViewType === 'JSON'" class="w-full" size="sm" :rows="5" autoresize v-model="importExportInput" />
          
        </template>
        <template #footer="{close}" v-if="selectedExportViewType === 'JSON'">
          <UButton @click="importComponents(); close()">Import</UButton>
        </template>
      </UModal>

      <UButton @click="clear()" color="error" class="ml-4">Clear</UButton>
    </div>
  </UForm>
</template>
