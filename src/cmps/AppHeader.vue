<template>
  <div class="app-header">
    <header>
      <div class="logo">
        <img @click="$router.push('/')" src="../assets/img/logo.png" alt="" />
      </div> 
        <div   @click="isActive = !isActive" :class="{ links: true, 'show-menu': isActive }">
          <router-link to="/" exact>Home</router-link>
          <router-link to="/about">About</router-link>
          <router-link to="/book">Book App</router-link>
          <router-link to="/add">Add Book</router-link>
        </div>
      <div class="hamburger">
        <button
          @click="isActive = !isActive"
          :class="{
            hamburger: true,
            'hamburger--collapse': true,
            'is-active': isActive,
          }"
          type="button"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
          </span>
        </button>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },created(){
    document.addEventListener('scroll',(ev)=>{
   
    })
  }
};
</script>

