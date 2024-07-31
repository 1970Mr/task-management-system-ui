<template>
  <div>
    <button @click="openModal" class="btn btn-primary mb-4" v-if="isAdmin">
      Add Task
    </button>
    <div v-if="tasks.length === 0">No tasks available.</div>
    <div v-else class="px-[10rem]">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="editTask"
        @delete="deleteTask"
      />
    </div>
    <TaskModal
      v-if="showModal"
      @close="closeModal"
      @save="saveTask"
      :task="selectedTask"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TaskItem from "./TaskItem.vue";
import TaskModal from "./TaskModal.vue";

export default {
  components: {
    TaskItem,
    TaskModal,
  },
  data() {
    return {
      showModal: false,
      selectedTask: null,
    };
  },
  computed: {
    ...mapState("tasks", ["tasks"]),
    isAdmin() {
      return localStorage.getItem("userRole") === "admin";
    },
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
