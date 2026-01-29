<script setup lang="ts">
const { components } = defineProps<{
  components: {
    componentTitle: string,
    fields: {
      fieldName: string,
      fieldTypeName: string,
      fieldParametersValues: {[key: string]: string},
    }[],
  }[],
}>();
</script>

<template>
  <ul>
    <li v-for="(component, i) in components" :key="i">
      {{ component.componentTitle }}
      <ul>
        <li v-for="(field, y) in component.fields" :key="y">
          {{ field.fieldName }}: {{ field.fieldTypeName }}
          <ul>
            <li v-for="(parameterValue, parameterName) in field.fieldParametersValues" :key="parameterName">
              {{ parameterName }}: {{ parameterValue }}
            </li>
          </ul>
        </li>
      </ul>
    </li>
  </ul>
</template>
