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
    component: import("@/views/LoginView.vue")
  },
  {
    path: "/register",
    name: "register",
    component: import("@/views/RegisterView.vue")
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: import("@/views/DashboardView.vue")
  },
  {
    path: "/admin-tasks",
    name: "adminTasks",
    component: import("@/views/AdminTasksView.vue")
  },
  {
    path: "/:catchAll(.*)",
    name: "notFound",
    component: import("@/views/NotFoundView.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "admin";

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else if (to.meta.requiresAdmin && !isAdmin) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
