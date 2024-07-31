<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />
    <main class="flex-grow container mx-auto py-6">
      <TaskList :tasks="tasks" />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "@/components/Layouts/AppHeader.vue";
import AppFooter from "@/components/Layouts/AppFooter.vue";
import { mapState, mapActions } from "vuex";
import TaskList from "@/components/Tasks/TaskList.vue";

export default {
  components: {
    AppFooter,
    AppHeader,
    TaskList,
  },
  computed: {
    ...mapState("tasks", ["tasks"]),
  },
  methods: {
    ...mapActions("tasks", ["fetchAllTasks"]),
  },
  async created() {
    await this.fetchAllTasks();
  },
};
</script>
