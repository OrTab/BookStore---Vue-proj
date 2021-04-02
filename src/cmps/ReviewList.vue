<template>
  <div class="review-list">
    <h5 v-if="!reviews||!reviews.length" class="no-reviews">No reviews yet...</h5>
    <div class="reviews-container" v-if="reviews">
      <ul>
        <div class="review" v-for="review in reviews" :key="review.id">
          <button @click="removeReview(review)">X</button>
          <h5>By : {{ review.by }}</h5>
          <h5>Read At : {{ setDate(review.readAt) }}</h5>
          <h5>Rate : {{ '★'.repeat(review.rate) }}</h5>
          <h5 v-if="review.desc">Description : {{ review.desc }}</h5>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    reviews: Array,
  },
  created() {},
  methods: {
    setDate(date) {
      return new Date(date).toLocaleDateString();
    },
    removeReview(review) {
      this.$emit("removeReview", { ...review });
    },
  },
};
</script>

