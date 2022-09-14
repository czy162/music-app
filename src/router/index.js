import { createRouter, createWebHistory } from "vue-router";
import store from "@/store/index";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
  {
    path: "/itemmusic",
    name: "ItemMusic",
    component: () => import("../views/ItemMusic.vue"),
  },
  {
    path: "/yuncun",
    name: "YunCun",
    component: () => import("../views/YunCun.vue"),
  },
  {
    path: "/shipin",
    name: "ShiPin",
    component: () => import("../views/ShiPin.vue"),
  },
  {
    path: "/search",
    name: "Search",
    component: () => import("../views/Search.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/loginemail",
    name: "LoginEmail",
    component: () => import("../components/Login/LoginEmail.vue"),
  },
  {
    path: "/infoUser",
    name: "InfoUser",
    //路由守卫
    beforeEnter: (to, from, next) => {
      if (
        store.state.isLogin ||
        store.state.token ||
        localStorage.getItem("token")
      ) {
        next();
      } else {
        next("/login");
      }
    },
    component: () => import("../views/InfoUser.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

//全局路由守卫
router.beforeEach((to, form) => {
  if (to.path == "/login" || to.path == "/loginemail") {
    store.state.isFooterMusic = false;
  } else {
    store.state.isFooterMusic = true;
  }
});

export default router;
