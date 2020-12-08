
import Vue from 'vue'
import Vuex from 'vuex'
// import { reqmunAdd } from '../utile/request'
Vue.use(Vuex)

import menu from './modules/menu.js'
import role from './modules/role.js'
import manager from './modules/manager.js'
import cate from './modules/cate.js'
import spec from './modules/spec'
export default new Vuex.Store({

    modules:{
        menu,
        role,
        manager,
        cate,
        spec
    }


})


