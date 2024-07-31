<template>
  <header class="bg-blue-600 text-white p-4 shadow">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">Task Management</h1>
      <nav>
        <router-link to="/dashboard" class="mr-4">Dashboard</router-link>
        <router-link to="/admin-tasks" class="mr-4" v-if="isAdmin"
          >Admin</router-link
        >
        <button @click="logout" class="btn btn-secondary">Logout</button>
      </nav>
    </div>
  </header>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("auth", ["user"]),
    isAdmin() {
      return this.user?.role === "admin";
    },
  },
  methods: {
    ...mapActions("auth", ["logout"]),
  },
};
</script>
