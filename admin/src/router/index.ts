import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Main from '../views/Main.vue'
import Home from '../views/Home.vue'
import CrudList from '../views/media/CrudList.vue'

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    children: [{
      path: '/',
      name: 'home',
      component: Home,
    }, {
      path: '/:resources/list',
      component: CrudList,
      name: 'media-manage',
      props: true
    },]
  },
]

const router = new VueRouter({
  routes
})

export default router
