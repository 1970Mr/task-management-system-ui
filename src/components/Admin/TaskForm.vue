<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <input
          v-model="taskData.title"
          type="text"
          placeholder="Title"
          class="input"
        />
      </div>
      <div class="mb-4">
        <textarea
          v-model="taskData.description"
          placeholder="Description"
          class="input"
        ></textarea>
      </div>
      <div class="flex justify-end">
        <button
          type="button"
          @click="$emit('close')"
          class="btn btn-secondary mr-2"
        >
          Cancel
        </button>
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
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

    const handleSubmit = () => {
      if (taskData.value.title && taskData.value.description) {
        this.$emit("save", taskData.value);
      }
    };

    return { taskData, handleSubmit };
  },
};
</script>
