<template>
    <div class="chatbox dark">
      <div class="message-container">
        <ul>
          <li v-for="(message,index) in $store.getters.getChatZone($vnode.key).chatLog" :key="index">
            <div class="alert alert-primary"
                :class="message.owner=='self' ? 'me':'other'"
            >
              {{message.message}}
            </div>
          </li>
        </ul>
      </div>
      <div class="input-group input-message">
        <input type="text" class="form-control" v-model="message" placeholder="Your message" @keyup.enter="sendMessage({username:$vnode.key,message});message=''"/>
        <div class="input-group-append">
          <button class="btn btn-info" @click="sendMessage({username:$vnode.key,message});message=''">
            <i class="fad fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      message: "",
    }
  },
  methods: {
    ...mapActions(['sendMessage'])
  },
  watch: {
    
  },
  computed: {
  },
  mounted(){
    
  }
}
</script>
