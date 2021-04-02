import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import BookApp from '../views/BookApp.vue'
import BookDetails from '../views/BookDetails.vue'
import BookAdd from '../views/BookAdd.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component:About
  },
  {
    path: '/book',
    component:BookApp
  },
  {
    path: '/book/:id',
    component:BookDetails
  },
  {
    path: '/add',
    component:BookAdd
  },
]

const router = new VueRouter({
  routes
})

export default router
