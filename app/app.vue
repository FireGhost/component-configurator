<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const menuItemsRight = ref<NavigationMenuItem[]>([
  {
    label: "Settings",
    to: "/settings",
  },
]);

const menuItemsCenter = ref<NavigationMenuItem[]>([
  {
    label: "Configurator",
    to: "/",
  },
]);
</script>

<template>
  <UApp>
    <UHeader title="Component configurator" to="/">
      <UNavigationMenu :items="menuItemsCenter" />
      <template #right>
        <UNavigationMenu :items="menuItemsRight" />
      </template>
    </UHeader>

    <UMain>
      <UContainer>
        <NuxtPage />
      </UContainer>
    </UMain>
  </UApp>
</template>
