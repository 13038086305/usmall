import {reqcatelist} from '../../utile/request'
const state = {
    list:[]

}
const mutations = {
    changecateList(state,arr){
        return state.list = arr
    },


   

}
const actions = {
    requestcatelist(context){
        reqcatelist({istree:true}).then(res=>{
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


