import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "login",
    component: import("@/views/LoginView.vue"),
    meta: {
      shouldNotAuth: true,
    },
  },
  {
    path: "/register",
    name: "register",
    component: import("@/views/RegisterView.vue"),
    meta: {
      shouldNotAuth: true,
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: import("@/views/DashboardView.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/admin-tasks",
    name: "adminTasks",
    component: import("@/views/AdminTasksView.vue"),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: import("@/views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("userRole") === "admin";

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else if (
    (to.meta.requiresAdmin && !isAdmin) ||
    (to.meta.shouldNotAuth && isAuthenticated)
  ) {
    next({ name: "dashboard" });
  } else {
    next();
  }
});

export default router;
