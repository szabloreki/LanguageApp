import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AddWord from '@/components/modals/AddWord'
import TableWord from '@/components/TableWords'
import Trainer from '@/components/trainer/Trainer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/TableWord',
      name: 'TableWord',
      component: TableWord
    },
    {
      path: '/Trainer',
      name: 'Trainer',
      component: Trainer
    },
  ]
})
