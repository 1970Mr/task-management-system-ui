<template>
  <aside class="bg-gray-800 text-white w-64 min-h-screen">
    <nav class="p-4">
      <ul>
        <li class="mb-4">
          <router-link
            to="/dashboard"
            class="block py-2 px-4 rounded hover:bg-gray-700"
            >Dashboard</router-link
          >
        </li>
        <li v-if="isAdmin" class="mb-4">
          <router-link
            to="/admin-tasks"
            class="block py-2 px-4 rounded hover:bg-gray-700"
            >Admin Tasks</router-link
          >
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState("auth", ["user"]),
    isAdmin() {
      return this.user?.role === "admin";
    },
  },
};
</script>
