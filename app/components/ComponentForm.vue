<script setup lang="ts">
const componentTitle = defineModel<string>("componentTitle", { default: "" });
const fields = defineModel<
  {
    fieldName: string;
    fieldTypeName: string;
    fieldParametersValues: { [key: string]: string };
  }[]
>("fields", { default: [] });

function addField() {
  fields.value.push({
    fieldName: "",
    fieldTypeName: "",
    fieldParametersValues: {},
  });
}
</script>

<template>
  <UCard class="mt-2">
    <template #header>
      <UFormField label="Component title" name="title">
        <UInput v-model="componentTitle" class="w-80" />
      </UFormField>
    </template>

    <div class="flex flex-wrap">
      <ComponentFieldForm
        v-for="(field, i) in fields"
        :key="i"
        v-model:field-name="field.fieldName"
        v-model:field-parameters-values="field.fieldParametersValues"
        v-model:field-type-name="field.fieldTypeName"
      />
    </div>

    <UButton class="mt-4" variant="outline" @click="addField()">
      Add field
    </UButton>
  </UCard>
</template>
