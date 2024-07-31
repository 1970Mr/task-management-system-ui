<template>
  <Modal @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ task?.id ? "Edit Task" : "Add Task" }}
      </h3>
    </template>
    <template #body>
      <div class="mt-2">
        <input
          v-model="taskData.title"
          type="text"
          placeholder="Title"
          class="input mb-2"
        />
        <textarea
          v-model="taskData.description"
          placeholder="Description"
          class="input mb-2"
        ></textarea>
        <select v-model="taskData.status" class="input mb-2">
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="inactive">Inactive</option>
        </select>
        <select v-model="taskData.priority" class="input mb-2">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <input
          v-model="taskData.deadline"
          type="datetime-local"
          placeholder="Deadline"
          class="input mb-2"
        />
      </div>
    </template>
    <template #footer>
      <button @click="$emit('close')" class="btn btn-secondary">Cancel</button>
      <button @click="save" class="btn btn-primary">Save</button>
    </template>
  </Modal>
</template>

<script>
import { ref, watch } from "vue";
import Modal from "@/components/UI/BaseModal.vue";

export default {
  components: {
    Modal,
  },
  props: {
    task: {
      type: Object,
      default: () => ({
        title: "",
        description: "",
        status: "active",
        priority: "medium",
        deadline: "",
      }),
    },
  },
  setup(props, { emit }) {
    const taskData = ref({ ...props.task });

    watch(
      () => props.task,
      (newTask) => {
        taskData.value = { ...newTask };
      }
    );

    const save = () => {
      if (
        taskData.value.title &&
        taskData.value.description &&
        taskData.value.status &&
        taskData.value.priority &&
        taskData.value.deadline
      ) {
        emit("save", taskData.value);
      }
    };

    return { taskData, save };
  },
};
</script>
