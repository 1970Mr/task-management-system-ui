<template>
  <div
    class="bg-white p-4 rounded-lg shadow mb-4 flex justify-between items-center"
  >
    <div>
      <div class="text-lg font-semibold">{{ task.title }}</div>
      <div class="text-sm text-gray-600">{{ task.description }}</div>
    </div>
    <div class="flex space-x-2">
      <button @click="$emit('edit', task)" class="btn btn-secondary">
        Edit
      </button>
      <button @click="$emit('delete', task.id)" class="btn btn-danger">
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
};
</script>

<style scoped>
.btn-secondary {
  @apply bg-gray-600 text-white py-1 px-2 rounded-lg hover:bg-gray-700;
}

.btn-danger {
  @apply bg-red-600 text-white py-1 px-2 rounded-lg hover:bg-red-700;
}
</style>
