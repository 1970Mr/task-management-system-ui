<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-lg">
      <div class="p-4 border-b">
        <slot name="header"></slot>
      </div>
      <div class="p-4">
        <slot name="body"></slot>
      </div>
      <div class="p-4 border-t flex justify-end">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>
