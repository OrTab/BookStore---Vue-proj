<template>
  <div>
    <user-msg/>
  <app-header/>
  <router-view/>
  </div>
</template>




<script>
import AppHeader from './cmps/AppHeader.vue';
import UserMsg from './cmps/UserMsg'



export default {
 async created(){
     await this.$store.dispatch({ type: "loadBooks" });
  },
  components: { 
    AppHeader,
    UserMsg,

     },
  
};
</script>