import { createRouter, createWebHistory } from "vue-router";

// Define route configurations
const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Episodes.vue"),
  },
];

// Create the router instance
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  // Controls the scroll behavior on route navigation
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      // Scroll to the top of the page
      return { top: 0, behavior: "smooth" };
    }
  },
});

export default router;
