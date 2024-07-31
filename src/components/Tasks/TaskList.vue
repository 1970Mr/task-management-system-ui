<template>
  <div>
    <button
      @click="openModal"
      class="btn btn-primary mb-4"
      v-if="isAdmin && this.$route.name === 'adminTasks'"
    >
      Add Task
    </button>
    <div v-if="!tasks || tasks?.length === 0">No tasks available.</div>
    <div v-else class="px-[10rem]">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="editTask"
        @delete="deleteTask"
        @view="viewTask"
      />
    </div>
    <TaskModal
      v-if="showModal"
      @close="closeModal"
      @save="saveTask"
      :task="selectedTask"
    />
    <TaskDetailModal
      v-if="showDetailModal"
      @close="closeDetailModal"
      :task="selectedTask"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import TaskItem from "./TaskItem.vue";
import TaskModal from "./TaskModal.vue";
import TaskDetailModal from "./TaskDetailModal.vue";

export default {
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  components: {
    TaskItem,
    TaskModal,
    TaskDetailModal,
  },
  data() {
    return {
      showModal: false,
      showDetailModal: false,
      selectedTask: null,
    };
  },
  computed: {
    isAdmin() {
      return localStorage.getItem("userRole") === "admin";
    },
  },
  methods: {
    ...mapActions("tasks", ["addTask", "updateTask", "deleteTask"]),
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
    viewTask(task) {
      this.selectedTask = task;
      this.showDetailModal = true;
    },
    closeDetailModal() {
      this.showDetailModal = false;
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
};
</script>
