<template>
  <Modal @close="$emit('close')">
    <template #header>
      <h3 class="text-lg font-medium leading-6 text-gray-900">Task Details</h3>
    </template>
    <template #body>
      <div class="mt-2">
        <p><strong>Title:</strong> {{ task.title }}</p>
        <p><strong>Description:</strong> {{ task.description }}</p>
        <p><strong>Status:</strong> {{ task.status }}</p>
        <p><strong>Priority:</strong> {{ task.priority }}</p>
        <p><strong>Deadline:</strong> {{ task.deadline }}</p>
        <div>
          <strong>Users:</strong>
          <ul>
            <li v-for="user in task.users.data" :key="user.id">
              {{ user.name }}
            </li>
          </ul>
        </div>
      </div>
    </template>
    <template #footer>
      <button @click="$emit('close')" class="btn btn-secondary">Close</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/UI/BaseModal.vue";

export default {
  components: {
    Modal,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
};
</script>
