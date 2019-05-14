import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/Index'
import ManageIndexPage from '../pages/ManageIndexPage'
import ManagerProduct from '../components/manager/ManagerProduct'
import ManagerUser from '../components/manager/ManagerUser'
import ManagerOrder from '../components/manager/ManagerOrder'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/manager',
      component: ManageIndexPage,
      children: [
        {
          path: 'product',
          component: ManagerProduct
        },
        {
          path: 'user',
          component: ManagerUser
        },
        {
          path: 'home',
          component: ManagerProduct
        },
        {
          path: 'order',
          component: ManagerOrder
        }
      ]
    }
  ]
})
