<template>
  <transition name="fade">
    <div class="book-details" v-if="book">
      <div class="details">
        <div class="img-container">
          <img :src="`${book.thumbnail}`" />
        </div>
        <div class="details-text">
          <h2><span>Title : </span> {{ book.title }}</h2>
          <h3><span> Sub : </span> {{ book.subtitle }}</h3>
          <h5>
            <div class="labels">
              <small v-if="bookPageMark">{{ bookPageMark }} </small>

              <small v-if="bookAgeMark">{{ bookAgeMark }}</small>
            </div>
            Written by :
            <span v-for="auth in book.authors" :key="auth">{{ auth }}</span>
          </h5>
          <h5>
            Categories :
            <span v-for="(cat, idx) in book.categories" :key="cat">
              {{
                idx !== book.categories.length - 1 ? cat + "," : cat + "."
              }}</span
            >
          </h5>
          <h5>Page Count : {{ book.pageCount }} Pages</h5>
          <h5>Published : {{ book.publishedDate }}</h5>
          <h4>
            Price :
            <span :style="{ color: bookPriceMark }">{{ setCurrency }}</span>
            {{ book.listPrice.onSale ? "On Sale!" : "" }}
          </h4>
          <long-txt v-if="book.description" :txt="book.description" />
          <router-link to="/book">Go Back</router-link>
          <div class="btns">
            <router-link :to="`/book/${getBook('prev')}`"
              ><button>Previous</button></router-link
            >
            <router-link :to="`/book/${getBook('next')}`"
              ><button>Next</button></router-link
            >
          </div>
        </div>
      </div>
      <div class="reviews">
        <transition name="fade">
          <review-add
            v-if="showAddReviews"
            @addReview="addReview"
            @closeReviewAdd="showAddReviews = false"
          />
        </transition>
        <button @click="showAddReviews = !showAddReviews">Add Review</button>
        <review-list @removeReview="removeReview" :reviews="book.reviews" />
      </div>
    </div>

    <img class="loader" v-else src="../assets/img/loader.gif" alt="" />
  </transition>
</template>

<script>
import bookService from "../services/bookService.js";
import LongTxt from "../cmps/LongTxt";
import ReviewAdd from "../cmps/ReviewAdd";
import ReviewList from "../cmps/ReviewList";

export default {
  data() {
    return {
      book: null,
      showAddReviews: false,
      prevBookId: null,
      nextBookId: null,
    };
  },

  created() {
    this.loadBook();
  },
  methods: {
    async addReview(review) {
      await this.$store.dispatch("addReview", {
        review,
        bookId: this.book.id,
      });
      this.showAddReviews = false;
      this.loadBookNoTimeOut();
    },
    async removeReview(review) {
      await this.$store.dispatch({
        type: "removeReview",
        reviewId: review.id,
        bookId: this.book.id,
      });
      this.loadBookNoTimeOut();
    },
    async loadBookNoTimeOut() {
      this.book = await bookService.getBookById(this.book.id);
    },
    loadBook() {
      const { id } = this.$route.params;
      setTimeout(async () => {
        this.book = await bookService.getBookById(id);
      }, 1200);
    },
    getBook(to) {
      const books = this.$store.getters.booksToShow;
      const idx = this.$store.getters.booksToShow.findIndex(
        (book) => book.id === this.book.id
      );
      if (to === "prev") {
        return books[idx - 1] ? books[idx - 1].id : books[books.length - 1].id;
      } else return books[idx + 1] ? books[idx + 1].id : books[0].id;
    },
  },
  computed: {
    bookPageMark() {
      const { pageCount } = this.book;
      if (pageCount > 500) return "Long Reading";
      if (pageCount > 200 && pageCount < 500) return "Decent Reading";
      else return "Light Reading";
    },

    bookAgeMark() {
      const { publishedDate } = this.book;
      if (new Date().getFullYear() + 1 - publishedDate >= 10)
        return "Veteran Book";
      else if (new Date().getFullYear() - publishedDate <= 1) return "New!";
    },

    bookPriceMark() {
      const { amount } = this.book.listPrice;
      if (amount > 150) return "red";
      else if (amount < 20) return "green";
    },

    setCurrency() {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: this.book.listPrice.currencyCode,
      }).format(this.book.listPrice.amount);
    },
    isReviews() {
      return this.book.reviews?.length;
    },
  },
  watch: {
    "$route.params.id"(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.book = null;
        this.loadBook();
      }
    },
  },
  components: {
    LongTxt,
    ReviewAdd,
    ReviewList,
  },
};
</script>
