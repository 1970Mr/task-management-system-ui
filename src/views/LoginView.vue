<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md">
      <form @submit.prevent="login">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <div class="mb-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            class="input"
          />
        </div>
        <div class="mb-4">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="input"
          />
        </div>
        <button type="submit" class="btn btn-primary w-full">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async login() {
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push("/dashboard");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.input {
  @apply w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600;
}

.btn-primary {
  @apply bg-blue-600 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-700;
}
</style>
