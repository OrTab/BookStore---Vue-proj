<template>
  <section class="book-app">
    <book-filter @setFilter="setFilter" />
    <book-list :books="booksToShow" />
  </section>
</template>

<script>
import BookList from "../cmps/BookList";
import BookFilter from "../cmps/BookFilter";

export default {
  data() {
    return {
      books: [],
      filterBy: null,
    };
  },
  async created() {
  
  },
  mounted() {},
  methods: {
   

    setFilter(filterBy) {
      this.$store.commit({ type: "setFilter", filterBy });
    },
  },
  computed: {
    booksToShow() {
      return this.$store.getters.booksToShow;
    },
  },

  components: {
    BookList,
    BookFilter,
  },
};
</script>
