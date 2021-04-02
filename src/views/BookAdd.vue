<template>
  <div class="add-book">
    <h1>Search for any book..</h1>
    <input type="text" @input="getGoogleBooks" placeholder="Search" />
    <div
      class="book"
      v-for="(book, idx) in books"
      :key="book.volumeInfo.subtitle + '' + idx"
    >
      <div class="book-name flex">
        <div>✭</div>
        <h5>
          {{ getBookName(book.volumeInfo.title) }}
        </h5>
      </div>
      <button @click="addBook(book)">+</button>
    </div>
  </div>
</template>

<script>
import bookService from "../services/bookService.js";
export default {
  data() {
    return {
      books: null,
      timeOutId: null,
    };
  },
  created() {},
  methods: {
    getGoogleBooks(ev) {
      clearTimeout(this.timeOutId);
      if (!ev.target.value) {
        this.books = null;
        return;
      }
      this.timeOutId = setTimeout(async () => {
        const books = await bookService.getGoogleBooks(ev.target.value);
        this.books = books.items;
      }, 1000);
    },
    addBook(book) {
      this.$store.dispatch({ type: "addBook", book });
    },
    getBookName(title) {
      return title.length > 30 && window.innerWidth < 500
        ? title.substring(0, 30) + "..."
        : title.length>80? title.substring(0, 80)+ "...":title
    },
  },
};
</script>

