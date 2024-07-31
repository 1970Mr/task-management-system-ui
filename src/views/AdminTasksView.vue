<template>
  <div>
    <Header />
    <div class="flex">
      <Sidebar />
      <div class="flex-1 p-6">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-semibold">Admin Task Management</h1>
          <button @click="openModal" class="btn btn-primary">Add Task</button>
        </div>
        <div v-if="tasks.length === 0">No tasks available.</div>
        <div v-else>
          <TaskItem
            v-for="task in tasks"
            :key="task.id"
            :task="task"
            @edit="editTask"
            @delete="deleteTask"
          />
        </div>
        <TaskFormModal
          v-if="showModal"
          @close="closeModal"
          @save="saveTask"
          :task="selectedTask"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Layout/AppHeader.vue";
import Sidebar from "@/components/Layout/AppSidebar.vue";
import Footer from "@/components/Layout/AppFooter.vue";
import TaskItem from "@/components/Dashboard/TaskItem.vue";
import TaskFormModal from "@/components/Admin/TaskForm.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "AdminTask",
  components: {
    Header,
    Sidebar,
    Footer,
    TaskItem,
    TaskFormModal,
  },
  data() {
    return {
      showModal: false,
      selectedTask: null,
    };
  },
  computed: {
    ...mapState("tasks", ["tasks"]),
  },
  methods: {
    ...mapActions("tasks", [
      "fetchTasks",
      "addTask",
      "updateTask",
      "deleteTask",
    ]),
    openModal() {
      this.selectedTask = null;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    editTask(task) {
      this.selectedTask = task;
      this.showModal = true;
    },
    async saveTask(task) {
      if (task.id) {
        await this.updateTask(task);
      } else {
        await this.addTask(task);
      }
      this.closeModal();
    },
  },
  async created() {
    await this.fetchTasks();
  },
};
</script>
