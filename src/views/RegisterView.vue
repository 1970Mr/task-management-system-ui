<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="w-full max-w-md">
      <form @submit.prevent="registerHandler">
        <h2 class="text-2xl font-bold mb-6 text-center">Register</h2>
        <div class="mb-4">
          <input v-model="name" type="text" placeholder="Name" class="input" />
        </div>
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
        <div class="mb-4">
          <input
            v-model="passwordConfirmation"
            type="password"
            placeholder="Password Confirmation"
            class="input"
          />
        </div>
        <button type="submit" class="btn btn-primary w-full mb-3">
          Register
        </button>
        <router-link
          :to="{ name: 'login' }"
          class="text-blue-500 hover:underline"
        >
          Already have an account? Login here
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
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  },
  methods: {
    ...mapActions("auth", ["register"]),
    async registerHandler() {
      try {
        await this.register({
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
        });
        this.$router.push("/dashboard");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
