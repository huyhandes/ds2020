import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Welcome from "../views/Welcome.vue";
import {getSession} from "@/session";

Vue.use(VueRouter);

const routes = [
  {
    path: "/welcome",
    name: "welcome",
    component: Welcome
  },
  {
    path: "/app",
    name: "app",
    component: Home,
    beforeEnter: (to,from,next) =>{
      if (getSession())next();
      else next("welcome");
    }
  },
  {
    path: "/*",
    name: '404',
    component: () => import("@/views/404.vue")
  }
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
export default router;
