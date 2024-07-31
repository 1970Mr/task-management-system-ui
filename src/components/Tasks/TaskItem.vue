<template>
  <div
    :class="taskClass"
    class="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
    @click="$emit('view', task)"
  >
    <div
      class="cursor-pointer"
      :class="{ 'line-through': task.status === 'completed' }"
    >
      <div class="text-lg font-semibold">{{ task.title }}</div>
      <div class="text-sm text-gray-600">{{ task.description }}</div>
    </div>
    <div class="flex space-x-2">
      <button
        @click.stop="$emit('edit', task)"
        class="btn btn-secondary"
        v-if="isAdmin"
      >
        Edit
      </button>
      <button
        @click.stop="$emit('delete', task.id)"
        class="btn btn-danger"
        v-if="isAdmin"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  computed: {
    taskClass() {
      switch (this.task.status) {
        case "active":
          return "!bg-green-100 border-l-4 border-green-500";
        case "completed":
          return "!bg-blue-100 border-l-4 border-blue-500";
        case "inactive":
          return "!bg-gray-100 border-l-4 border-gray-500 text-gray-400";
        default:
          return "bg-white";
      }
    },
    isAdmin() {
      return localStorage.getItem("userRole") === "admin";
    },
  },
};
</script>
