<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
import { ref } from "vue";
import { useTimeoutFn } from "@vueuse/core";

export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    const visible = ref(true);

    useTimeoutFn(() => (visible.value = false), props.duration);

    return { visible };
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
