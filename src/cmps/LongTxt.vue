<template>
  <div class="description">
      <div class="inner">
  <span>
       Description : 
      </span> {{ text }}
      </div>
    <button v-show="isLongTxt" @click="showTxt">
      {{ isShow ? "Read Less" : "Read More" }}
    </button>
  </div>
</template>

<script>
export default {
  props:{
    txt:String
  },
  data() {
    return {
      isLongTxt: false,
      isShow: false,
      text: "",
    };
  },
  methods: {
    showTxt() {
      this.isShow = !this.isShow;
      this.text = this.isShow ? this.txt : this.txt.substring(0, 99) + "...";
    },
  },

  created() {
    this.isLongTxt = this.txt.length > 100;
    this.text =this.txt.length > 100 ? this.txt.substring(0, 99) + "..." : this.txt;
  },
};
</script>

