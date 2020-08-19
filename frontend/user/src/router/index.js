import Vue from "vue";
import VueRouter from "vue-router";
import { requireAuth } from "../services/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () =>
      import("../views/Home.vue")
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    beforeEnter: requireAuth,
    component: () =>
      import("../views/Dashboard.vue")
  },
  {
    path: "/callback",
    component: () =>
      import("../components/callback.vue")
  }
];


const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
