import Vue from 'vue'
// 1. 引入路由包  
import Router from 'vue-router'
// ../src   @
import Home from '@/components/tabbar/Home'
import Member from '@/components/tabbar/Member'
import Cart from '@/components/tabbar/Cart'
import Search from '@/components/tabbar/Search'
import NewsList from '@/components/news/NewsList'

// 2. 注册路由
Vue.use(Router)

// 4. 实例化路由并配置路由规则  
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/member',
      component: Member
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/home/newslist',
      component: NewsList
    }
  ],
  // 设置路由高亮的样式  
  linkActiveClass: 'mui-active'
})
