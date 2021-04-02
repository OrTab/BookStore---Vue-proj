<template>
  <div class="book-list">
    <book-preview v-for="book in books" :book="book" :key="book.id" />
  </div>
</template>
<script>
import BookPreview from "./BookPreview.vue";

export default {
  props: {
    books: Array,
  },
  components: {
    BookPreview,
  },
};
</script>

