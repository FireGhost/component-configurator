<script setup lang="ts">
const projects = ref<
  {
    title: string;
    components: {
      componentTitle: string;
      fields: {
        fieldName: string;
        fieldTypeName: string;
        fieldParametersValues: { [key: string]: string };
      }[];
    }[];
  }[]
>([
  {
    title: "No title",
    components: [],
  },
]);

const currentProjectId = ref(0);
const currentProject = computed(() =>
  projects.value.at(currentProjectId.value),
);

const importExportInput = ref("");
const exportViewTypes = ["View", "JSON"];
const selectedExportViewType = ref("View");

const projectsFromStorage = localStorage.getItem("projects");
if (projectsFromStorage) {
  projects.value = JSON.parse(projectsFromStorage);
}

const toast = useToast();

function addComponent() {
  if (currentProject.value) {
    const newFields = [];
    for (let i = 0; i < 5; i++) {
      newFields.push({
        fieldName: "",
        fieldTypeName: "",
        fieldParametersValues: {},
      });
    }

    currentProject.value.components.push({
      componentTitle: "",
      fields: newFields,
    });
  }
}

function trimInputs() {
  if (currentProject.value) {
    // Remove component with no title.
    currentProject.value.components = currentProject.value.components.filter(
      (component) => component.componentTitle,
    );
    // Remove fields with no title.
    currentProject.value.components.forEach((component) => {
      component.fields = component.fields.filter((field) => field.fieldName);
    });
  }
}

function save() {
  trimInputs();
  const projectsJson = JSON.stringify(projects.value);
  localStorage.setItem("projects", projectsJson);
  toast.add({ title: "Projects saved" });
}

function exportComponents() {
  if (currentProject.value) {
    trimInputs();
    importExportInput.value = JSON.stringify(currentProject.value.components);
  }
}

function importComponents() {
  if (currentProject.value) {
    try {
      currentProject.value.components = JSON.parse(importExportInput.value);
    } catch (e) {
      console.log(e);
      toast.add({
        title: "There is a syntax error in the JSON provided",
        color: "error",
      });
      return;
    }
    save();
    toast.add({ title: "Components imported" });
  }
}

function clear() {
  if (currentProject.value) {
    currentProject.value.components = [];
  }
}

function addProject() {
  projects.value.push({
    title: "New project",
    components: [],
  });
  currentProjectId.value = projects.value.length - 1;
}

function setCurrentProjectId(projectId: number) {
  currentProjectId.value = projectId;
}

function removeProject(projectId: number) {
  projects.value.splice(projectId, 1);
  currentProjectId.value = 0;
}
</script>

<template>
  <div class="py-2">
    <UFieldGroup class="mb-2">
      <UButton
        v-for="(project, projectId) in projects"
        :key="projectId"
        :active="projectId === currentProjectId"
        variant="soft"
        active-variant="solid"
        @click="setCurrentProjectId(projectId)"
      >
        {{ project.title }}
      </UButton>
    </UFieldGroup>

    <UButton class="ml-4" color="success" @click="addProject()">
      Add project
    </UButton>

    <template v-if="currentProject">
      <UCard :ui="{ body: 'flex' }">
        <UFormField
          orientation="horizontal"
          label="Project name"
          name="project-name"
          class="w-fit"
        >
          <UInput v-model="currentProject.title" />
        </UFormField>
        <UButton
          class="ml-6"
          color="error"
          @click="removeProject(currentProjectId)"
        >
          Delete project
        </UButton>
      </UCard>

      <ComponentForm
        v-for="(component, i) in currentProject.components"
        :key="i"
        v-model:component-title="component.componentTitle"
        v-model:fields="component.fields"
      />

      <UButton class="mt-4" variant="outline" @click="addComponent()">
        Add component
      </UButton>
    </template>

    <div class="mt-6">
      <UButton class="w-64 justify-center" @click="save()">Save</UButton>

      <UModal :ui="{ content: 'max-w-full min-w-lg w-max' }">
        <UButton class="ml-2" @click="exportComponents()">
          Import / Export
        </UButton>

        <template #header>
          <URadioGroup
            v-model="selectedExportViewType"
            variant="table"
            orientation="horizontal"
            :items="exportViewTypes"
          />
        </template>
        <template #body>
          <ViewComponents
            v-if="selectedExportViewType === 'View'"
            :components="currentProject?.components ?? []"
          />
          <UTextarea
            v-if="selectedExportViewType === 'JSON'"
            v-model="importExportInput"
            class="w-full"
            size="sm"
            :rows="5"
            autoresize
          />
        </template>
        <template v-if="selectedExportViewType === 'JSON'" #footer="{ close }">
          <UButton
            @click="
              importComponents();
              close();
            "
          >
            Import
          </UButton>
        </template>
      </UModal>

      <UButton
        v-if="currentProject"
        color="error"
        class="ml-4"
        @click="clear()"
      >
        Clear this project
      </UButton>
    </div>
  </div>
</template>
