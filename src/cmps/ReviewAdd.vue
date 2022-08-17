<template>
  <div @click.self="$emit('closeReviewAdd')" class="back-review">
    <div ref="review-add" class="review-add">
      <form @submit.prevent="onAddReview">
        <div class="name">
          <label>Name : </label>
          <input
            type="text"
            name=""
            id=""
            placeholder="Name"
            v-model="review.by"
          />
        </div>
        <div class="rate">
          <label for="">Rate (0 - 5) : </label>
          <div class="btn">
            <button type="button" @click="updateRate('remove')">-</button>
            {{ "★".repeat(review.rate) }}
            <button type="button" @click="updateRate('add')">+</button>
          </div>
        </div>
        <div>
          <label for="">Read At : </label>
          <input type="date" v-model="review.readAt" />
        </div>
        <textarea
          required
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="Description"
          v-model="review.desc"
        ></textarea>
        <button @click="onAddReview" class="add-btn">Add</button>
        <button @click="$emit('closeReviewAdd')" class="close-btn">
          &#x2716;
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      review: {
        by: "",
        rate: 5,
        readAt: "",
        desc: "",
      },
    };
  },
  methods: {
    updateRate(sign) {
      if (sign === "add" && this.review.rate < 5) this.review.rate++;
      else if (sign === "remove" && this.review.rate > 0) this.review.rate--;
    },
    onAddReview() {
      if (!this.review.desc) return;
      if (!this.review.by) this.review.by = "Reader";
      if (!this.review.readAt) this.review.readAt = Date.now();
      this.$emit("addReview", JSON.parse(JSON.stringify(this.review)));
    },
    // closeReviewAdd(ev) {
    //   console.log(ev);
    //   if (ev.path.includes(this.$refs["review-add"])) return;
    //   this.$emit("closeReviewAdd");
    // },
  },
};
</script>
