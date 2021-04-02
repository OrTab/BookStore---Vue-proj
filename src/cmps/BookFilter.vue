<template>
  <div class="book-filter">
    <input type="text" v-model="filterBy.txt" placeholder="Search"  @input="onSetFilter" />
    <input type="number" v-model="filterBy.fromPrice" placeholder="From Price"  @input="onSetFilter"/>
    <input type="number" v-model="filterBy.toPrice" placeholder="To Price" @input="onSetFilter"/>
    <div>
    <button @click="onSetFilter">Search</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterBy: {
        txt: "",
        fromPrice: -Infinity,
        toPrice: Infinity,
      },
    }
  },methods:{
      onSetFilter(){
          if(!this.filterBy.fromPrice)this.filterBy.fromPrice=-Infinity
          if(!this.filterBy.toPrice)this.filterBy.toPrice=Infinity
          this.$emit('setFilter',{...this.filterBy})
      }
  }
};
</script>

