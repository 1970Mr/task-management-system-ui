<template>
  <div>
    <Header />
    <div class="container mx-auto py-6">
      <TaskList />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Layout/AppHeader.vue";
import TaskList from "@/components/Dashboard/TaskList.vue";

export default {
  components: {
    Header,
    TaskList,
  },
};
</script>
