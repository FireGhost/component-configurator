<script setup lang="ts">
import { Buffer } from "buffer";

const components = ref<{
  componentTitle: string,
  fields: {
    fieldName: string,
    fieldTypeName: string,
    fieldParametersValues: string[],
  }[],
}[]>([]);

const route = useRoute();

function addComponent() {
  components.value.push({
    componentTitle: '',
    fields: [],
  });
}

function save() {
  // Remove component with no title.
  components.value = components.value.filter((component) => component.componentTitle);
  // Remove fields with no title or no field type.
  components.value.forEach((component, index) => {
    component.fields = component.fields.filter((field) => field.fieldName && field.fieldTypeName);
  });

  const componentsJson = JSON.stringify(components.value);
  console.log(componentsJson);
  console.log(btoa(componentsJson));
  console.log(Buffer.from(componentsJson, 'binary').toString('base64'));
  

  //route.query.data = atob(componentsJson);
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

    <UButton @click="save()" class="block mt-4 w-64 justify-center">Save</UButton>
  </UForm>
</template>
