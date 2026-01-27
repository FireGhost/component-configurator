<script setup lang="ts">
const components = ref<string[]>([]);

function addComponent() {
  components.value.push("");
}
</script>

<template>
  <UForm>
    <ComponentForm v-for="(component, i) in components" :key="i" />

    <UButton @click="addComponent()">Add component</UButton>

    <UButton>Save</UButton>
  </UForm>
</template>
