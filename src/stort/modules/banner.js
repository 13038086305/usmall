import {reqbannerlist} from '../../utile/request'
const state = {
    list:[]

}
const mutations = {
    changecateList(state,arr){
        return state.list = arr
    },


   

}
const actions = {
    requestbannerlist(context){
        reqbannerlist({}).then(res=>{
            context.commit('changecateList',res.data.list)
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


