<script setup lang="ts">
const fieldTypes = ref<
  {
    name: string;
    parameters: string[];
  }[]
>([]);
const importExportInput = ref("");

const toast = useToast();

const localStorageItem = localStorage.getItem("fieldTypes");
if (localStorageItem) {
  fieldTypes.value = JSON.parse(localStorageItem);
}

function addField() {
  fieldTypes.value.push({
    name: "",
    parameters: [],
  });
}

function trimInputs() {
  fieldTypes.value = fieldTypes.value.filter((fieldType) => fieldType.name);
  fieldTypes.value.forEach((fieldType) => {
    fieldType.parameters = fieldType.parameters.filter(
      (fieldParameter) => fieldParameter,
    );
  });
}

function save() {
  trimInputs();
  const fieldTypesJson = JSON.stringify(fieldTypes.value);
  localStorage.setItem("fieldTypes", fieldTypesJson);
  toast.add({ title: "Settings saved" });
}

function exportSettings() {
  trimInputs();
  importExportInput.value = JSON.stringify(fieldTypes.value);
}

function importSettings() {
  try {
    fieldTypes.value = JSON.parse(importExportInput.value);
  } catch (e) {
    console.log(e);
    toast.add({
      title: "There is a syntax error in the JSON provided",
      color: "error",
    });
    return;
  }
  save();
  toast.add({ title: "Settings imported" });
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
        <UButton @click="addField()" variant="outline">Add field type</UButton>
      </UCard>
    </div>

    <UButton @click="save()" class="w-32 justify-center mr-4">Save</UButton>

    <UModal>
      <UButton @click="exportSettings()">Import / Export</UButton>

      <template #body>
        <UTextarea
          class="w-full"
          size="sm"
          :rows="5"
          autoresize
          v-model="importExportInput"
        />
      </template>
      <template #footer="{ close }">
        <UButton
          @click="
            importSettings();
            close();
          "
          >Import</UButton
        >
      </template>
    </UModal>
  </div>
</template>
