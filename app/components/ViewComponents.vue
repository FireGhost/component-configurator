<script setup lang="ts">
const { components } = defineProps<{
  components: {
    componentTitle: string;
    fields: {
      fieldName: string;
      fieldTypeName: string;
      fieldParametersValues: { [key: string]: string };
    }[];
  }[];
}>();
</script>

<template>
  <ul>
    <li
      v-for="(component, componentIndex) in components"
      :key="componentIndex"
      class="mb-4"
    >
      {{ component.componentTitle }}

      <ul class="list-disc pl-4">
        <li v-for="(field, fieldIndex) in component.fields" :key="fieldIndex">
          {{ field.fieldName }}: <{{ field.fieldTypeName }}>

          <template
            v-for="(
              parameterValue, parameterName
            ) in field.fieldParametersValues"
            :key="parameterName"
          >
            //&nbsp;{{ parameterName }}: {{ parameterValue }}
          </template>
        </li>
      </ul>
    </li>
  </ul>
</template>
