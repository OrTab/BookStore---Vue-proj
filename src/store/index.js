import Vue from 'vue'
import Vuex from 'vuex'
import bookService from "../services/bookService.js";


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    books: [],
    filterBy: null,
    msg: null,

  }
  , getters: {
    booksToShow(state) {
      const books = [...state.books]
      if (!state.filterBy) return books;
      const regex = new RegExp(state.filterBy.txt, "i");
      const booksToShow = books.filter((book) => {
        return regex.test(book.title) &&
          book.listPrice.amount >= state.filterBy.fromPrice
          && book.listPrice.amount <= state.filterBy.toPrice
      })
      return booksToShow
    },
    userMsg(state) {
      return state.msg
    }
  },
  mutations: {
    setBooks(state, { books }) {
      state.books = books
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy
    }
    , saveBook(state, { bookToSave }) {
      const idx = state.books.findIndex(book => book.id === bookToSave.id)
      if (idx === -1) state.books.push(bookToSave)
      else state.books.splice(idx, 1, bookToSave)
    },
    setMsg(state, { msg }) {
      state.msg = msg
    }
  },
  actions: {
    async loadBooks({ commit }) {
      const books = await bookService.query()
      commit({ type: 'setBooks', books })
    },
    async addReview({ commit }, { review, bookId }) {
      try {
        const bookToSave = await bookService.addReview(bookId, review)
        commit({ type: 'saveBook', bookToSave })
        commit({ type: 'setMsg', msg: { type: 'success', msg: 'Review added!' } })
        clearMsg(commit)

      } catch {
        commit({ type: 'setMsg', msg: { type: 'error', msg: 'Couldn\'t add review' } })
        clearMsg(commit)
      }
    },
    async removeReview({ commit }, { reviewId, bookId }) {
      try {
        const bookToSave = await bookService.removeReview(bookId, reviewId)
        commit({ type: 'saveBook', bookToSave })
        commit({ type: 'setMsg', msg: { type: 'success', msg: 'Review removed!' } })
        clearMsg(commit)
      } catch {
        commit({ type: 'setMsg', msg: { type: 'error', msg: 'Couldn\'t remove review' } })
        clearMsg(commit)
      }
    },
    async addBook({ commit }, { book }) {

      try {
        const bookToSave = await bookService.addGoogleBook(book)
        commit({ type: 'saveBook', bookToSave })
        commit({ type: 'setMsg', msg: { type: 'success', msg: 'Book Added!', book: bookToSave } })
        clearMsg(commit)

      } catch {
        commit({ type: 'setMsg', msg: { type: 'error', msg: 'Couldn\'t add book' } })
        clearMsg(commit)
      }
    }

  },
  modules: {
  }
})


function clearMsg(commit) {
  setTimeout(() => {
    commit({ type: 'setMsg', msg: null })
  }, 3000)
}