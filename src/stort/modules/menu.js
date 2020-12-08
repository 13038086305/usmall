import {reqMenuList} from '../../utile/request'
const state = {
    list:[]
    

}
const mutations = {
    getList(state,arr){
       return state.list = arr
    }
}
const actions = {
    reqmenuList(context){
        reqMenuList({istree:true}).then(res=>{
          context.commit('getList',res.data.list)
        })
    }


  
}
const getters = {
    list(state){
        return state.list
    }
  
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true

}


