<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-12 text-center"></div>
      <div class="col-md-12">
        <div id="wrap-chat">
          <div class="card chat-body">
            <div class="row">
              <div class="col-2 col-sm-2 col-md-3 col-lg-3 col-xl-3 contact dark">
                <!-- list user -->
                <div class="list-contact">
                  <ul class="list-unstyled">
                    <li class="media p-2 border border-info rounded-lg bg-info">
                      <div class="media-body">
                        <h5 class="mt-1 mb-1 name-contact">Online User</h5>
                      </div>
                    </li>
                    <li class="media p-2 border border-info rounded-lg" 
                        v-for="chatZone in getConnectionList" 
                        :key="chatZone.connection.peer"
                        @click="selectConnection(chatZone.connection.peer)"
                        
                        >
                      <div class="media-body">
                        <h6 class="mt-1 mb-1 name-contact" :class="{'text-success': selectedConnection == chatZone.connection.peer}">{{chatZone.connection.peer}}</h6>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- list user -->
              </div>
              <transition-group tag="div" class="col-10 col-sm-10 col-lg-9 col-md-9 col-xl-9 no-pad dark" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut" mode="out-in">
                  <app-chat v-show="selectedConnection == chatZone.connection.peer" v-for="chatZone in getConnectionList" :key="chatZone.connection.peer"/> -->
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import {mapGetters} from 'vuex';
import Chat from "@/components/Chat.vue";
import {getSession} from '@/session';
export default {
  components: {
    appChat: Chat
  },
  data(){
    return{
      selectedConnection : "",
    }
  },
  computed: {
    ...mapGetters(['getConnectionList'])
  },
  methods: {
    selectConnection(id){
      this.selectedConnection = id;
    }
  },
  watch: {
    'getConnectionList': function(value){
      console.log(value);
    }
  },
  mounted() {
    this.$socket.client.emit('username',getSession());
  },
};
</script>
