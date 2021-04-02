<template>
<transition name="fade">
  <div v-if="userMsg" :class="userMsg.type" class="user-msg">
    <p>{{ userMsg.msg }}</p>
    <router-link v-if="userMsg.book" :to="`/book/${userMsg.book.id}`"
      >Check it!</router-link
    >
    <button class="close-btn" @click="$store.commit({ type: 'setMsg', msg: null })">&#x2716;</button>
  </div>
</transition>
</template>

<script>
export default {
  computed: {
    userMsg() {
      return this.$store.getters.userMsg;
    },
  },
};
</script>
