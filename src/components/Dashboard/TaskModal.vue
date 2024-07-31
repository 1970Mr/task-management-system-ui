<template>
  <Modal @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">
        {{ task.id ? "Edit Task" : "Add Task" }}
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
          class="input"
        ></textarea>
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
import Modal from "@/components/UI/Modal.vue";

export default {
  components: {
    Modal,
  },
  props: {
    task: {
      type: Object,
      default: () => ({ title: "", description: "" }),
    },
  },
  setup(props) {
    const taskData = ref({ ...props.task });

    watch(props, (newProps) => {
      taskData.value = { ...newProps.task };
    });

    const save = () => {
      if (taskData.value.title && taskData.value.description) {
        this.$emit("save", taskData.value);
      }
    };

    return { taskData, save };
  },
};
</script>
