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
        <select v-model="taskData.user_ids" multiple class="input mb-2">
          <option v-for="user in users" :key="user.id" :value="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
    </template>
    <template #footer>
      <button @click="$emit('close')" class="btn btn-secondary">Cancel</button>
      <button @click="save" class="btn btn-primary ms-3">Save</button>
    </template>
  </Modal>
</template>

<script>
import { ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
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
        user_ids: [],
      }),
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const taskData = ref({ ...props.task });
    const users = ref([]);

    watch(
      () => props.task,
      (newTask) => {
        taskData.value = { ...newTask };
      }
    );

    const fetchUsers = async () => {
      await store.dispatch("auth/fetchUsers");
      users.value = store.state.auth.users;
    };

    onMounted(() => {
      fetchUsers();
      taskData.value.user_ids = taskData.value.users?.data.map(
        (user) => user.id
      );
    });

    const save = () => {
      if (
        taskData.value.title &&
        taskData.value.description &&
        taskData.value.status &&
        taskData.value.priority &&
        taskData.value.deadline &&
        taskData.value.user_ids.length > 0
      ) {
        emit("save", taskData.value);
      }
    };

    return { taskData, users, save };
  },
};
</script>
