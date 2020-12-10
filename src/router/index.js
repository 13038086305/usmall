import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('../page/login/login')
const index = () =>import('../page/index/index')
const banner = () => import('../page/banner/banner')
const classify = () => import('../page/classify/classify')
const goods = () => import('../page/goods/goods')
const home = () => import('../page/home/home')
const manager = () => import('../page/manager/manager')
const menu = () => import('../page/menu/menu')
const role = () => import('../page/role/role')
const seckill = () => import('../page/seckill/seckill')
const spec = () => import('../page/spec/spec')
const vip = () => import('../page/vip/vip')

Vue.use(Router)


export const indexRouter = [
  {
    path: 'banner',
    component: banner,
    name: '轮播图'
  },
  {
    path: 'classify',
    component: classify,
    name: '商品分类'
  },
  {
    path: 'goods',
    component: goods,
    name: '商品管理'

  },
  {
    path: 'manager',
    component: manager,
    name: '管理员管理'
  },
  {
    path: 'menu',
    component: menu,
    name: '菜单管理'
  },
  {
    path: 'role',
    component: role,
    name: '角色管理'
  },
  {
    path: 'seckill',
    component: seckill,
    name: '秒杀'
  },
  {
    path: 'spec',
    component: spec,
    naem: '商品规格'

  },
  {
    path: 'vip',
    component: vip,
    name: '会员管理'
  },

]

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/index',
      component: index,
      children: [
        {
          path: 'home',
          component:home,
          name: '首页'
        },
        {
          path: '',
          redirect:'home'
        },
        ...indexRouter

      ]
    },
    {
      path:'*',
      component:login
    }
  ]
})
