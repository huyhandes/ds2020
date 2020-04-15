import Vue from "vue";
import Vuex from "vuex";
import {getSession} from '@/session';
import ChatZone from '@/chat';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chatZoneList: []
  },
  getters: {
    getConnectionList(state){
      return state.chatZoneList;
    },
    getChatZone: (state) => (username) => {
      return state.chatZoneList.find(chatZone => chatZone.connection.peer == username);
    }
  },
  mutations: {
    /*eslint-disable*/
    addConnection(state,payload){
        state.chatZoneList = [...state.chatZoneList,payload];
    },
    removeConnection(state,payload){
      state.chatZoneList = state.chatZoneList.filter(chatZone => chatZone.connection.peer != payload);
    },
  },
  actions: {
    sendMessage({commit},payload){
        this.getters.getChatZone(payload.username).sendMessage(payload.message);
    },
    addMessage({commit},payload){
        this.getters.getChatZone(payload.username).addMessage(payload.message);
    },
    socket_leaveServer({commit},username){
      commit('removeConnection',username);
    },
    socket_joinServer({dispatch,commit},username){
      let conn = this._vm.$peer.connect(username);
      let chatZone = new ChatZone(conn);
      conn.on('data', function(message) {
        dispatch('addMessage',{username,message})
      })
      commit('addConnection',chatZone);
    },
    peer_open({dispatch,commit},id){
      id = getSession();
      this._vm.$peer.on('connection',function(conn){
        let chatZone = new ChatZone(conn);
        conn.on('data',function(message)  {
          dispatch('addMessage',{username:conn.peer,message})
        })
        commit('addConnection',chatZone);
      })
    },
    peer_close(){
      console.log('Connection destroyed');
    },
    peer_error({commit},err){
      console.log(err);
    }
  },
  modules: {}
});
