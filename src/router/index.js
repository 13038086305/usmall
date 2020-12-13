import Vue from 'vue'
import Router from 'vue-router'



import store from '../stort/index'
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

const router =  new Router({
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
          name: '首页',
          beforeEnter(to,from,next){
            console.log(to);
            console.log(from);
            if(from.path=="/login" && store.state.users.list){
              next()
            }else{
              next('/login')
            }

          }
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


console.log(store);

//全局守卫
router.beforeEach((to,from,next)=>{
  if(to.path=='/login'){
    next()
  }


  //去的不是登录,判断是否登录，如果登录成功就会拿到res.data.list里的信息，
  if(store.state.users.list.menus){
    next()

  }else{
    next('/login')
    // this.$router.push('/login')
  }
 
})

export default  router
