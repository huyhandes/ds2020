import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VuePeerJS from 'vue-peerjs';
import Peer from 'peerjs';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import {getSession} from '@/session';
import "./assets/js/font-awesome.min";
import "./assets/js/chat";

const socket = io('localhost:3000');
Vue.use(VueSocketIOExt, socket, { store });
Vue.use(VuePeerJS, new Peer(getSession(),{debug: 2}), {store});

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("body");
