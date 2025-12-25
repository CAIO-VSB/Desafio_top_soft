import Main from '@/layout/main.vue'
import { createWebHistory, createRouter } from 'vue-router'

const routes = [

  {
    path: "/",
    name: "main",
    component: Main
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
