<script setup lang="ts">
const name = defineModel<string>("name");
const parameters = defineModel<string[]>("parameters", { default: [] });

function addParameter() {
  parameters.value.push("");
}
</script>

<template>
  <div>
    <UFormField label="Field type name" class="mb-4">
      <UInput v-model="name" />
    </UFormField>

    <UFormField
      v-for="(param, i) in parameters"
      :key="i"
      label="Parameter name"
    >
      <UInput v-model="parameters[i]" />
    </UFormField>

    <UButton class="mt-4" variant="outline" @click="addParameter">
      Add field parameter
    </UButton>
  </div>
</template>
