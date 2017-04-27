import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import trainlist from '@/components/trainlist'
import city from '@/components/getCity'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: home
    },
    {
      path: '/trainlist/:from/:to/:date',
      name: 'trainlist',
      component: trainlist
    },
    {
      path: '/getcity',
      name: 'getcity',
      component: city
    }
  ]
})
