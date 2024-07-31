<template>
  <header class="bg-blue-600 text-white p-4 shadow">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-xl font-bold">Task Management</h1>
      <nav>
        <router-link
          :to="{ name: 'dashboard' }"
          class="mr-4"
          active-class="active-link"
        >
          Dashboard
        </router-link>
        <router-link
          :to="{ name: 'adminTasks' }"
          class="mr-4"
          active-class="active-link"
          v-if="isAdmin"
        >
          Admin
        </router-link>
        <button @click="logoutHandler" class="btn btn-secondary">Logout</button>
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
      return localStorage.getItem("userRole") === "admin";
    },
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    async logoutHandler() {
      await this.logout();
      this.$router.push({ name: "login" });
    },
  },
};
</script>
