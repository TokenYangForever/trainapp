import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import trainlist from '@/components/trainlist'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: home
    },
    {
      path: '/trainlist',
      name: 'trainlist',
      component: trainlist
    }
  ]
})
