<template>

  <div class="book-preview" >
      <router-link :to="`/book/${book.id}`">
    <div class="details">
      <h3>TItle : {{ book.title }}</h3>
      <h4>Price : {{ setCurrency }}</h4>
    </div>
    <div class="img-container">
      <img :src="`${book.thumbnail}`" />
    </div>
      </router-link>
  </div>
</template>

<script>
export default {
  props: {
    book:Object
  },
  computed: {
    setCurrency() {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: this.book.listPrice.currencyCode,
      }).format(this.book.listPrice.amount);
    },
  },
};
</script>

