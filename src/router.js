import { createWebHistory, createRouter } from "vue-router";

const routes =  [
  {
    path: "/",
    alias: "/permissions",
    name: "permissions",
    component: () => import("./components/Permissions")
  },
  {
    path: "/add/:id",
    name: "add-permission",
    component: () => import("./components/AddPermission")
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;