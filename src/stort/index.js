
import Vue from 'vue'
import Vuex from 'vuex'
// import { reqmunAdd } from '../utile/request'
Vue.use(Vuex)

import menu from './modules/menu.js'
import role from './modules/role.js'
import manager from './modules/manager.js'
import cate from './modules/cate.js'
import spec from './modules/spec'
import good from './modules/good'
import banner from './modules/banner'
import users from './modules/users'
import seck from './modules/seckill'
export default new Vuex.Store({

    modules:{
        menu,
        role,
        manager,
        cate,
        spec,
        good,
        banner,
        users,
        seck
    }


})


