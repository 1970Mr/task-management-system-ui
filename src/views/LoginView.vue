<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md">
      <form @submit.prevent="loginHandler">
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
        <button type="submit" class="btn btn-primary w-full mb-4">Login</button>
        <router-link
          :to="{ name: 'register' }"
          class="text-blue-500 hover:underline"
        >
          Don't have an account? Register here
        </router-link>
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
    async loginHandler() {
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
