<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-grow container mx-auto py-6">
      <TaskList />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import TaskList from "@/components/Dashboard/TaskList.vue";
import AppHeader from "@/components/Layout/AppHeader.vue";
import AppFooter from "@/components/Layout/AppFooter.vue";

export default {
  components: {
    AppFooter,
    AppHeader,
    TaskList,
  },
};
</script>
