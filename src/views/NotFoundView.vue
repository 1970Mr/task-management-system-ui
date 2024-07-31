<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-gray-100"
  >
    <h1 class="text-6xl font-bold text-gray-800 mb-4">404</h1>
    <p class="text-2xl text-gray-600 mb-8">Page Not Found</p>
    <router-link :to="{ name: 'home' }" class="btn btn-primary">
      Go to Home
    </router-link>
  </div>
</template>
